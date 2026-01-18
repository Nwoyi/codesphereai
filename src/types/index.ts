// Multi-tenant types for Short-Let Property Management Dashboard

export type UserRole = 'admin' | 'owner' | 'staff';
export type ConversationStatus = 'active' | 'viewing_booked' | 'closed' | 'no_response';
export type ViewingStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';
export type PropertyStatus = 'available' | 'occupied' | 'maintenance';
export type LeadSource = 'google' | 'instagram' | 'direct' | 'referral' | 'whatsapp';

export interface Tenant {
  id: string;
  businessName: string;
  slug: string;
  phone: string;
  location: string;
  logoUrl?: string;
  createdAt: string;
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  role: UserRole;
  name: string;
  createdAt: string;
}

export interface Property {
  id: string;
  tenantId: string;
  name: string;
  location: string;
  propertyUrl?: string;
  bedrooms: number;
  pricePerNight: number;
  status: PropertyStatus;
  imageUrl?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  tenantId: string;
  guestName: string;
  guestPhone: string;
  propertyInterestedId?: string;
  propertyInterestedName?: string;
  status: ConversationStatus;
  firstMessageAt: string;
  lastMessageAt: string;
  responseTimeSeconds?: number;
  botHandled: boolean;
  messageCount?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'guest' | 'bot' | 'staff';
  messageText: string;
  timestamp: string;
}

export interface Viewing {
  id: string;
  tenantId: string;
  conversationId?: string;
  guestName: string;
  guestPhone: string;
  propertyId: string;
  propertyName: string;
  viewingDate: string;
  viewingTime: string;
  status: ViewingStatus;
  source: LeadSource;
  notes?: string;
  createdAt: string;
}

export interface BotMetrics {
  id: string;
  tenantId: string;
  date: string;
  totalInquiries: number;
  botResponses: number;
  manualResponses: number;
  avgResponseTime: number;
  afterHoursInquiries: number;
  viewingsBooked: number;
}

export interface DashboardMetrics {
  inquiriesToday: number;
  activeConversations: number;
  viewingsScheduled: number;
  responseRate: number;
  avgResponseTime: number;
  conversionRate: number;
  inquiriesThisWeek: number;
  inquiriesThisMonth: number;
  afterHoursInquiries: number;
  inquiriesTrend: number;
  viewingsTrend: number;
  responseTimeTrend: number;
}

export interface PropertyInterest {
  propertyId: string;
  propertyName: string;
  location: string;
  inquiries: number;
  viewingsBooked: number;
  conversionRate: number;
}

export interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
