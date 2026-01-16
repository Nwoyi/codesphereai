import type { 
  Tenant, 
  User, 
  Conversation, 
  Message, 
  Order, 
  DashboardMetrics 
} from '@/types';

// Mock Tenant - Marmen Groceries
export const mockTenant: Tenant = {
  id: 'tenant-001',
  name: 'Marmen Groceries',
  slug: 'marmen',
  phone: '+234 803 456 7890',
  location: 'Ikeja, Lagos, Nigeria',
  createdAt: '2024-01-15T08:00:00Z',
};

// Mock Current User
export const mockUser: User = {
  id: 'user-001',
  tenantId: 'tenant-001',
  email: 'admin@marmengroceries.ng',
  role: 'owner',
  name: 'Adebayo Okonkwo',
  createdAt: '2024-01-15T08:00:00Z',
};

// Mock Dashboard Metrics
export const mockMetrics: DashboardMetrics = {
  conversationsToday: 47,
  activeOrders: 12,
  completedOrders: 156,
  revenueToday: 245000,
  revenueThisWeek: 1450000,
  revenueThisMonth: 5680000,
  averageOrderValue: 15800,
  conversationsTrend: 12.5,
  ordersTrend: 8.3,
  revenueTrend: 15.2,
};

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-001',
    tenantId: 'tenant-001',
    customerName: 'Chioma Eze',
    customerPhone: '+234 812 345 6789',
    status: 'completed',
    startedAt: '2024-01-16T09:30:00Z',
    lastMessageAt: '2024-01-16T09:45:00Z',
    messageCount: 12,
  },
  {
    id: 'conv-002',
    tenantId: 'tenant-001',
    customerName: 'Emeka Obi',
    customerPhone: '+234 803 987 6543',
    status: 'active',
    startedAt: '2024-01-16T10:15:00Z',
    lastMessageAt: '2024-01-16T10:28:00Z',
    messageCount: 8,
  },
  {
    id: 'conv-003',
    tenantId: 'tenant-001',
    customerName: 'Fatima Bello',
    customerPhone: '+234 705 234 5678',
    status: 'completed',
    startedAt: '2024-01-16T08:00:00Z',
    lastMessageAt: '2024-01-16T08:22:00Z',
    messageCount: 15,
  },
  {
    id: 'conv-004',
    tenantId: 'tenant-001',
    customerName: 'Oluwaseun Adeyemi',
    customerPhone: '+234 816 789 0123',
    status: 'abandoned',
    startedAt: '2024-01-15T14:30:00Z',
    lastMessageAt: '2024-01-15T14:35:00Z',
    messageCount: 4,
  },
  {
    id: 'conv-005',
    tenantId: 'tenant-001',
    customerName: 'Grace Nwosu',
    customerPhone: '+234 909 456 7890',
    status: 'completed',
    startedAt: '2024-01-16T07:45:00Z',
    lastMessageAt: '2024-01-16T08:10:00Z',
    messageCount: 18,
  },
  {
    id: 'conv-006',
    tenantId: 'tenant-001',
    customerName: 'Ibrahim Musa',
    customerPhone: '+234 802 111 2222',
    status: 'active',
    startedAt: '2024-01-16T10:40:00Z',
    lastMessageAt: '2024-01-16T10:52:00Z',
    messageCount: 6,
  },
  {
    id: 'conv-007',
    tenantId: 'tenant-001',
    customerName: 'Aisha Mohammed',
    customerPhone: '+234 813 333 4444',
    status: 'completed',
    startedAt: '2024-01-15T16:00:00Z',
    lastMessageAt: '2024-01-15T16:25:00Z',
    messageCount: 14,
  },
  {
    id: 'conv-008',
    tenantId: 'tenant-001',
    customerName: 'Chinedu Okoro',
    customerPhone: '+234 706 555 6666',
    status: 'completed',
    startedAt: '2024-01-15T11:30:00Z',
    lastMessageAt: '2024-01-15T11:55:00Z',
    messageCount: 11,
  },
];

// Mock Messages for a conversation
export const mockMessages: Record<string, Message[]> = {
  'conv-001': [
    { id: 'msg-001', conversationId: 'conv-001', sender: 'customer', messageText: 'Hello, I want to order some groceries', timestamp: '2024-01-16T09:30:00Z' },
    { id: 'msg-002', conversationId: 'conv-001', sender: 'bot', messageText: 'Welcome to Marmen Groceries! 🛒 I\'m happy to help you with your order. What would you like to buy today?', timestamp: '2024-01-16T09:30:05Z' },
    { id: 'msg-003', conversationId: 'conv-001', sender: 'customer', messageText: 'I need 5kg of rice and 2 bottles of palm oil', timestamp: '2024-01-16T09:32:00Z' },
    { id: 'msg-004', conversationId: 'conv-001', sender: 'bot', messageText: 'Great choices! Here\'s your order:\n\n📦 5kg Rice - ₦8,500\n🫒 2x Palm Oil (1L) - ₦5,000\n\n💰 Total: ₦13,500\n\nWould you like to add anything else?', timestamp: '2024-01-16T09:32:10Z' },
    { id: 'msg-005', conversationId: 'conv-001', sender: 'customer', messageText: 'Add 1 pack of spaghetti', timestamp: '2024-01-16T09:35:00Z' },
    { id: 'msg-006', conversationId: 'conv-001', sender: 'bot', messageText: 'Done! Updated order:\n\n📦 5kg Rice - ₦8,500\n🫒 2x Palm Oil (1L) - ₦5,000\n🍝 1x Spaghetti Pack - ₦1,500\n\n💰 Total: ₦15,000\n\nReady to checkout?', timestamp: '2024-01-16T09:35:08Z' },
    { id: 'msg-007', conversationId: 'conv-001', sender: 'customer', messageText: 'Yes, proceed', timestamp: '2024-01-16T09:38:00Z' },
    { id: 'msg-008', conversationId: 'conv-001', sender: 'bot', messageText: 'Perfect! Please send your delivery address and make payment to:\n\nBank: GTBank\nAccount: 0123456789\nName: Marmen Groceries\nAmount: ₦15,000\n\nSend payment screenshot when done ✅', timestamp: '2024-01-16T09:38:12Z' },
    { id: 'msg-009', conversationId: 'conv-001', sender: 'customer', messageText: '15 Awolowo Road, Ikeja, Lagos', timestamp: '2024-01-16T09:40:00Z' },
    { id: 'msg-010', conversationId: 'conv-001', sender: 'customer', messageText: '[Payment Screenshot]', timestamp: '2024-01-16T09:43:00Z' },
    { id: 'msg-011', conversationId: 'conv-001', sender: 'bot', messageText: 'Thank you! 🎉 Payment received and confirmed.\n\nYour order #ORD-2024-001 will be delivered to:\n📍 15 Awolowo Road, Ikeja, Lagos\n\n🚚 Expected delivery: Within 2-3 hours\n\nWe\'ll notify you when your order is on the way!', timestamp: '2024-01-16T09:44:00Z' },
    { id: 'msg-012', conversationId: 'conv-001', sender: 'customer', messageText: 'Thank you!', timestamp: '2024-01-16T09:45:00Z' },
  ],
  'conv-002': [
    { id: 'msg-013', conversationId: 'conv-002', sender: 'customer', messageText: 'Hi, do you have fresh tomatoes?', timestamp: '2024-01-16T10:15:00Z' },
    { id: 'msg-014', conversationId: 'conv-002', sender: 'bot', messageText: 'Hello! Yes, we have fresh tomatoes in stock! 🍅\n\n• Small basket (2kg) - ₦2,500\n• Medium basket (5kg) - ₦5,500\n• Large basket (10kg) - ₦10,000\n\nWhich size would you like?', timestamp: '2024-01-16T10:15:08Z' },
    { id: 'msg-015', conversationId: 'conv-002', sender: 'customer', messageText: 'Medium basket please', timestamp: '2024-01-16T10:18:00Z' },
    { id: 'msg-016', conversationId: 'conv-002', sender: 'bot', messageText: 'Got it! 1x Medium Tomato Basket (5kg) - ₦5,500\n\nWould you like to add pepper or onions? They go great with tomatoes! 🌶️🧅', timestamp: '2024-01-16T10:18:06Z' },
    { id: 'msg-017', conversationId: 'conv-002', sender: 'customer', messageText: 'Yes add 2kg onions', timestamp: '2024-01-16T10:22:00Z' },
    { id: 'msg-018', conversationId: 'conv-002', sender: 'bot', messageText: 'Perfect combo! Your order:\n\n🍅 Medium Tomato Basket (5kg) - ₦5,500\n🧅 Fresh Onions (2kg) - ₦1,800\n\n💰 Total: ₦7,300\n\nProceed to checkout?', timestamp: '2024-01-16T10:22:10Z' },
    { id: 'msg-019', conversationId: 'conv-002', sender: 'customer', messageText: 'What\'s the delivery fee to Yaba?', timestamp: '2024-01-16T10:25:00Z' },
    { id: 'msg-020', conversationId: 'conv-002', sender: 'bot', messageText: 'Delivery to Yaba is ₦1,200 🚚\n\nNew Total: ₦8,500\n\nReady to place your order?', timestamp: '2024-01-16T10:25:08Z' },
  ],
};

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    tenantId: 'tenant-001',
    conversationId: 'conv-001',
    customerName: 'Chioma Eze',
    customerPhone: '+234 812 345 6789',
    items: [
      { product: '5kg Rice (Golden Penny)', quantity: 1, price: 8500 },
      { product: 'Palm Oil (1L)', quantity: 2, price: 2500 },
      { product: 'Spaghetti Pack', quantity: 1, price: 1500 },
    ],
    totalAmount: 15000,
    paymentStatus: 'confirmed',
    paymentScreenshotUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    createdAt: '2024-01-16T09:45:00Z',
    updatedAt: '2024-01-16T09:45:00Z',
  },
  {
    id: 'ORD-2024-002',
    tenantId: 'tenant-001',
    conversationId: 'conv-003',
    customerName: 'Fatima Bello',
    customerPhone: '+234 705 234 5678',
    items: [
      { product: 'Fresh Chicken (Whole)', quantity: 2, price: 4500 },
      { product: 'Seasoning Cubes (Box)', quantity: 1, price: 1200 },
      { product: 'Vegetable Oil (3L)', quantity: 1, price: 5500 },
    ],
    totalAmount: 15700,
    paymentStatus: 'confirmed',
    createdAt: '2024-01-16T08:22:00Z',
    updatedAt: '2024-01-16T08:30:00Z',
  },
  {
    id: 'ORD-2024-003',
    tenantId: 'tenant-001',
    conversationId: 'conv-005',
    customerName: 'Grace Nwosu',
    customerPhone: '+234 909 456 7890',
    items: [
      { product: 'Beans (5kg)', quantity: 1, price: 7500 },
      { product: 'Garri (5kg)', quantity: 2, price: 3500 },
      { product: 'Groundnut Oil (1L)', quantity: 2, price: 2800 },
      { product: 'Crayfish (500g)', quantity: 1, price: 3000 },
    ],
    totalAmount: 23100,
    paymentStatus: 'confirmed',
    createdAt: '2024-01-16T08:10:00Z',
    updatedAt: '2024-01-16T08:15:00Z',
  },
  {
    id: 'ORD-2024-004',
    tenantId: 'tenant-001',
    customerName: 'Emeka Obi',
    customerPhone: '+234 803 987 6543',
    items: [
      { product: 'Fresh Tomatoes (5kg)', quantity: 1, price: 5500 },
      { product: 'Fresh Onions (2kg)', quantity: 1, price: 1800 },
    ],
    totalAmount: 7300,
    paymentStatus: 'pending',
    createdAt: '2024-01-16T10:28:00Z',
    updatedAt: '2024-01-16T10:28:00Z',
  },
  {
    id: 'ORD-2024-005',
    tenantId: 'tenant-001',
    customerName: 'Ibrahim Musa',
    customerPhone: '+234 802 111 2222',
    items: [
      { product: 'Semolina (10kg)', quantity: 1, price: 9500 },
      { product: 'Sugar (1kg)', quantity: 3, price: 1500 },
    ],
    totalAmount: 14000,
    paymentStatus: 'pending',
    createdAt: '2024-01-16T10:52:00Z',
    updatedAt: '2024-01-16T10:52:00Z',
  },
  {
    id: 'ORD-2024-006',
    tenantId: 'tenant-001',
    conversationId: 'conv-007',
    customerName: 'Aisha Mohammed',
    customerPhone: '+234 813 333 4444',
    items: [
      { product: 'Indomie Noodles (Carton)', quantity: 1, price: 6500 },
      { product: 'Eggs (Crate)', quantity: 1, price: 3500 },
      { product: 'Milk (Peak, 400g)', quantity: 2, price: 1800 },
    ],
    totalAmount: 13400,
    paymentStatus: 'confirmed',
    paymentScreenshotUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    createdAt: '2024-01-15T16:25:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
  },
  {
    id: 'ORD-2024-007',
    tenantId: 'tenant-001',
    conversationId: 'conv-008',
    customerName: 'Chinedu Okoro',
    customerPhone: '+234 706 555 6666',
    items: [
      { product: 'Yam Tubers (3 pcs)', quantity: 1, price: 4500 },
      { product: 'Palm Oil (4L)', quantity: 1, price: 8500 },
    ],
    totalAmount: 13000,
    paymentStatus: 'confirmed',
    createdAt: '2024-01-15T11:55:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },
  {
    id: 'ORD-2024-008',
    tenantId: 'tenant-001',
    customerName: 'Ngozi Ike',
    customerPhone: '+234 814 777 8888',
    items: [
      { product: 'Frozen Fish (1kg)', quantity: 2, price: 3500 },
      { product: 'Fresh Pepper (1kg)', quantity: 1, price: 2200 },
    ],
    totalAmount: 9200,
    paymentStatus: 'failed',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
  },
];

// Revenue data for charts
export const revenueChartData = [
  { date: 'Mon', revenue: 185000, orders: 12 },
  { date: 'Tue', revenue: 220000, orders: 15 },
  { date: 'Wed', revenue: 195000, orders: 13 },
  { date: 'Thu', revenue: 280000, orders: 18 },
  { date: 'Fri', revenue: 320000, orders: 22 },
  { date: 'Sat', revenue: 250000, orders: 16 },
  { date: 'Sun', revenue: 180000, orders: 11 },
];

// Top products data
export const topProductsData = [
  { name: 'Rice (5kg)', sales: 45, revenue: 382500 },
  { name: 'Palm Oil (1L)', sales: 38, revenue: 95000 },
  { name: 'Fresh Tomatoes', sales: 32, revenue: 176000 },
  { name: 'Vegetable Oil (3L)', sales: 28, revenue: 154000 },
  { name: 'Chicken (Whole)', sales: 25, revenue: 112500 },
];
