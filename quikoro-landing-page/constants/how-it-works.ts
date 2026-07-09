import {
  Search,
  Calendar,
  CheckCircle2,
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
    title: "Get Approved",
    description:
      "Submit your profile. Our admin team reviews and approves before you go live.",
    icon: UserPlus,
  },
  {
    id: "requests",
    title: "Get Booked",
    description: "Customers in your area send you requests directly.",
    icon: Inbox,
  },
  {
    id: "earn",
    title: "Get Paid",
    description:
      "Accept the job, chat with the customer, complete the service, collect payment in cash.",
    icon: DollarSign,
  },
];
