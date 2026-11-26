// Site-wide navigation and product details, shared by the navbar, footer,
// homepage and product pages so links and prices only live in one place.

export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  {
    label: "Tuition",
    to: "/tuition",
    children: [
      { label: "1:1 Tuition", to: "/tuition#one-to-one", desc: "Bespoke weekly sessions built around you" },
      { label: "Group Tuition", to: "/tuition#group", desc: "Small-group bootcamps & revision workshops" },
      { label: "Recorded Group Sessions", to: "/tuition#recorded", desc: "Examiner-led lessons, on demand" },
    ],
  },
  {
    label: "Resources",
    to: "/resources",
    children: [
      { label: "Grade Booster Packs", to: "/resources#grade-booster-packs", desc: "Topic packs with A* model answers" },
      { label: "Learning Tables", to: "/resources#learning-tables", desc: "Every topic on a page" },
      { label: "Unseen Practice Papers", to: "/resources#unseen-practice-papers", desc: "Papers 1, 2 & 3 with detailed mark schemes" },
      { label: "Grade Transformation Course", to: "/resources#grade-transformation-course", desc: "Our flagship self-paced course" },
    ],
  },
  {
    label: "For Teachers",
    to: "/teachers",
    children: [
      { label: "Tutor Training Programme", to: "/tutor-partner", desc: "6-week examiner-led training" },
      { label: "Mentoring", to: "/teachers#mentoring", desc: "1:1 support from an AQA examiner" },
    ],
  },
  { label: "Schools", to: "/schools" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Meet Georgina", to: "/about#meet", desc: "The teacher behind the brand" },
      { label: "AQA Examiner & Experience", to: "/about#experience", desc: "9 years marking AQA Sociology" },
      { label: "Testimonials", to: "/about#testimonials", desc: "Real reviews from families" },
      { label: "FAQs", to: "/about#faqs", desc: "Your questions answered" },
    ],
  },
];

export const GET_STARTED = { label: "Get Started", to: "/contact" };

// Unseen practice papers, each paid for through its own checkout link.
export const UNSEEN_PAPERS = [
  { id: "paper-1-education", paper: "Paper 1", topics: "Education and Theory & Methods", url: "https://tr.ee/FAzIvP" },
  { id: "paper-2-families-beliefs", paper: "Paper 2", topics: "Families & Households and Beliefs", url: "https://tr.ee/QBIWhq" },
  { id: "paper-2-families-media", paper: "Paper 2", topics: "Families & Households and the Media", url: "https://tr.ee/wpM6D2" },
  { id: "paper-3-crime", paper: "Paper 3", topics: "Crime & Deviance and Theory & Methods", url: "https://tr.ee/MpnKfC" },
];

export const BOOSTER_PACKS = [
  {
    id: "globalisation",
    title: "Globalisation",
    paper: "AQA A-Level Sociology · Beliefs / Global Development",
    blurb:
      "Pin down globalisation in Sociology — top sociologists, the key debates, and an A* model answer that examiners actually reward.",
    price: "£9.99",
    stripe: "https://buy.stripe.com/4gM14n9iN6VJ0ZJ7Njgbm02",
  },
  {
    id: "marketisation",
    title: "Marketisation",
    paper: "AQA A-Level Sociology · Education",
    blurb:
      "Marketisation made crystal clear — parentocracy, league tables, formula funding and the policies examiners love. With a worked A* response.",
    price: "£9.99",
    stripe: "https://buy.stripe.com/9B600jbqV4NBcIr7Njgbm05",
  },
  {
    id: "privatisation",
    title: "Privatisation",
    paper: "AQA A-Level Sociology · Education",
    blurb:
      "Master privatisation of education — endogenous vs exogenous, key thinkers, and an examiner-led essay plan that picks up the top-band marks.",
    price: "£9.99",
    stripe: "https://buy.stripe.com/aFa9ATfHb2Ft8sbc3zgbm01",
  },
];

// The self-paced Thinkific course (previously shown as the "Sociology Grade
// Booster Course" in the shop).
export const COURSE = {
  title: "Grade Transformation Course",
  subtitle: "On-demand · Self-paced · Lifetime access",
  blurb:
    "Everything you need to transform your Sociology grade — every topic, every essay framework, examiner walkthroughs and worked A* answers. Watch on any device, any time.",
  url: "https://thetravellingtutor.thinkific.com/courses/take/examinersecrets",
  bullets: [
    "Examiner-led video lessons",
    "A* model answers across every paper",
    "Essay planning frameworks you can re-use",
    "Lifetime access · learn at your pace",
  ],
};

// TikTok teaching clips shown around the site. Stats copied from the TikTok
// app screenshots; other users' avatars and names are blurred in the images.
export const TIKTOK_URL = "https://www.tiktok.com/@thetravellingtutorx";
export const TIKTOK_CLIPS = {
  crime: {
    image: "/images/tiktok-crime.jpg",
    alt: "TikTok lesson: left vs right realists crime prevention",
    topic: "Crime & Deviance: left vs right realists",
    stats: [["42.6K", "views"], ["5,630", "likes"], ["2,740", "saves"], ["657", "shares"]],
  },
  beliefs: {
    image: "/images/tiktok-beliefs.jpg",
    alt: "TikTok lesson: Beliefs Paper 2, religious organisations",
    topic: "Beliefs: religious organisations",
    stats: [["12.4K", "views"], ["1,233", "likes"], ["479", "saves"]],
  },
  live: {
    image: "/images/tiktok-live.jpg",
    alt: "TikTok LIVE revision session with a student comment: best Sociology teacher ever",
    topic: "LIVE revision: dual burden & Ann Oakley",
    stats: [["3.2K", "likes"], ["LIVE", "Q&A"]],
  },
};

// First AQA paper of each subject in the coming exam season. Update these
// each year once AQA publishes the timetable; a passed date stops showing.
export const EXAM_DATES = [
  { subject: "Sociology", date: "2027-05-14" },
  { subject: "Psychology", date: "2027-05-18" },
];

// The free guide every email sign-up gets (downloads straight away).
export const SIGNUP_GUIDE = {
  name: "A* Essay Super-Structure",
  url: "/resources/essay-super-structure-families.pdf",
  filename: "Essay-Super-Structure-Families-and-Households-10m.pdf",
};
