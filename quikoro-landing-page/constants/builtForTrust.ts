import {
  ShieldCheck,
  CheckSquare,
  MessageSquare,
  Star,
  Flag,
  CheckCircle2,
} from "lucide-react";

export const features = [
  {
    id: "verified",
    badge: "100% BACKGROUND CHECKED",
    title: "Verified Providers",
    description:
      "Every professional on quikoro passes identity verification, license checks, and background screening before their first job.",
    icon: "/verified-providers.svg",
    span: "lg",
  },
  {
    id: "booking",
    badge: "INSTANT CONFIRMATION",
    title: "Direct Booking",
    description:
      "No middlemen. Request a pro, get a response, and confirm all within the app.",
    icon: "/direct-booking.svg",
    span: "sm",
  },
  {
    id: "chat",
    badge: "END-TO-END ENCRYPTED",
    title: "In-App Chat",
    description:
      "Private messaging opens only after a booking is confirmed, keeping your contact info protected.",
    icon: "/in-app-chat-icon.svg",
    span: "lg",
  },
  {
    id: "reviews",
    badge: "REAL CUSTOMER REVIEWS",
    title: "Ratings & Reviews",
    description:
      "Transparent reviews from real customers. Every rating is verified by the platform to ensure authenticity.",
    icon: "/ratings-and-reviews.svg",
    span: "sm",
  },
  {
    id: "report",
    badge: "24HR RESPONSE TIME",
    title: "Report Provider",
    description:
      "Something felt off? Report any provider directly in-app. Our safety team reviews within 24 hours.",
    icon: "/report-provider.svg",
    span: "lg",
  },
  {
    id: "payment",
    badge: "NO ONLINE PAYMENT",
    title: "Cash on Completion",
    description:
      "Pay cash after the job. No online payments or upfront deposits.",
    icon: "/direct-booking.svg",
    span: "sm",
  },
] as const;
