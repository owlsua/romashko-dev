export interface SiteLink {
  key: string;
  label: string;
  url: string;
  message: string;
}

export interface SiteConfig {
  aboutContent: string;
  skills: string[];
  links: SiteLink[];
}
