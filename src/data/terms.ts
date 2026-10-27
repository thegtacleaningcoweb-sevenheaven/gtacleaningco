import { site } from "./site";

export interface TermItem {
  lead?: string;
  text: string;
}

export interface TermSection {
  title: string;
  intro?: string;
  items: TermItem[];
  note?: string;
}

export const termsIntro = `Welcome to The GTA Cleaning Co. We believe in keeping things clear, simple, and transparent. By booking or using our services through our website or any other method, you agree to the terms below.`;

export const termSections: TermSection[] = [
  {
    title: "1. How our service works",
    items: [
      {
        lead: "Connecting platform.",
        text: "The GTA Cleaning Co. operates as a platform that connects you with qualified, independent cleaning professionals.",
      },
      {
        lead: "Age requirement.",
        text: "You must be at least 18 years old to book a cleaning service.",
      },
      {
        lead: "100% digital payments.",
        text: "For safety and convenience, we do not accept cash. All payments are processed securely by credit or debit card.",
      },
    ],
  },
  {
    title: "2. What we do not clean",
    intro:
      "For the safety of our team and our hygiene standards, our independent cleaners do not perform the following tasks:",
    items: [
      { text: "Biohazards of any kind, including human or animal waste or fluids, pests, insects, or black mold." },
      { text: "Hoarding situations, or properties with extreme water or smoke damage." },
      { text: "Cleaning areas higher than a 2-step ladder." },
      { text: "Moving heavy furniture, anything over 25 lbs (11 kg)." },
      { text: "Outdoor areas, including patios, garages, and exterior windows." },
      { text: "Unfinished spaces, including concrete floors and unpainted walls." },
      { text: "Full wall washing. Light spot cleaning of small stains is fine." },
      { text: "Floor or furniture stripping, waxing, or refinishing." },
      { text: "Cleaning chandeliers or delicate glass light fixtures." },
    ],
  },
  {
    title: "3. Bookings, pricing, and adjustments",
    items: [
      {
        lead: "Accurate details.",
        text: "When booking, please give accurate information about your home: bedrooms, bathrooms, and total square footage.",
      },
      {
        lead: "Price adjustments.",
        text: "If a property is larger than declared, or needs extra attention because of its condition, we will contact you to adjust the price or switch the service to an hourly rate.",
      },
    ],
  },
  {
    title: "4. Cancellations and arrival windows",
    intro: "We understand plans change. To help us manage the schedule:",
    items: [
      { lead: "More than 48 hours' notice.", text: "Cancellation is free." },
      { lead: "24 to 48 hours' notice.", text: "A $50 cancellation fee applies." },
      {
        lead: "Less than 2 hours' notice, or no access to the home.",
        text: "A fee of 100% of the service cost will be charged. Cleaners wait up to 20 minutes before leaving for another job.",
      },
      {
        lead: "90-minute arrival window.",
        text: "Traffic and weather happen. Please allow a 90-minute arrival window. A 10:00 a.m. appointment means the team arrives between 10:00 a.m. and 11:30 a.m.",
      },
    ],
  },
  {
    title: "5. 100% satisfaction guarantee",
    intro: "We stand behind our work.",
    items: [
      {
        lead: "Complimentary re-cleans, not refunds.",
        text: "If a spot was missed, we do not offer cash refunds. We will return to re-clean the area at no charge, subject to availability.",
      },
      {
        lead: "Post-cleaning walkthrough.",
        text: "We ask for a walk-through with the team before they leave, so you can point out anything that needs attention right away.",
      },
      {
        lead: "24-hour notice.",
        text: "If you are not home during the cleaning, you have up to 24 hours after completion to email us with clear photos of the missed areas. Requests after 24 hours fall outside the guarantee.",
      },
    ],
    note: "The satisfaction guarantee does not apply to hourly cleaning services.",
  },
  {
    title: "6. Non-solicitation",
    intro:
      "Our cleaners go through background checks and a careful onboarding. By using The GTA Cleaning Co., you agree not to hire or solicit any of our cleaners directly for private services. If a cleaner is hired directly outside our platform, a $5,000 referral fee per cleaner applies.",
    items: [],
  },
  {
    title: "7. Liability and damages",
    items: [
      { text: "Our independent cleaners carry liability insurance for accidental property damage during a job." },
      { text: "Any damage must be reported to us in writing within 24 hours of the service." },
      {
        text: "We are not responsible for pre-existing wear and tear, improperly sealed surfaces, or valuable or sentimental items that were not stored safely before we arrive.",
      },
    ],
  },
  {
    title: "8. Governing law",
    intro: "These Terms & Conditions are governed by the laws of the Province of Ontario, Canada.",
    items: [],
  },
];

export const termsContact = {
  title: "Questions? Contact us",
  intro: "If you have a question about these terms, reach out.",
  email: site.email,
  url: site.website,
};
