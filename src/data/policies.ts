export interface PolicyBlock {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export const policiesPdf = {
  href: "/pdfs/policies.pdf",
  filename: "our-policies.pdf",
} as const;

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
    paragraphs: [
      "Billing starts when our team arrives at the property, with a minimum of 4 hours per booking. Please give at least 48 hours' notice to cancel or reschedule; changes with less notice may incur a cancellation fee of $50. Recurring plans should be rescheduled within the same frequency window.",
    ],
  },
];
