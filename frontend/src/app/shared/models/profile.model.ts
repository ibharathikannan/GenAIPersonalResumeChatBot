export interface NavLink {
  label: string;
  link: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  link: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  tagline: string;
  avatarUrl: string;
  speechBubbles: string[];
  navLinks: NavLink[];
  contact: { label: string; email: string; phone: string };
  socials: SocialLink[];
  footerLinks: FooterLink[];
}
