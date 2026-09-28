// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// export interface PlaceResult {
//   id: string;
//   name: string;
//   label: string; // "Yamkeshwar, Pauri Garhwal, Uttarakhand, India"
//   lat: number;
//   lon: number;
//   type: string; // city | town | village | hamlet ...
// }

// // minLon,minLat,maxLon,maxLat
// export const INDIA_BBOX = "68.1,6.5,97.5,35.7";

// const PLACE_TYPES = [
//   "city",
//   "town",
//   "village",
//   "hamlet",
//   "suburb",
//   "locality",
//   "municipality",
//   "neighbourhood",
// ];

// function useDebounce<T>(value: T, delay: number) {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return debounced;
// }

// // ---------- Photon ----------
// function photonUrl(q: string, opts: { filtered: boolean; bbox?: string }) {
//   const params = new URLSearchParams({ q, limit: "10" });
//   if (opts.bbox) params.set("bbox", opts.bbox);
//   if (opts.filtered)
//     PLACE_TYPES.forEach((t) => params.append("osm_tag", `place:${t}`));
//   return `https://photon.komoot.io/api/?${params.toString()}`;
// }

// function fromPhoton(features: any[]): PlaceResult[] {
//   return features
//     .filter((f) => f.properties?.osm_key === "place") // drop shops, roads, etc.
//     .map((f) => {
//       const p = f.properties;
//       const [lon, lat] = f.geometry.coordinates;
//       const name = p.name ?? "";
//       const label = [name, p.district ?? p.county, p.state, p.country]
//         .filter(Boolean)
//         .filter((v, i, a) => a.indexOf(v) === i) // no duplicate parts
//         .join(", ");
//       return {
//         id: `${p.osm_type}${p.osm_id}`,
//         name,
//         label,
//         lat,
//         lon,
//         type: p.osm_value ?? "place",
//       };
//     });
// }

// async function searchPhoton(
//   q: string,
//   signal: AbortSignal,
//   opts: { filtered: boolean; bbox?: string },
// ): Promise<PlaceResult[]> {
//   const res = await fetch(photonUrl(q, opts), { signal });
//   if (!res.ok) throw new Error(`Photon error ${res.status}`);
//   const json = await res.json();
//   return fromPhoton(json.features ?? []);
// }

// // ---------- Nominatim (fallback) ----------
// async function searchNominatim(
//   q: string,
//   signal: AbortSignal,
//   countryCodes?: string,
// ): Promise<PlaceResult[]> {
//   const params = new URLSearchParams({
//     q,
//     format: "jsonv2",
//     addressdetails: "1",
//     limit: "10",
//   });
//   if (countryCodes) params.set("countrycodes", countryCodes);

//   const res = await fetch(
//     `https://nominatim.openstreetmap.org/search?${params}`,
//     { signal },
//   );
//   if (!res.ok) throw new Error(`Nominatim error ${res.status}`);
//   const json: any[] = await res.json();

//   return json.map((r) => ({
//     id: `nominatim-${r.place_id}`,
//     name: r.name || r.display_name.split(",")[0],
//     label: r.display_name,
//     lat: Number(r.lat),
//     lon: Number(r.lon),
//     type: r.addresstype ?? r.type ?? "place",
//   }));
// }

// // ---------- Hook ----------
// interface Options {
//   bbox?: string; // e.g. INDIA_BBOX to prefer results in India
//   countryCodes?: string; // e.g. "in" for the Nominatim fallback
// }

// export const useSearchCity = (query: string, options: Options = {}) => {
//   const { bbox, countryCodes } = options;
//   const debouncedQuery = useDebounce(query.trim(), 500);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["search_city", debouncedQuery, bbox, countryCodes],
//     enabled: debouncedQuery.length >= 2,
//     staleTime: Infinity,
//     queryFn: async ({ signal }) => {
//       // 1) Photon, all settlement types, optionally limited to a region
//       let results = await searchPhoton(debouncedQuery, signal, {
//         filtered: true,
//         bbox,
//       });

//       // 2) Photon without the tag filter; keep only place results
//       if (results.length === 0) {
//         results = await searchPhoton(debouncedQuery, signal, {
//           filtered: false,
//           bbox,
//         });
//       }

//       // 3) Nominatim as a last resort
//       if (results.length === 0) {
//         results = await searchNominatim(debouncedQuery, signal, countryCodes);
//       }

//       // remove duplicates and keep the top 6
//       const seen = new Set<string>();
//       return results
//         .filter((r) => (seen.has(r.label) ? false : (seen.add(r.label), true)))
//         .slice(0, 6);
//     },
//   });

//   return { results: data ?? [], loading: isLoading, error };
// };
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface PlaceResult {
  id: string;
  name: string;
  label: string;
  lat: number;
  lon: number;
  type: string;
}

// minLon,minLat,maxLon,maxLat
export const INDIA_BBOX = "68.1,6.5,97.5,35.7";

const PLACE_TYPES = [
  "city",
  "town",
  "village",
  "hamlet",
  "suburb",
  "locality",
  "municipality",
  "neighbourhood",
];

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

// ---------- Photon ----------

function photonUrl(
  q: string,
  opts: {
    filtered: boolean;
    bbox?: string;
  },
) {
  const params = new URLSearchParams({
    q,
    limit: "10",
  });

  if (opts.bbox) {
    params.set("bbox", opts.bbox);
  }

  if (opts.filtered) {
    PLACE_TYPES.forEach((type) => {
      params.append("osm_tag", `place:${type}`);
    });
  }

  return `https://photon.komoot.io/api/?${params.toString()}`;
}

function fromPhoton(features: any[]): PlaceResult[] {
  return features
    .filter((feature) => feature?.properties?.osm_key === "place")
    .map((feature) => {
      const properties = feature.properties;
      const coordinates = feature.geometry?.coordinates;

      if (
        !properties ||
        !Array.isArray(coordinates) ||
        coordinates.length < 2
      ) {
        return null;
      }

      const [lon, lat] = coordinates;

      const name = properties.name ?? "";

      const label = [
        name,
        properties.district ?? properties.county,
        properties.state,
        properties.country,
      ]
        .filter(Boolean)
        .filter((value, index, array) => array.indexOf(value) === index)
        .join(", ");

      return {
        id: `${properties.osm_type}${properties.osm_id}`,
        name,
        label,
        lat: Number(lat),
        lon: Number(lon),
        type: properties.osm_value ?? "place",
      };
    })
    .filter((place): place is PlaceResult => place !== null);
}

async function searchPhoton(
  q: string,
  signal: AbortSignal,
  opts: {
    filtered: boolean;
    bbox?: string;
  },
): Promise<PlaceResult[]> {
  const response = await fetch(photonUrl(q, opts), {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Photon error ${response.status}`);
  }

  const json = await response.json();

  return fromPhoton(json.features ?? []);
}

// ---------- Nominatim ----------

async function searchNominatim(
  q: string,
  signal: AbortSignal,
  countryCodes?: string,
): Promise<PlaceResult[]> {
  const params = new URLSearchParams({
    q,
    format: "jsonv2",
    addressdetails: "1",
    limit: "10",
  });

  if (countryCodes) {
    params.set("countrycodes", countryCodes);
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`Nominatim error ${response.status}`);
  }

  const json: any[] = await response.json();

  return json
    .map((result) => {
      if (!result) {
        return null;
      }

      const name = result.name || result.display_name?.split(",")[0] || "";

      return {
        id: `nominatim-${result.place_id}`,
        name,
        label: result.display_name || name,
        lat: Number(result.lat),
        lon: Number(result.lon),
        type: result.addresstype ?? result.type ?? "place",
      };
    })
    .filter((place): place is PlaceResult => place !== null);
}

// ---------- Hook ----------

interface Options {
  bbox?: string;
  countryCodes?: string;
}

export const useSearchCity = (query: string, options: Options = {}) => {
  const { bbox, countryCodes } = options;

  const debouncedQuery = useDebounce(query.trim(), 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search_city", debouncedQuery, bbox, countryCodes],

    enabled: debouncedQuery.length >= 2,

    staleTime: Infinity,

    queryFn: async ({ signal }) => {
      // 1. Photon with place filtering
      let results = await searchPhoton(debouncedQuery, signal, {
        filtered: true,
        bbox,
      });

      // 2. Photon without place filtering
      if (results.length === 0) {
        results = await searchPhoton(debouncedQuery, signal, {
          filtered: false,
          bbox,
        });
      }

      // 3. Nominatim fallback
      if (results.length === 0) {
        results = await searchNominatim(debouncedQuery, signal, countryCodes);
      }

      // Remove duplicate labels
      const seen = new Set<string>();

      return results
        .filter((result) => {
          if (seen.has(result.label)) {
            return false;
          }

          seen.add(result.label);
          return true;
        })
        .slice(0, 6);
    },
  });

  return {
    results: data ?? [],
    loading: isLoading,
    error,
  };
};
