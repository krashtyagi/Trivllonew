export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: "Hotels" | "Tour Guides" | "Weekend Trips" | "Travel Tips";
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
  relatedService?: {
    type: "hotel" | "tour";
    query: string;
    label: string;
    ctaText: string;
  };
  content: {
    introduction: string;
    sections: {
      heading: string;
      subheading?: string;
      body: string[];
      highlightBox?: string;
      bulletPoints?: string[];
    }[];
    conclusion: string;
  };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "top-10-luxury-hotels-in-indore",
    title: "10 Best Luxury Hotels & Heritage Stays in Indore (2026 Guide)",
    excerpt:
      "Looking for regal hospitality, rooftop infinity pools, and gourmet dining in the heart of Madhya Pradesh? Discover the highest-rated luxury hotels in Indore.",
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    category: "Hotels",
    readTime: "6 min read",
    publishedAt: "2026-04-12",
    updatedAt: "2026-04-18",
    featured: true,
    author: {
      name: "Aanya Sharma",
      role: "Luxury Travel Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Indore", "Luxury Hotels", "Heritage Stays", "Madhya Pradesh", "Hotel Booking"],
    relatedService: {
      type: "hotel",
      query: "Indore",
      label: "Hotels in Indore",
      ctaText: "Browse Top Rated Stays in Indore",
    },
    content: {
      introduction:
        "Indore, India’s cleanest city and Madhya Pradesh’s commercial capital, seamlessly blends royal Holkar heritage with cutting-edge urban hospitality. Whether you're visiting for business, a lavish wedding, or a weekend gastronomic tour of Sarafa Bazaar, choosing the right luxury stay elevates your entire journey.",
      sections: [
        {
          heading: "1. What Defines a True Luxury Stay in Indore?",
          body: [
            "Modern travelers in central India no longer settle for basic five-star amenities. High-speed fiber connectivity, curated regional thalis, tranquil spa therapies, and soundproof suites that insulate you from vibrant city streets are now table stakes.",
            "Properties close to Vijay Nagar, AB Road, and the Super Corridor provide the best balance of airport accessibility and proximity to fine dining hubs.",
          ],
          highlightBox:
            "Pro-Tip: When booking in Indore during peak wedding season (November to February), reserve at least 3 weeks in advance to secure complimentary upgrades and flexible check-in.",
        },
        {
          heading: "2. The Top Contenders for Unmatched Comfort",
          body: [
            "Grand Vila & Heritage Palaces: Offering sprawling landscaped lawns, opulent marble foyers, and bespoke butler service, these landmark properties reflect the grandeur of the Maratha era.",
            "Urban Oasis Retreats: Located along the BRTS corridor, these contemporary business hotels feature rooftop cocktail lounges with panoramic city skylines, heated indoor pools, and 24-hour fitness centers.",
          ],
          bulletPoints: [
            "24/7 Concierge and on-demand airport transfers",
            "Multi-cuisine fine dining featuring authentic Malwi delicacies",
            "Full wellness centers with Ayurvedic therapies and steam suites",
            "Eco-certified green building designs with zero single-use plastics",
          ],
        },
        {
          heading: "3. Dining & Experiences Beyond the Lobby",
          body: [
            "Staying at a premier hotel in Indore means your culinary journey begins right at breakfast. Don't miss live Indori Poha-Jalebi counters paired with aromatic Sev, followed by evening excursions to Sarafa Bazaar and Chappan Dukan.",
          ],
        },
      ],
      conclusion:
        "From historical opulence to contemporary high-tech suites, Indore offers remarkable value and warm hospitality. Book your verified stay directly on Trivllo for transparent pricing and instant booking confirmation.",
    },
  },
  {
    slug: "ultimate-rajasthan-royal-tour-guide",
    title: "The Ultimate 7-Day Rajasthan Tour Itinerary: Palaces, Forts & Desert Stays",
    excerpt:
      "A step-by-step 7-day travel guide covering Jaipur, Jodhpur, and Udaipur. Plan the quintessential royal road trip with handpicked stays and expert tips.",
    coverImage:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    category: "Tour Guides",
    readTime: "8 min read",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-14",
    featured: true,
    author: {
      name: "Vikram Rathore",
      role: "Heritage Expedition Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Rajasthan", "Jaipur", "Udaipur", "Jodhpur", "Tour Packages", "Cultural Travel"],
    relatedService: {
      type: "tour",
      query: "Rajasthan",
      label: "Rajasthan Tour Packages",
      ctaText: "Explore Guided Rajasthan Tours",
    },
    content: {
      introduction:
        "Golden sand dunes, impregnable sandstone fortresses, mirror-work royal palaces, and kaleidoscope folk melodies — Rajasthan is an unforgettable sensory feast. This comprehensive 7-day itinerary maps the Golden Triangle of Rajasthan: Jaipur, Jodhpur, and Udaipur.",
      sections: [
        {
          heading: "Days 1–2: The Pink Majesty of Jaipur",
          body: [
            "Begin your journey in Rajasthan's capital. Start early at the Amber Fort to admire the Sheesh Mahal (Mirror Palace) before tour buses arrive. In the afternoon, explore the City Palace and marvel at the astronomical precision of Jantar Mantar.",
            "As dusk falls, head to Nahargarh Fort for a sunset view over the Pink City while sipping cardamom chai.",
          ],
          bulletPoints: [
            "Must visit: Hawa Mahal facade at 8:00 AM for soft morning light photography",
            "Shopping: Hand-block printed quilts and blue pottery in Johari Bazaar",
            "Stay recommendation: A heritage Haveli in Bani Park or C-Scheme",
          ],
        },
        {
          heading: "Days 3–4: The Blue City & Desert Gateways of Jodhpur",
          body: [
            "Drive westward towards the formidable Mehrangarh Fort, towering 400 feet above Jodhpur’s blue-painted Brahmin houses. Walk through the bustling Clock Tower market and savor piping hot Mawa Kachori.",
            "In the evening, book a desert glamping experience near Osian or explore the tranquil marble cenotaphs of Jaswant Thada.",
          ],
          highlightBox:
            "Traveler Tip: Hire a certified local story-teller guide at Mehrangarh Fort. The architectural secrets and battle history bring every courtyard to life.",
        },
        {
          heading: "Days 5–7: The Romance of Udaipur’s Lakes",
          body: [
            "End your royal circuit in the Venice of the East. Lake Pichola reflects the grand City Palace complex, while boat rides around Jag Mandir offer breathtaking mountain backdrops.",
            "Spend your final evening watching the Dharohar folk dance performance at Bagore Ki Haveli.",
          ],
        },
      ],
      conclusion:
        "Rajasthan rewards travelers who take time to wander beyond tourist trails. With Trivllo’s curated guided tours, experienced local drivers and verified boutique stays ensure your journey is as smooth as it is magical.",
    },
  },
  {
    slug: "best-weekend-getaways-from-delhi",
    title: "5 Breathtaking Weekend Getaways from Delhi: Hills, Lakes & Heritage Stays",
    excerpt:
      "Escape the city rush with these 5 rejuvenating weekend escapes within 4 to 8 hours from Delhi NCR, from misty Himalayan ridges to regal forts.",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    category: "Weekend Trips",
    readTime: "5 min read",
    publishedAt: "2026-03-28",
    updatedAt: "2026-04-10",
    featured: false,
    author: {
      name: "Rohit Malhotra",
      role: "Weekend Explorer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Weekend Getaway", "Delhi NCR", "Himachal", "Uttarakhand", "Road Trip"],
    relatedService: {
      type: "hotel",
      query: "Himachal",
      label: "Hill Station Stays",
      ctaText: "Discover Scenic Hill Resorts",
    },
    content: {
      introduction:
        "When the capital’s fast pace demands a reset, northern India offers an unmatched variety of weekend destinations. Within a scenic Friday evening drive or morning Vande Bharat train journey, you can wake up to birdsong and mountain breezes.",
      sections: [
        {
          heading: "1. Rishikesh: Riverside Serenity & Yoga Retreats (4.5 hrs)",
          body: [
            "Whether you're looking for white-water rafting on the emerald Ganges or a peaceful wellness sanctuary in Tapovan, Rishikesh is the ideal blend of adventure and peace.",
            "Stay on the quieter Tapovan or Shivpuri stretch for direct river beach access and evening Ganga Aarti views.",
          ],
        },
        {
          heading: "2. Neemrana & Shekhawati: Regal Heritage (2.5 hrs)",
          body: [
            "For history buffs and couples seeking a quick romantic getaway, the 15th-century step-palaces along the Delhi-Jaipur highway provide royal luxury, zip-lining across ancient battlements, and candlelit courtyard dinners.",
          ],
          highlightBox:
            "Quick Route: The Delhi-Mumbai Expressway makes traveling towards Rajasthan significantly faster, cutting transit times down by up to 40%.",
        },
        {
          heading: "3. Kasauli & Shimla Foothills: Pine Forests & Quiet Trails (5.5 hrs)",
          body: [
            "Avoid urban congestion by heading to pine-scented Kasauli. Cobblestone lanes, colonial-era architecture, and birdwatching trails make it a beloved breath of fresh air.",
          ],
        },
      ],
      conclusion:
        "Recharging your mind doesn’t require weeks of planning. Pick your favorite retreat, book with zero hidden taxes on Trivllo, and hit the highway.",
    },
  },
  {
    slug: "how-to-book-best-hotels-lowest-price",
    title: "How to Find the Best Hotel Deals in India: 7 Insider Booking Secrets",
    excerpt:
      "Avoid overpriced rooms and hidden resort fees. Discover how travel insiders secure free room upgrades, breakfast inclusions, and the guaranteed lowest rates.",
    coverImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    category: "Travel Tips",
    readTime: "4 min read",
    publishedAt: "2026-03-15",
    updatedAt: "2026-04-02",
    featured: false,
    author: {
      name: "Sneha Kapur",
      role: "Smart Travel Strategist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    tags: ["Travel Tips", "Budget Travel", "Hotel Hacks", "Smart Booking"],
    relatedService: {
      type: "hotel",
      query: "all",
      label: "Explore Stays",
      ctaText: "Check Today's Exclusive Hotel Deals",
    },
    content: {
      introduction:
        "Booking a hotel room in India shouldn’t feel like a gamble. Between dynamic algorithmic pricing and hidden checkout fees, travelers often end up paying 20–30% more than necessary. Here are 7 verified strategies to secure the best rooms at the best rates.",
      sections: [
        {
          heading: "1. The Direct & Verified Platform Advantage",
          body: [
            "Massive aggregator sites often list outdated room types or slap on hefty convenience charges at the final payment screen. Booking through direct partner platforms like Trivllo ensures the price you see is the price you pay, including taxes.",
          ],
        },
        {
          heading: "2. The 'Tuesday Midday' Booking Window",
          body: [
            "Hotels calibrate their weekend occupancy models on Tuesday afternoons. If bookings for the upcoming weekend look light, dynamic rate drops are pushed into systems, creating prime bargain windows.",
          ],
          bulletPoints: [
            "Always check whether the rate includes breakfast — paying à la carte can add ₹800–1,500/day",
            "Filter for properties with verified guest reviews to ensure photos match reality",
            "Look for flexible cancellation policies so you can rebook if prices drop",
          ],
        },
        {
          heading: "3. Requesting Complimentary Upgrades the Right Way",
          body: [
            "Polite communication at check-in goes a long way. If traveling for an anniversary, birthday, or quiet work retreat, mention it during your booking notes. Front desk managers are often happy to allocate corner rooms or higher floors with superior views.",
          ],
        },
      ],
      conclusion:
        "Smart travel is all about maximizing value without sacrificing comfort. Explore Trivllo's verified collection of boutique hotels, resorts, and homestays with price match assurance.",
    },
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getBlogCategories(): string[] {
  return ["All", "Hotels", "Tour Guides", "Weekend Trips", "Travel Tips"];
}
