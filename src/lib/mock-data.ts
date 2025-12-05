

import { User, Ad, Category, Package, Payment, Role, TrafficSource, Ticket, Location, Notification } from './types';
import { PlaceHolderImages } from './placeholder-images';

const userAvatar1 = PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageUrl || '';

export const MOCK_USERS: User[] = [
  { id: 'usr_001', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', mobile: '+91 9876543210', status: 'Active', registered: '2024-01-15', avatar: userAvatar1, location: 'Mumbai, Maharashtra', adsPosted: 12, rating: 4.5 },
  { id: 'usr_002', name: 'Priya Sharma', email: 'priya.sharma@email.com', mobile: '+91 9876543211', status: 'Active', registered: '2024-02-20', avatar: userAvatar1, location: 'Delhi, India', adsPosted: 8, rating: 4.2 },
  { id: 'usr_003', name: 'Amit Singh', email: 'amit.singh@email.com', mobile: '+91 9876543212', status: 'Suspended', registered: '2024-01-10', avatar: userAvatar1, location: 'Bangalore, Karnataka', adsPosted: 15, rating: 3.8 },
  { id: 'usr_004', name: 'Sneha Patel', email: 'sneha.patel@email.com', mobile: '+91 9876543213', status: 'Active', registered: '2024-03-05', avatar: userAvatar1, location: 'Ahmedabad, Gujarat', adsPosted: 6, rating: 4.7 },
  { id: 'usr_005', name: 'Vikash Gupta', email: 'vikash.gupta@email.com', mobile: '+91 9876543214', status: 'Pending', registered: '2024-03-20', avatar: userAvatar1, location: 'Pune, Maharashtra', adsPosted: 20, rating: 0 },
];

const adImage1 = PlaceHolderImages.find(img => img.id === 'ad-image-1')?.imageUrl || '';

export const MOCK_ADS: Ad[] = [
    { id: 'ad_001', title: 'iPhone 14 Pro Max 256GB', category: 'Electronics', location: 'Mumbai, Maharashtra', user: { name: 'Rajesh Kumar', date: '2024-03-20' }, price: '₹95,000', status: 'Pending', engagement: 245, isPaid: false, imageUrl: adImage1, startDate: '2024-03-20' },
    { id: 'ad_002', title: 'Honda City 2020 Model', category: 'Vehicles', location: 'Delhi, India', user: { name: 'Priya Sharma', date: '2024-03-18' }, price: '₹8,50,000', status: 'Active', engagement: 1520, isPaid: true, imageUrl: adImage1, startDate: '2024-03-18' },
    { id: 'ad_003', title: '2BHK Apartment for Rent', category: 'Real Estate', location: 'Bangalore, Karnataka', user: { name: 'Amit Singh', date: '2024-03-15' }, price: '₹25,000/month', status: 'Flagged', engagement: 890, isPaid: false, flags: 3, imageUrl: adImage1, startDate: '2024-03-15' },
    { id: 'ad_004', title: 'Designer Wedding Lehenga', category: 'Fashion', location: 'Ahmedabad, Gujarat', user: { name: 'Sneha Patel', date: '2024-03-12' }, price: '₹15,000', status: 'Active', engagement: 567, isPaid: true, imageUrl: adImage1, startDate: '2024-03-12' },
    { id: 'ad_005', title: 'Gaming Laptop Asus ROG', category: 'Electronics', location: 'Pune, Maharashtra', user: { name: 'Vikash Gupta', date: '2024-01-10' }, price: '₹75,000', status: 'Expired', engagement: 1200, isPaid: false, imageUrl: adImage1, startDate: '2024-01-10' },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat_001', name: 'Electronics', icon: 'Smartphone', adCount: 1250, subcategories: [
    { id: 'sub_001', name: 'Mobile Phones', adCount: 450 },
    { id: 'sub_002', name: 'Laptops & Computers', adCount: 320 },
    { id: 'sub_003', name: 'Cameras', adCount: 180 },
    { id: 'sub_004', name: 'Audio & Video', adCount: 300 },
  ] },
  { id: 'cat_002', name: 'Vehicles', icon: 'Car', adCount: 890, subcategories: [
    { id: 'sub_005', name: 'Cars', adCount: 600 },
    { id: 'sub_006', name: 'Motorcycles', adCount: 200 },
    { id: 'sub_007', name: 'Bicycles', adCount: 90 },
  ]},
  { id: 'cat_003', name: 'Real Estate', icon: 'Home', adCount: 650, subcategories: [
    { id: 'sub_008', name: 'For Sale: Houses & Apartments', adCount: 200 },
    { id: 'sub_009', name: 'For Rent: Houses & Apartments', adCount: 400 },
    { id: 'sub_010', name: 'Land & Plots', adCount: 50 },
  ] },
  { id: 'cat_004', name: 'Fashion & Beauty', icon: 'Shirt', adCount: 420, subcategories: [
      { id: 'sub_011', name: 'Clothing', adCount: 300 },
      { id: 'sub_012', name: 'Footwear', adCount: 100 },
      { id: 'sub_013', name: 'Accessories', adCount: 20 },
  ] },
  { id: 'cat_005', name: 'Home & Garden', icon: 'Lamp', adCount: 380, subcategories: [
    { id: 'sub_014', name: 'Furniture', adCount: 250 },
    { id: 'sub_015', name: 'Decor', adCount: 80 },
    { id: 'sub_016', name: 'Gardening', adCount: 50 },
  ] },
];

export const MOCK_PACKAGES: Package[] = [
  { id: 'pkg_001', name: 'Basic Boost', price: 99, duration: '7 days', features: ['Featured listing', 'Priority in search', 'Basic analytics'], status: 'Active', description: 'Perfect for individual sellers wanting more visibility', subscribers: 342, revenue: 33858 },
  { id: 'pkg_002', name: 'Premium Plus', price: 199, duration: '15 days', features: ['Featured listing', 'Top of category', 'Advanced analytics', 'Priority support'], status: 'Active', description: 'Ideal for businesses and frequent sellers', subscribers: 156, revenue: 31044 },
  { id: 'pkg_003', name: 'Super Seller', price: 399, duration: '30 days', features: ['Homepage placement', 'Category spotlight', 'Premium analytics', 'Dedicated support', 'Social media boost'], status: 'Active', description: 'Maximum exposure for serious sellers', subscribers: 89, revenue: 35511 },
  { id: 'pkg_004', name: 'Quick Sale', price: 49, duration: '3 days', features: ['Urgent badge', 'Quick contact', 'Mobile notifications'], status: 'Active', description: 'For sellers who need quick results', subscribers: 234, revenue: 11466 },
];

export const MOCK_PAYMENTS: Payment[] = [
    { id: 'pay_001', user: { name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com' }, package: '30 Days Premium', amount: 299, status: 'Completed', date: '2024-03-20', transactionId: { short: 'TXN001', full: 'UPI202403201234' }, method: 'UPI' },
    { id: 'pay_002', user: { name: 'Priya Sharma', email: 'priya.sharma@example.com' }, package: '60 Days Premium', amount: 499, status: 'Completed', date: '2024-03-19', transactionId: { short: 'TXN002', full: 'CC202403195678' }, method: 'Credit Card' },
    { id: 'pay_003', user: { name: 'Amit Singh', email: 'amit.singh@example.com' }, package: '90 Days Premium', amount: 699, status: 'Failed', date: '2024-03-18', transactionId: { short: 'TXN003', full: 'NB202403189012' }, method: 'Net Banking' },
    { id: 'pay_004', user: { name: 'Sneha Patel', email: 'sneha.patel@example.com' }, package: 'Featured Ad Boost', amount: 149, status: 'Pending', date: '2024-03-17', transactionId: { short: 'TXN004', full: 'WL202403173456' }, method: 'Wallet' },
    { id: 'pay_005', user: { name: 'Vikash Gupta', email: 'vikash.gupta@example.com' }, package: '45 Days Premium', amount: 399, status: 'Completed', date: '2024-03-16', transactionId: { short: 'TXN005', full: 'UPI202403167890' }, method: 'UPI' },
  ];

export const MOCK_ROLES: Role[] = [
    { id: 'role_001', name: 'Administrator', description: 'Has full access to all features.', permissions: ['full_admin_access'] },
    { id: 'role_002', name: 'Moderator', description: 'Can manage ads and users.', permissions: ['read_user', 'update_user', 'read_ad', 'update_ad', 'delete_ad'] },
    { id: 'role_003', name: 'Support', description: 'Can view users and assist with payments.', permissions: ['read_user', 'manage_payments'] },
];

export const MOCK_TRAFFIC_SOURCES: TrafficSource[] = [
  { source: 'websiteBlog', sourceName: 'Website Blog', visitors: 1250 },
  { source: 'socialMedia', sourceName: 'Social Media', visitors: 980 },
  { source: 'referral', sourceName: 'Referral', visitors: 640 },
];

export const MOCK_TICKETS: Ticket[] = [
    { ticketId: 'TKT-001', subject: 'Unable to post ad', user: 'Rajesh Kumar', status: 'Open', priority: 'High', lastUpdate: '2024-03-20', description: 'I am unable to post my ad. It shows error when I click submit button.' },
    { ticketId: 'TKT-002', subject: 'Payment not reflected', user: 'Priya Sharma', status: 'In Progress', priority: 'High', lastUpdate: '2024-03-19', description: 'I made payment for premium package but it is not reflecting in my account.' },
    { ticketId: 'TKT-003', subject: 'Account suspended wrongly', user: 'Amit Singh', status: 'Resolved', priority: 'Medium', lastUpdate: '2024-03-18', description: 'My account was suspended but I have not violated any terms.' },
    { ticketId: 'TKT-004', subject: 'Feature Request: Dark Mode', user: 'Sneha Patel', status: 'Open', priority: 'Low', lastUpdate: '2024-03-17', description: 'Please add a dark mode option to the application. It would be great for night-time use.' },
    { ticketId: 'TKT-005', subject: 'Spam ad reported', user: 'Vikash Gupta', status: 'Open', priority: 'High', lastUpdate: '2024-03-21', description: 'I have reported an ad that looks like spam. Please review it.' },
];
  

export const MOCK_LOCATIONS: Location[] = [
    { id: 'loc_001', name: 'Maharashtra', status: 'Active', adCount: 2847, cities: 156, users: 8923, popularCities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'], growth: 12 },
    { id: 'loc_002', name: 'Karnataka', status: 'Active', adCount: 1923, cities: 89, users: 6547, popularCities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'], growth: 8 },
    { id: 'loc_003', name: 'Tamil Nadu', status: 'Active', adCount: 1765, cities: 127, users: 5894, popularCities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'], growth: 5 },
    { id: 'loc_004', name: 'Gujarat', status: 'Active', adCount: 1456, cities: 73, users: 4723, popularCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'], growth: 9 },
    { id: 'loc_005', name: 'Rajasthan', status: 'Active', adCount: 1234, cities: 64, users: 3892, popularCities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'], growth: 7 },
    { id: 'loc_006', name: 'Uttar Pradesh', status: 'Active', adCount: 1127, cities: 118, users: 4156, popularCities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'], growth: 6 },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'notif_001', icon: 'CheckCircle', title: 'New Feature Launch', type: 'announcement', description: 'Introducing enhanced search filters for better ad discovery', recipients: 25847, openRate: 68.5, status: 'Sent: 2024-01-15 10:30' },
    { id: 'notif_002', icon: 'Clock', title: 'Package Expiry Reminder', type: 'reminder', description: 'Your premium package expires in 3 days. Renew now to continue enjoying benefits.', recipients: 342, status: 'Scheduled: 2024-01-16 09:00' },
    { id: 'notif_003', icon: 'AlertTriangle', title: 'System Maintenance Notice', type: 'system', description: 'Platform will be under maintenance on Jan 20th from 2:00 AM to 4:00 AM IST', recipients: 25847, status: '' },
    { id: 'notif_004', icon: 'CheckCircle', title: 'Weekly Performance Report', type: 'report', description: 'Your ads performed well this week! Check detailed analytics.', recipients: 1256, openRate: 72.3, status: 'Sent: 2024-01-14 18:00' },
];
