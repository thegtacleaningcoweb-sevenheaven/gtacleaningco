export type Coverage = 0 | 1 | 2;

export interface CompareTask {
  area: string;
  name: string;
  regular: Coverage;
  deep: Coverage;
  move: Coverage;
}

export const compareAreas = [
  "All",
  "Whole home",
  "Bedrooms & living areas",
  "Kitchen",
  "Bathrooms",
  "Add-ons",
] as const;

export const compareColumns = [
  { id: 1, label: "Regular Cleaning", lines: ["Regular", "Cleaning"] },
  { id: 2, label: "Deep Cleaning", lines: ["Deep", "Cleaning"] },
  { id: 3, label: "Move-In / Move-Out", lines: ["Move-In /", "Move-Out"] },
] as const;

/** 1 included, 0 not included, 2 optional add-on. Order: regular, deep, move. */
export const compareTasks: CompareTask[] = [
  { area: "Whole home", name: "Remove cobwebs", regular: 0, deep: 1, move: 1 },
  { area: "Whole home", name: "Sweep / vacuum and mop floors", regular: 1, deep: 1, move: 1 },
  { area: "Whole home", name: "Clean light switches and doorknobs", regular: 1, deep: 1, move: 1 },
  { area: "Whole home", name: "Dust window sills", regular: 1, deep: 1, move: 1 },
  { area: "Whole home", name: "Empty garbage and wipe exterior", regular: 1, deep: 1, move: 1 },
  { area: "Whole home", name: "Clean baseboards", regular: 0, deep: 1, move: 1 },
  { area: "Whole home", name: "Wipe doors and door frames", regular: 0, deep: 1, move: 1 },
  { area: "Whole home", name: "Dust light fixtures (within reach)", regular: 0, deep: 1, move: 1 },
  { area: "Whole home", name: "Wipe ceiling fans (within reach)", regular: 0, deep: 1, move: 1 },
  { area: "Whole home", name: "Spot clean walls (within reason)", regular: 0, deep: 0, move: 1 },
  { area: "Whole home", name: "Clean and wipe exterior vents", regular: 0, deep: 0, move: 1 },
  { area: "Bedrooms & living areas", name: "Dust and wipe table-top surfaces", regular: 1, deep: 1, move: 1 },
  { area: "Bedrooms & living areas", name: "Vacuum carpets and rugs", regular: 1, deep: 1, move: 1 },
  { area: "Bedrooms & living areas", name: "Dust furniture", regular: 1, deep: 1, move: 1 },
  { area: "Bedrooms & living areas", name: "Clean mirrors", regular: 1, deep: 1, move: 1 },
  { area: "Bedrooms & living areas", name: "Clean hallways and staircases", regular: 1, deep: 1, move: 1 },
  { area: "Bedrooms & living areas", name: "Dust decor, picture frames and wall art", regular: 1, deep: 1, move: 1 },
  { area: "Bedrooms & living areas", name: "Tidy beds and change sheets (optional)", regular: 1, deep: 1, move: 0 },
  { area: "Bedrooms & living areas", name: "Clean under furniture (25 lbs or less)", regular: 0, deep: 1, move: 1 },
  { area: "Bedrooms & living areas", name: "Clean inside closets and wipe down shelves", regular: 0, deep: 0, move: 1 },
  { area: "Kitchen", name: "Clean and shine sink", regular: 1, deep: 1, move: 1 },
  { area: "Kitchen", name: "Clean and wipe appliances (exterior)", regular: 1, deep: 1, move: 1 },
  { area: "Kitchen", name: "Clean cooktop / stovetop", regular: 1, deep: 1, move: 1 },
  { area: "Kitchen", name: "Clean microwave interior", regular: 1, deep: 1, move: 1 },
  { area: "Kitchen", name: "Clean range hood", regular: 0, deep: 1, move: 1 },
  { area: "Kitchen", name: "Wipe cabinets and drawers (exterior)", regular: 0, deep: 1, move: 1 },
  { area: "Kitchen", name: "Wipe and clean backsplash", regular: 0, deep: 1, move: 1 },
  { area: "Kitchen", name: "Inside dishwasher", regular: 2, deep: 2, move: 1 },
  { area: "Kitchen", name: "Inside oven", regular: 2, deep: 2, move: 2 },
  { area: "Bathrooms", name: "Wipe and sanitize all surfaces", regular: 1, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Clean and shine sink and faucets", regular: 1, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Clean and sanitize toilets", regular: 1, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Clean and scrub shower and bathtub", regular: 1, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Clean cabinet exteriors", regular: 1, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Dust and tidy personal items", regular: 1, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Scrub tile grout in shower", regular: 0, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Clean glass shower water marks", regular: 0, deep: 1, move: 1 },
  { area: "Bathrooms", name: "Clean cabinet interiors", regular: 0, deep: 0, move: 1 },
  { area: "Add-ons", name: "Inside fridge", regular: 2, deep: 2, move: 1 },
  { area: "Add-ons", name: "Steam cleaning", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Basement area", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Extra kitchen", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Inside kitchen and bathroom cabinets", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Interior windows and tracks", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Window blinds / shutters", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Load dishwasher", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Load and fold laundry", regular: 2, deep: 2, move: 2 },
  { area: "Add-ons", name: "Garage, patio or balcony", regular: 2, deep: 2, move: 2 },
];
