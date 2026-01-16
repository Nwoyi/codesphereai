// Multi-tenant types for Marmen Groceries Dashboard

export type UserRole = 'admin' | 'owner' | 'staff';
export type ConversationStatus = 'active' | 'completed' | 'abandoned';
export type PaymentStatus = 'pending' | 'confirmed' | 'failed';

export interface Tenant {
  id: string;
  name: string;
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

export interface Conversation {
  id: string;
  tenantId: string;
  customerName: string;
  customerPhone: string;
  status: ConversationStatus;
  startedAt: string;
  lastMessageAt: string;
  messageCount?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'customer' | 'bot';
  messageText: string;
  timestamp: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tenantId: string;
  conversationId?: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentScreenshotUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  tenantId: string;
  name: string;
  price: number;
  stockQuantity: number;
  createdAt: string;
}

export interface DashboardMetrics {
  conversationsToday: number;
  activeOrders: number;
  completedOrders: number;
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  averageOrderValue: number;
  conversationsTrend: number;
  ordersTrend: number;
  revenueTrend: number;
}

export interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
