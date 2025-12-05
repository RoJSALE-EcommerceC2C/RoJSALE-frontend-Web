

export type User = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  registered: string;
  avatar: string;
  location: string;
  adsPosted: number;
  rating: number;
};

export type Ad = {
  id: string;
  title: string;
  category: string;
  status: 'Pending' | 'Active' | 'Flagged' | 'Expired';
  engagement: number;
  startDate: string;
  imageUrl: string;
  location: string;
  user: {
    name: string;
    date: string;
  },
  price: string;
  isPaid: boolean;
  flags?: number;
};

export type Subcategory = {
  id: string;
  name: string;
  adCount: number;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  adCount: number;
  subcategories: Subcategory[];
};

export type Package = {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  status: 'Active' | 'Archived';
  description: string;
  subscribers: number;
  revenue: number;
};

export type Payment = {
  id: string;
  user: { name: string; email: string };
  package: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  transactionId: {
    short: string;
    full: string;
  };
  method: 'UPI' | 'Credit Card' | 'Net Banking' | 'Wallet';
};

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

export type TrafficSource = {
  source: string;
  sourceName: string;
  visitors: number;
};

export type IncomeData = {
  name: string;
  value: number;
  fill: string;
};

export type Ticket = {
  ticketId: string;
  subject: string;
  user: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  lastUpdate: string;
  description: string;
};

export type Location = {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  adCount: number;
  cities: number;
  users: number;
  popularCities: string[];
  growth: number;
};

export type Notification = {
    id: string;
    icon: string;
    title: string;
    type: 'announcement' | 'reminder' | 'system' | 'report';
    description: string;
    recipients: number;
    openRate?: number;
    status: string;
}
