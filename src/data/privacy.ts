import { site } from "./site";

export interface PrivacyItem {
  lead?: string;
  text: string;
}

export interface PrivacySection {
  title: string;
  paragraphs?: string[];
  items: PrivacyItem[];
  ordered?: boolean;
}

export const privacyIntro = `At The GTA Cleaning Co., your privacy is very important to us. We believe in being transparent about how we collect, use, and protect your personal information. By using our website or our services, you agree to the practices described in this policy.`;

export const privacySections: PrivacySection[] = [
  {
    title: "1. How we collect and use your information",
    items: [
      {
        lead: "Specific purpose.",
        text: "We only collect personal details, such as your name, address, phone number, and payment information, that we need to book, perform, and manage your cleaning service.",
      },
      {
        lead: "No selling data.",
        text: "We will never sell, rent, or trade your personal information to third parties.",
      },
      {
        lead: "Limited retention.",
        text: "We only keep your data for as long as needed to fulfill your service request or comply with legal obligations.",
      },
      {
        lead: "Fair collection.",
        text: "We collect your information through fair and lawful means, always with your knowledge or consent.",
      },
    ],
  },
  {
    title: "2. Security and data protection",
    paragraphs: [
      "We protect your personal data with standard physical and digital security safeguards to prevent loss, theft, unauthorized access, disclosure, copying, or misuse.",
    ],
    items: [],
  },
  {
    title: "3. Social media login and data deletion",
    paragraphs: [
      "If you choose to log in to our platform using Facebook or another social media account, we do not store your private social media profile data on our servers beyond basic authentication.",
      "In line with social platform rules, including Facebook’s platform policy, you can remove a connected app and its activity at any time:",
    ],
    ordered: true,
    items: [
      { text: "Open your Facebook account and go to Settings & Privacy, then Settings." },
      { text: "Open Apps and Websites to see the services connected to your account." },
      { text: "Search for The GTA Cleaning Co. (or our login app)." },
      { text: "Choose Remove to revoke permissions and delete your app activity." },
    ],
  },
  {
    title: "4. Updates to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page, so you can see how we manage your information.",
    ],
    items: [],
  },
];

export const privacyContact = {
  title: "Contact us",
  intro: "If you have a question about this policy or how your data is handled, reach out.",
  email: site.email,
  url: site.website,
};
