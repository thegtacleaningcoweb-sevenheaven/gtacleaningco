export interface ChecklistSection {
  title: string;
  items: string[];
}

export interface Checklist {
  id: "regular" | "deep" | "move";
  title: string;
  lead: string;
  pdf: string;
  filename: string;
  cardTitle: string;
  cardText: string;
  sections: ChecklistSection[];
}

const addOns = [
  "Inside fridge (must be empty)",
  "Inside dishwasher",
  "Inside oven",
  "Steam cleaning",
  "Basement area",
  "Extra kitchen",
  "Inside kitchen and bathroom cabinets",
  "Interior windows and tracks",
  "Window blinds / shutters",
  "Load dishwasher",
  "Load and fold laundry",
  "Garage, patio or balcony",
];

export const checklists: Checklist[] = [
  {
    id: "regular",
    title: "Regular Cleaning Checklist",
    lead: "Maintenance visits: weekly, bi-weekly or monthly",
    pdf: "/pdfs/regular-cleaning-checklist.pdf",
    filename: "regular-cleaning-checklist.pdf",
    cardTitle: "Regular cleaning",
    cardText: "Room-by-room checklist of everything we clean.",
    sections: [
      {
        title: "Whole home",
        items: [
          "Sweep / vacuum and mop floors",
          "Clean light switches and doorknobs",
          "Dust window sills",
          "Empty garbage and wipe exterior",
        ],
      },
      {
        title: "Bedrooms & living areas",
        items: [
          "Dust and wipe table-top surfaces",
          "Vacuum carpets and rugs",
          "Dust furniture",
          "Clean mirrors",
          "Clean hallways and staircases",
          "Dust decor, picture frames and wall art",
          "Tidy beds and change sheets (optional)",
        ],
      },
      {
        title: "Kitchen",
        items: [
          "Clean and shine sink",
          "Clean and wipe appliances (exterior)",
          "Clean cooktop / stovetop",
          "Clean microwave interior",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Wipe and sanitize all surfaces",
          "Clean and shine sink and faucets",
          "Clean and sanitize toilets",
          "Clean and scrub shower and bathtub",
          "Clean cabinet exteriors",
          "Dust and tidy personal items",
        ],
      },
      { title: "Optional add-ons", items: addOns },
    ],
  },
  {
    id: "deep",
    title: "Deep Cleaning Checklist",
    lead: "Everything in the regular clean, plus extra detail",
    pdf: "/pdfs/deep-cleaning-checklist.pdf",
    filename: "deep-cleaning-checklist.pdf",
    cardTitle: "Deep cleaning",
    cardText: "Room-by-room checklist of everything we clean.",
    sections: [
      {
        title: "Whole home",
        items: [
          "Remove cobwebs",
          "Sweep / vacuum and mop floors",
          "Clean light switches and doorknobs",
          "Dust window sills",
          "Empty garbage and wipe exterior",
          "Clean baseboards",
          "Wipe doors and door frames",
          "Dust light fixtures (within reach)",
          "Wipe ceiling fans (within reach)",
        ],
      },
      {
        title: "Bedrooms & living areas",
        items: [
          "Dust and wipe table-top surfaces",
          "Vacuum carpets and rugs",
          "Dust furniture",
          "Clean mirrors",
          "Clean hallways and staircases",
          "Dust decor, picture frames and wall art",
          "Tidy beds and change sheets (optional)",
          "Clean under furniture (25 lbs or less)",
        ],
      },
      {
        title: "Kitchen",
        items: [
          "Clean and shine sink",
          "Clean and wipe appliances (exterior)",
          "Clean cooktop / stovetop",
          "Clean microwave interior",
          "Clean range hood",
          "Wipe cabinets and drawers (exterior)",
          "Wipe and clean backsplash",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Wipe and sanitize all surfaces",
          "Clean and shine sink and faucets",
          "Clean and sanitize toilets",
          "Clean and scrub shower and bathtub",
          "Clean cabinet exteriors",
          "Dust and tidy personal items",
          "Scrub tile grout in shower",
          "Clean glass shower water marks",
        ],
      },
      { title: "Optional add-ons", items: addOns },
    ],
  },
  {
    id: "move",
    title: "Move-In / Move-Out Checklist",
    lead: "For empty or nearly empty homes",
    pdf: "/pdfs/move-cleaning-checklist.pdf",
    filename: "move-cleaning-checklist.pdf",
    cardTitle: "Move-in / move-out",
    cardText: "Room-by-room checklist of everything we clean.",
    sections: [
      {
        title: "Whole home",
        items: [
          "Remove cobwebs",
          "Sweep / vacuum and mop floors",
          "Clean light switches and doorknobs",
          "Dust window sills",
          "Empty garbage and wipe exterior",
          "Clean baseboards",
          "Wipe doors and door frames",
          "Dust light fixtures (within reach)",
          "Wipe ceiling fans (within reach)",
          "Spot clean walls (within reason)",
          "Clean and wipe exterior vents",
        ],
      },
      {
        title: "Bedrooms & living areas",
        items: [
          "Dust and wipe table-top surfaces",
          "Vacuum carpets and rugs",
          "Dust furniture",
          "Clean mirrors",
          "Clean hallways and staircases",
          "Dust decor, picture frames and wall art",
          "Clean under furniture (25 lbs or less)",
          "Clean inside closets and wipe down shelves",
        ],
      },
      {
        title: "Kitchen",
        items: [
          "Clean and shine sink",
          "Clean and wipe appliances (exterior)",
          "Clean cooktop / stovetop",
          "Clean microwave interior",
          "Clean range hood",
          "Wipe cabinets and drawers (exterior)",
          "Wipe and clean backsplash",
          "Inside fridge (must be empty)",
          "Inside dishwasher",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Wipe and sanitize all surfaces",
          "Clean and shine sink and faucets",
          "Clean and sanitize toilets",
          "Clean and scrub shower and bathtub",
          "Clean cabinet exteriors",
          "Dust and tidy personal items",
          "Scrub tile grout in shower",
          "Clean glass shower water marks",
          "Clean cabinet interiors",
        ],
      },
      {
        title: "Optional add-ons",
        items: [
          "Inside oven",
          "Steam cleaning",
          "Basement area",
          "Extra kitchen",
          "Inside kitchen and bathroom cabinets",
          "Interior windows and tracks",
          "Window blinds / shutters",
          "Load dishwasher",
          "Load and fold laundry",
          "Garage, patio or balcony",
        ],
      },
    ],
  },
];
