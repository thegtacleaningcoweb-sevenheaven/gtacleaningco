import { billingNotice } from "./notices.ts";

export interface PolicyBlock {
  title: string;
  paragraphs: string[];
}

export const policiesPdf = {
  href: "/pdfs/policies.pdf",
  filename: "our-policies.pdf",
} as const;

export const policiesIntro =
  "A few simple policies help us give every client a smooth, safe, and professional experience.";

export const policies: PolicyBlock[] = [
  {
    title: "Payment policy",
    paragraphs: [
      "We do not accept cash. Payment is by credit or debit card and is due as soon as the cleaning is completed. If payment is not received within 15 minutes, a $20 late fee will be applied.",
      "Due to past instances of delayed payments being made the following day, we strictly enforce this policy to ensure smooth and fair service.",
    ],
  },
  {
    title: "Child safety and cleaning",
    paragraphs: [
      "For the safety of your children and to ensure a thorough, efficient cleaning, we kindly ask that children are supervised and kept away from cleaning areas and equipment during our service.",
      "For hygiene and safety reasons, due to past experiences where equipment was touched or placed in mouths, children should remain away from cleaning areas during the service. Once an area has been cleaned, it will not be re-cleaned if disrupted.",
    ],
  },
  {
    title: "Health and illness",
    paragraphs: [
      "If anyone in the household is feeling sick, or has a fever, cough, sore throat, flu-like symptoms, or has recently been exposed to illness, please let us know as soon as possible so we can reschedule your appointment.",
      "This helps keep our team, your household, and other clients safe and healthy.",
    ],
  },
  {
    title: "Add-ons",
    paragraphs: [
      "Add-ons are an extra charge if you want to add them.",
      "Please request any add-ons at the time of booking. Add-ons take extra time and labor, and late requests can cause delays for our next appointments.",
      "Any add-ons requested after booking will be scheduled for the next cleaning.",
    ],
  },
  {
    title: "Cancellation, rescheduling and billing",
    paragraphs: [billingNotice],
  },
];
