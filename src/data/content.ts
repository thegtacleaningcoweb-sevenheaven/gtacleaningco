import { images } from "./images";
import { billingNotice } from "./notices";

export const serviceAreas = [
  "Toronto",
  "North York",
  "Etobicoke",
  "Scarborough",
  "Mississauga",
  "Vaughan",
  "Markham",
  "Richmond Hill",
  "Oakville",
  "Aurora",
] as const;

export const services = [
  {
    id: 1,
    title: "Regular Cleaning",
    text: "Keep your home or office fresh and spotless, on a schedule that works for you.",
    href: "/#compare",
    link: "See what's included →",
    image: images.serviceRegular,
    alt: "Bedroom kept tidy with a regular clean",
  },
  {
    id: 2,
    title: "Deep Cleaning",
    text: "A more detailed clean for hard-to-reach areas and a deeper level of freshness.",
    href: "/#compare",
    link: "See what's included →",
    image: images.serviceDeep,
    alt: "Formal dining room after a deep clean",
  },
  {
    id: 3,
    title: "Move-In / Move-Out",
    text: "Start fresh or leave it spotless. Perfect for rentals and property transitions.",
    href: "/#compare",
    link: "See what's included →",
    image: images.serviceMove,
    alt: "Room packed up ahead of a move-out clean",
  },
  {
    id: 4,
    title: "Post-Construction",
    text: "Remove dust and debris and get your space truly ready to enjoy.",
    href: "/#quote",
    link: "Get a quote →",
    image: images.servicePost,
    alt: "Bathroom ready after post-construction cleaning",
  },
  {
    id: 5,
    title: "Commercial",
    text: "Clean, professional spaces for your team and your clients.",
    href: "/#quote",
    link: "Get a quote →",
    image: images.serviceCommercial,
    alt: "Office cleaned for a commercial client",
  },
] as const;

export const steps = [
  {
    title: "Tell us about your property",
    text: "Share the type and size of your space.",
  },
  {
    title: "Choose your service",
    text: "Select the cleaning service you need.",
  },
  {
    title: "Pick add-ons",
    text: "Add extras like steam cleaning or inside appliances.",
  },
  {
    title: "Get your quote",
    text: "We'll send your quote and availability.",
  },
] as const;

export const reasons = [
  {
    title: "Quality you can count on",
    text: "Every job is supervised to meet our high standards.",
  },
  {
    title: "Open communication",
    text: "Clear, friendly, and always available for your needs.",
  },
  {
    title: "Tailored to you",
    text: "Flexible plans and custom solutions for every space.",
  },
  {
    title: "Locally trusted",
    text: "Proud to serve Toronto and the GTA with care and consistency.",
  },
] as const;

export const about = {
  title: "Hi, we're The GTA Cleaning Co.",
  text: "We bring reliable, high-quality cleaning to homes and businesses across the GTA, with attention to detail, consistency, and open communication on every project.",
  quote: "Locally trusted. Neighbors approved.",
  image: images.team,
  alt: "The GTA Cleaning Co. team",
} as const;

export const review = {
  stars: "★★★★★",
  quote: "Add a real client review here.",
  cite: "Client name, neighbourhood",
} as const;

export const faqs = [
  {
    question: "What areas do you cover?",
    answer: "Toronto and the GTA, for homes and commercial spaces.",
    schema: true,
  },
  {
    question: "Are your cleaners insured?",
    answer: "[Add your answer]",
    schema: false,
  },
  {
    question: "Do you bring your own supplies?",
    answer: "[Add your answer]",
    schema: false,
  },
  {
    question: "How do payments work?",
    answer:
      "Payment is due as soon as the cleaning is completed. See our Payment Policy under Policies.",
    schema: true,
  },
] as const;

export interface PolicyBlock {
  title: string;
  paragraphs: string[];
  list?: string[];
  highlight?: boolean;
}

export const policies: PolicyBlock[] = [
  {
    title: "Payment policy",
    paragraphs: [
      "Payment is due as soon as the cleaning is completed. If payment is not received within <strong>15 minutes</strong>, a <strong>$20 late fee</strong> will be applied.",
      "Due to past instances of delayed payments being made the following day, we strictly enforce this policy to ensure smooth and fair service.",
    ],
  },
  {
    title: "Arrival policy: safety & entry",
    paragraphs: ["For the safety of both our clients and our team:"],
    list: [
      "We do not knock on doors or ring doorbells upon arrival.",
      "Our staff will wait in their vehicle until we receive approval from the client to enter the home.",
      "Please make sure we have received your confirmation before our team approaches the home.",
    ],
  },
  {
    title: "Child safety & cleaning policy",
    paragraphs: [
      "For the safety of your children and to ensure a thorough, efficient cleaning, we kindly ask that children are supervised and kept away from cleaning areas and equipment during our service.",
      "For hygiene and safety reasons, due to past experiences where equipment was touched or placed in mouths, children should remain away from cleaning areas during the service. Once an area has been cleaned, it will not be re-cleaned if disrupted.",
    ],
  },
  {
    title: "Health & illness: please read before your appointment",
    paragraphs: [
      "If anyone in the household is feeling sick, or has a fever, cough, sore throat, flu-like symptoms, or has recently been exposed to illness, please let us know as soon as possible so we can reschedule your appointment.",
      "This helps keep our team, your household, and other clients safe and healthy.",
    ],
  },
  {
    title: "Add-ons: important notice",
    paragraphs: [
      "<strong>Add-ons are an extra charge if you want to add them.</strong>",
      "Please request any add-ons <strong>at the time of booking</strong>. Add-ons take extra time and labor, and late requests can cause delays for our next appointments.",
      "<strong>Any add-ons requested after booking will be scheduled for the next cleaning.</strong>",
    ],
  },
  {
    title: "Cancellation, rescheduling & billing",
    highlight: true,
    paragraphs: [billingNotice],
  },
];

export const exclusions = [
  {
    title: "Biohazard and hazardous materials",
    text: "Including mold remediation and biological or chemical cleanup.",
  },
  {
    title: "Hoarding or severe-condition clean-outs",
    text: "These need a specialist crew and a custom assessment.",
  },
  {
    title: "Exterior windows and work at heights",
    text: "For safety, we clean interior windows only.",
  },
  {
    title: "Moving heavy furniture or appliances",
    text: "We clean around and under what can be moved safely.",
  },
  {
    title: "Repairs, painting, and wall or ceiling washing",
    text: "We spot clean walls but do not repaint or repair.",
  },
  {
    title: "Pest control and yard work",
    text: "Outside the scope of our cleaning services.",
  },
] as const;

export const galleryPairs = [
  {
    caption: "Loft bedroom",
    before: images.before,
    after: images.after,
    beforeAlt: "Loft bedroom before cleaning, with clothes on the floor",
    afterAlt: "Loft bedroom after cleaning, with the bed made",
  },
  {
    caption: "Bathroom",
    before: images.bathBefore,
    after: images.bathAfter,
    beforeAlt: "Bathroom before cleaning, with a mop and bucket",
    afterAlt: "Bathroom after cleaning",
  },
  {
    caption: "Kids' bedroom",
    before: images.bedBefore,
    after: images.bedAfter,
    beforeAlt: "Kids' bedroom before cleaning",
    afterAlt: "Kids' bedroom after cleaning",
  },
  {
    caption: "Bedroom",
    before: images.bedroomBefore,
    after: images.bedroomAfter,
    beforeAlt: "Bedroom before cleaning, with a bicycle in the room",
    afterAlt: "Bedroom after cleaning",
  },
  {
    caption: "Living room",
    before: images.livingBefore,
    after: images.livingAfter,
    beforeAlt: "Living room before cleaning",
    afterAlt: "Living room after cleaning",
  },
] as const;
