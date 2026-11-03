import { images } from "./images";

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
    alt: "White kitchen with cooktop finished after a post-construction clean",
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
  title: "Hi, I'm Lari, founder of The GTA Cleaning Co.",
  paragraphs: [
    "Proudly rooted in my Mexican heritage and locally operated right here in the GTA, my team and I are dedicated to elevating your living and working spaces. We specialize in meticulous, top-quality services—from regular maintenance to deep and move-in cleans—tailored specifically to your household's needs.",
    "Hands-on oversight, absolute reliability, and a passion for sparkling results define everything we do. Locally trusted, neighbor approved, and fully insured—let us take care of the details so you can enjoy a spotless home.",
  ],
  image: images.team,
  alt: "Portrait of Lari, founder of The GTA Cleaning Co.",
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
      "We do not accept cash. Payment is by credit or debit card and is due when the service is complete.",
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
      "If an area on your checklist was missed, we do not offer a cash refund. We will return to re-clean that area at no charge, subject to availability. If you are not home, email us within 24 hours with clear photos. This guarantee does not cover hourly cleaning.",
    more: { href: "/terms", label: "Terms & Conditions" },
    schema: true,
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer:
      "More than 48 hours' notice is free. From 24 to 48 hours' notice, a $50 fee applies. Less than 2 hours' notice, or if we cannot access the home, the fee is 100% of the service cost. The team waits up to 20 minutes. Please allow a 90-minute arrival window.",
    more: { href: "/terms", label: "Terms & Conditions" },
    schema: true,
  },
] as const;

export const exclusions = [
  {
    title: "Biohazards",
    text: "Human or animal waste or fluids, pests, insects, or black mold.",
  },
  {
    title: "Hoarding, water, or smoke damage",
    text: "Extreme conditions need a specialist, not a standard clean.",
  },
  {
    title: "Work above a 2-step ladder",
    text: "We do not clean areas higher than a 2-step ladder.",
  },
  {
    title: "Heavy furniture",
    text: "We do not move anything over 25 lbs (11 kg).",
  },
  {
    title: "Outdoor areas",
    text: "Patios, garages, and exterior windows are outside our scope.",
  },
  {
    title: "Unfinished spaces",
    text: "Concrete floors and unpainted walls.",
  },
  {
    title: "Full wall washing",
    text: "Light spot cleaning of small stains is fine.",
  },
  {
    title: "Stripping, waxing, or refinishing",
    text: "Floors and furniture are not stripped, waxed, or refinished.",
  },
  {
    title: "Chandeliers and delicate glass fixtures",
    text: "We do not clean chandeliers or delicate glass light fixtures.",
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
    beforeAlt: "Bathtub before cleaning, with soap scum along the tub",
    afterAlt: "Bathtub after cleaning, bright and clear",
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
    beforeAlt: "Living room before cleaning, with a jacket on the sofa",
    afterAlt: "Living room after cleaning, with the sofa cleared",
  },
  {
    caption: "Kitchen sink",
    before: images.sinkBefore,
    after: images.sinkAfter,
    beforeAlt: "Kitchen sink before cleaning, with water spots in the basin",
    afterAlt: "Kitchen sink after cleaning, bright and clear",
  },
] as const;
