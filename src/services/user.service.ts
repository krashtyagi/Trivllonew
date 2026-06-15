import { userAccessToken } from "@/constants/auth";
import { axiosApi } from "@/lib/axios";

const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true; // Invalid JWT structure
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    if (!payload.exp) return false; // If no expiration field exists, assume not expired
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true; // Treat decoding errors as expired/invalid
  }
};

export const currentUser = async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem(userAccessToken) : null;

  if (!token) {
    return null;
  }

  if (typeof window !== "undefined" && isTokenExpired(token)) {
    localStorage.removeItem(userAccessToken);
    localStorage.removeItem("refreshToken");
    window.location.reload();
    return null;
  }

  try {
    const res = await axiosApi.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(userAccessToken);
        localStorage.removeItem("refreshToken");
      }
      return null;
    }

    console.error("currentUser service - API call failed:", error);
    throw error;
  }
};

// export const currentUser = async () => {
//   const token = localStorage.getItem("accessToken");

//   if (!token) {
//     throw new Error("No access token found");
//   }

//   try {
//     const res = await axiosApi.get("/users/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.status === 401) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       window.location.href = "/login";
//       return null;
//     }

//     return res.data;
//   } catch (error) {
//     console.error("currentUser service - API call failed:", error);
//     throw error;
//   }
// };
