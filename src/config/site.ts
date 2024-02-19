export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
  };
};

export const SITE_CONFIG: SiteConfig = {
  name: "MoodBoard",
  description: "Manage assets for generative AI ad campaigns.",
  url: "https://moodboard.anthonyraltieri.com",
  ogImage: "https://moodboard.anthonyaltieri.com/og.jpg",
  links: {
    twitter: "https://twitter.com/anthonyaltieri",
  },
};
