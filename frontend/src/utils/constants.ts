import { FaCodeBranch, FaCog } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { RxStarFilled } from "react-icons/rx";
import { GrProjects } from "react-icons/gr";

const BASE_URL = import.meta.env.VITE_API_URL;

export const navItems = [
  { href: "/", label: "Login", icon: "/login-icon.svg", width: 24, height: 24 },
  {
    href: "/",
    label: "About Us",
    icon: "/about-icon.svg",
    width: 24,
    height: 24,
  },
  { href: "/", label: "FAQs", icon: "/faq-icon.svg", width: 28, height: 28 },
];

export const USERS_URL = `${BASE_URL}/api/users`;
export const RESOURCS_URL = `${BASE_URL}/api/resources`;
export const NOTES_URL = `${BASE_URL}/api/notes`;
export const ROADMAPS_URL = `${BASE_URL}/api/roadmaps`;

// sidebar
export const sidebarSubMenusList = [
  {
    name: "favorites",
    icon: RxStarFilled,
    menu: [
      { label: "roadmaps", url: "/favorites/roadmaps" },
      { label: "resources", url: "/favorites/resources" },
    ],
  },
  {
    name: "contribute",
    icon: FaCirclePlus,
    menu: [
      { label: "roadmaps", url: "/contribute/roadmaps" },
      { label: "resources", url: "/contribute/resources" },
    ],
  },
];
export const sidebarSettingsSubMenu = [
  {
    name: "settings",
    icon: FaCog,
    menu: [
      { label: "profile", url: "/settings/profile" },
      { label: "theme", url: "" },
      { label: "logout", url: "" },
    ],
  },
];
export const sidebarMenu = [
  { name: "Home", href: "/home", size: 23, icon: IoHome },
  { name: "Resources", href: "/resources", size: 23, icon: GrResources },
  { name: "Roadmaps", href: "/roadmaps", size: 23, icon: FaCodeBranch },
  { name: "Projects", href: "/projects", size: 23, icon: GrProjects },
];

export const sortResourceDropdownItems = ["recent", "oldest"];
export const filterResourceDropdownItems = ["highest", "lowest"];

export const sortRoadmapDropdownItems = ["recent", "oldest"];
export const filterRoadmapDropdownItems = ["highest", "lowest"];

export const LOADER_DURATION = 4000;

export const HomePageHeaderLinks = [
  { url: "/resources", text: "Explore Resources", id: 1 },
  { url: "/roadmaps", text: "Explore Roadmaps", id: 2 },
];

export const landingCarouselImages = [
  {
    image: "/landing-page/carousel/tech.jpeg",
    name: "Main Coding Image",
    id: 1,
  },
  {
    image: "/landing-page/carousel/c5.jpeg",
    name: "Side Coding Image",
    id: 2,
  },
  {
    image: "/landing-page/carousel/c6.jpeg",
    name: "Side Coding Image",
    id: 3,
  },
  {
    image: "/landing-page/carousel/c7.jpeg",
    name: "Side Coding Image",
    id: 4,
  },
  {
    image: "/landing-page/carousel/mac.jpeg",
    name: "Side Coding Image",
    id: 5,
  },
  {
    image: "/landing-page/carousel/web.jpeg",
    name: "Side Coding Image",
    id: 6,
  },
  {
    image: "/landing-page/carousel/c10.jpeg",
    name: "Side Coding Image",
    id: 7,
  },
  {
    image: "/landing-page/carousel/coded.jpeg",
    name: "Side Coding Image",
    id: 8,
  },
  {
    image: "/landing-page/carousel/mac.jpeg",
    name: "Side Coding Image",
    id: 9,
  },
  {
    image: "/landing-page/carousel/aesthetic.jpeg",
    name: "Side Coding Image",
    id: 10,
  },
  {
    image: "/landing-page/carousel/code.jpeg",
    name: "Side Coding Image",
    id: 11,
  },
  {
    image: "/landing-page/carousel/study.jpeg",
    name: "Side Coding Image",
    id: 12,
  },
  {
    image: "/landing-page/carousel/binary.jpeg",
    name: "Side Coding Image",
    id: 13,
  },
];

export const homeHeaderButtons = [
  { text: "About Dev-10", url: "/" },
  { text: "Contact Us", url: "/" },
];

export const homeMainBannerButtons = [
  { text: "Resources", url: "/resources" },
  { text: "Roadmaps", url: "/roadmaps" },
  { text: "Trending", url: "/trending" },
];

export const currentSponsors = [
  {
    eventName: "code cubicle 2",
    eventDate: "April 3, 2024",
    eventLink: "https://codecubicle2.vercel.app/",
  },
  {
    eventName: "code cubicle 1",
    eventDate: "May 4, 2024",
    eventLink: "https://code-cubicle.devfolio.co/",
  },
];
