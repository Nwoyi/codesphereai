import { cn } from "@/lib/utils";
import { useState } from "react";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Download, Eye, Phone, Calendar, ShoppingCart, CheckCircle, XCircle, Clock } from "lucide-react";
import { mockOrders } from "@/data/mockData";
import { formatCurrency, formatDateTime, getStatusColor } from "@/lib/formatters";
import type { Order } from "@/types";
import { toast } from "@/hooks/use-toast";

export function OrdersView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState(mockOrders);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId: string, newStatus: 'confirmed' | 'failed') => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, paymentStatus: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
    
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, paymentStatus: newStatus } : null);
    }

    toast({
      title: newStatus === 'confirmed' ? "Payment Confirmed" : "Payment Failed",
      description: `Order ${orderId} status updated successfully.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Orders"
        description="Manage customer orders and payments"
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-warning/10 rounded-xl p-4 border border-warning/20">
          <p className="text-sm text-warning font-medium">Pending</p>
          <p className="text-2xl font-bold text-foreground">
            {orders.filter(o => o.paymentStatus === 'pending').length}
          </p>
        </div>
        <div className="bg-success/10 rounded-xl p-4 border border-success/20">
          <p className="text-sm text-success font-medium">Confirmed</p>
          <p className="text-2xl font-bold text-foreground">
            {orders.filter(o => o.paymentStatus === 'confirmed').length}
          </p>
        </div>
        <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
          <p className="text-sm text-destructive font-medium">Failed</p>
          <p className="text-2xl font-bold text-foreground">
            {orders.filter(o => o.paymentStatus === 'failed').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Order</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Customer</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Items</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Total</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(order.createdAt)}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div>
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{formatCurrency(order.totalAmount)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize flex items-center gap-1.5 w-fit",
                        getStatusColor(order.paymentStatus) === 'success' && "bg-success/10 text-success",
                        getStatusColor(order.paymentStatus) === 'warning' && "bg-warning/10 text-warning",
                        getStatusColor(order.paymentStatus) === 'destructive' && "bg-destructive/10 text-destructive",
                      )}
                    >
                      {getStatusIcon(order.paymentStatus)}
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                      className="gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-foreground mb-1">No orders found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Order {selectedOrder?.id}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "capitalize flex items-center gap-1.5",
                  selectedOrder &&
                    getStatusColor(selectedOrder.paymentStatus) === 'success' && "bg-success/10 text-success",
                  selectedOrder &&
                    getStatusColor(selectedOrder.paymentStatus) === 'warning' && "bg-warning/10 text-warning",
                  selectedOrder &&
                    getStatusColor(selectedOrder.paymentStatus) === 'destructive' && "bg-destructive/10 text-destructive",
                )}
              >
                {selectedOrder && getStatusIcon(selectedOrder.paymentStatus)}
                {selectedOrder?.paymentStatus}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Customer Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Customer</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {selectedOrder?.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedOrder?.customerName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    {selectedOrder?.customerPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
              <div className="space-y-2">
                {selectedOrder?.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{item.product}</span>
                      <span className="text-sm text-muted-foreground">×{item.quantity}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">
                  {selectedOrder && formatCurrency(selectedOrder.totalAmount)}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Ordered on {selectedOrder && formatDateTime(selectedOrder.createdAt)}
            </div>

            {/* Payment Screenshot */}
            {selectedOrder?.paymentScreenshotUrl && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Payment Screenshot</p>
                <img
                  src={selectedOrder.paymentScreenshotUrl}
                  alt="Payment proof"
                  className="w-full rounded-lg border border-border"
                />
              </div>
            )}

            {/* Actions */}
            {selectedOrder?.paymentStatus === 'pending' && (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 text-destructive hover:bg-destructive/10"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'failed')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Mark Failed
                </Button>
                <Button
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'confirmed')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Payment
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
