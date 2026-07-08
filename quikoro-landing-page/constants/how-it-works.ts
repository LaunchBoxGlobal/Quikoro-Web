import {
  Search,
  Calendar,
  CheckCircle2,
  ArrowRight,
  UserPlus,
  Inbox,
  DollarSign,
} from "lucide-react";

export const customerSteps = [
  {
    id: "search",
    title: "Search",
    description:
      "Pick a category and enter your area. See verified providers near you.",
    icon: Search,
  },
  {
    id: "book",
    title: "Book",
    description:
      "Send a booking request with your preferred date and a quick note.",
    icon: Calendar,
  },
  {
    id: "get-service",
    title: "Get Service",
    description:
      "Once the provider accepts, chat opens up. Get the job done and pay in cash.",
    icon: CheckCircle2,
  },
];

export const providerSteps = [
  {
    id: "profile",
    title: "Create Profile",
    description:
      "Sign up and list your services, availability, and pricing in minutes.",
    icon: UserPlus,
  },
  {
    id: "requests",
    title: "Receive Requests",
    description:
      "Get notified when customers in your area request your specific services.",
    icon: Inbox,
  },
  {
    id: "earn",
    title: "Earn Money",
    description:
      "Complete jobs successfully, build your reputation, and get paid.",
    icon: DollarSign,
  },
];
