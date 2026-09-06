export interface Region {
  slug: string;
  name: string;
  description: string;
}

export interface City {
  slug: string;
  name: string;
  regionSlug: string;
}

export const regions: Region[] = [
  {
    slug: "fife",
    name: "Fife",
    description: "Dominating local search results for roofing contractors across the Kingdom of Fife.",
  },
  {
    slug: "tayside",
    name: "Tayside",
    description: "Driving high-quality roofing leads throughout Dundee, Perth, and Angus.",
  },
  {
    slug: "lothian",
    name: "Lothian",
    description: "Securing top Google Maps rankings for roofers in Edinburgh and the Lothians.",
  },
];

export const cities: City[] = [
  // Fife
  { slug: "dunfermline", name: "Dunfermline", regionSlug: "fife" },
  { slug: "kirkcaldy", name: "Kirkcaldy", regionSlug: "fife" },
  { slug: "st-andrews", name: "St Andrews", regionSlug: "fife" },
  
  // Tayside
  { slug: "dundee", name: "Dundee", regionSlug: "tayside" },
  { slug: "perth", name: "Perth", regionSlug: "tayside" },
  { slug: "arbroath", name: "Arbroath", regionSlug: "tayside" },
  
  // Lothian
  { slug: "edinburgh", name: "Edinburgh", regionSlug: "lothian" },
  { slug: "livingston", name: "Livingston", regionSlug: "lothian" },
  { slug: "bathgate", name: "Bathgate", regionSlug: "lothian" },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getCitiesByRegion(regionSlug: string): City[] {
  return cities.filter((c) => c.regionSlug === regionSlug);
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
