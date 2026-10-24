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
    text: "Keep your living space consistently clean with our maintenance plans. Flexible plans: weekly, bi-weekly, or monthly visits tailored to your lifestyle.",
    href: "/#svc-regular",
    link: "See what's included →",
    image: images.serviceRegular,
    alt: "Bedroom kept tidy with a regular clean",
  },
  {
    id: 2,
    title: "Deep Cleaning",
    text: "An intensive, floor-to-ceiling cleaning designed to provide an advanced, highly meticulous level of care for your home. This service focuses deeply on fine details, specialized surfaces, and comprehensive detailing that goes beyond a standard maintenance clean.",
    href: "/#svc-deep",
    link: "See what's included →",
    image: images.serviceDeep,
    alt: "Formal dining room after a deep clean",
  },
  {
    id: 3,
    title: "Move-In / Move-Out",
    text: "Simplify your move by getting your new property ready to live in, or ensure the place you are leaving looks immaculate for whoever comes next.",
    href: "/#svc-move",
    link: "See what's included →",
    image: images.serviceMove,
    alt: "Room packed up ahead of a move-out clean",
  },
  {
    id: 4,
    title: "Post-Construction / Renovation",
    text: "Cleaning for builders, contractors, developers, project managers, real estate professionals, and new homeowners across the GTA.",
    href: "/#quote",
    link: "Get a quote →",
    image: images.servicePost,
    alt: "Bathroom ready after post-construction cleaning",
  },
  {
    id: 5,
    title: "Commercial Cleaning",
    text: "Professional cleaning solutions designed for offices, studios, salons, and other commercial properties.",
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
  paragraphs: [
    "Proudly rooted in our Mexican heritage and locally operated right here in the GTA, we are a dedicated cleaning business committed to elevating your living and working spaces. We specialize in meticulous, top-quality services—from regular maintenance to deep and move-in cleans—tailored specifically to your household's needs.",
    "Hands-on oversight, absolute reliability, and a passion for sparkling results define everything we do. Locally trusted, neighbor approved, and fully insured—let us take care of the details so you can enjoy a spotless home.",
  ],
  image: images.team,
  alt: "Portrait of the person behind The GTA Cleaning Co.",
} as const;

export const reviews = [
  {
    quote:
      "I recently hired this cleaning company for a service, and I am beyond impressed with the results. From start to finish, the entire experience was nothing short of exceptional. The owner, Lari, is the epitome of true professionalism. She is incredibly organized, communicates clearly, and takes genuine pride in her work. Her attention to detail and commitment to quality are truly on another level. Every single corner of the space was left immaculate, spotless, and cared for with utmost precision. What stands out the most is the overall standard across all the services her cleaning company offers.",
    cite: "Celina Brix Ruiz",
  },
  {
    quote:
      "I've been using The GTA Cleaning Co for a long time now and I honestly have zero complaints. They are efficient, professional, and they catch the little details most people would miss. That's the difference. You can also trust them in your home, which says a lot. I still use them and I recommend them to anyone in Toronto looking for a cleaning service that's actually reliable. 5 stars, easy.",
    cite: "Danny Davalos",
  },
] as const;

export const faqs = [
  {
    question: "How do you determine pricing for your services?",
    answer:
      "Our rates depend on the service type and size of your property. We offer flat-rate pricing for standard residential services and hourly rates for custom or post-construction projects. All our rates include professional equipment, eco-friendly supplies, and a trained team. HST is added to all invoices as required in Ontario.",
    schema: true,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Interac e-Transfer and all major credit cards (Visa, Mastercard, American Express). Payments are due upon completion of the service.",
    schema: true,
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer:
      "No, you don't need to be home. Many of our clients provide a door code, lockbox combination, or key drop. We make sure your home is fully secured before we leave.",
    schema: true,
  },
  {
    question: "Are your cleaning products safe for pets and children?",
    answer:
      "Yes. We use non-toxic, eco-friendly, and pet-safe products for residential cleanings, so your family and pets can enjoy a clean, healthy space.",
    schema: true,
  },
  {
    question: "What is your hygiene policy regarding cloths and supplies?",
    answer:
      "We follow strict hygiene protocols and color-coded microfiber systems. We never cross-contaminate or use the same cloths in kitchens and bathrooms. Fresh, sanitized cloths and mop pads are used for every home.",
    schema: true,
  },
  {
    question: "How do you handle condo parking in Toronto and the GTA?",
    answer:
      "If free parking or a visitor spot is available, tell us in the booking notes. Where paid parking is required, such as downtown Toronto condos, the parking cost is added to the final invoice.",
    schema: true,
  },
  {
    question: "What if I am not 100% satisfied with the service?",
    answer:
      "Your satisfaction is our top priority. If any area covered in your checklist was missed, contact us within 24 hours of the service and we will return to re-clean those areas at no extra cost.",
    schema: true,
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer:
      "Please give at least 24 hours' notice to cancel or reschedule. Cancellations within 24 hours of the scheduled start time incur a $50 fee. You can also review our Policies for the full billing terms.",
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
