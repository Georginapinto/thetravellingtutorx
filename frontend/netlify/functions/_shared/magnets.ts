export type Magnet = {
  title: string;
  // Path of the file under frontend/public, served from the site's own domain.
  path: string;
  // Only packs whose file has been uploaded send a download email.
  ready: boolean;
};

// Keys match the `magnet` prop passed to <LeadMagnetForm>.
export const MAGNETS: Record<string, Magnet> = {
  "essay-super-structure-families": {
    title: "Essay Super Structure: Families & Households (10m)",
    path: "/resources/essay-super-structure-families.pdf",
    ready: true,
  },
  "parent-guide": {
    title: "Parent Guide to Sociology Success",
    path: "/resources/parent-guide.pdf",
    ready: false,
  },
  "teacher-resources": {
    title: "Free Sociology Teaching Resources",
    path: "/resources/teacher-resources.pdf",
    ready: false,
  },
};

export const isKnownMagnet = (id: string): boolean => Object.hasOwn(MAGNETS, id);
