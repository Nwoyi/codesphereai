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
import { Search, Download, Eye, Phone, Clock, MessageSquare } from "lucide-react";
import { mockConversations, mockMessages } from "@/data/mockData";
import { formatDateTime, formatRelativeTime, getStatusColor } from "@/lib/formatters";
import type { Conversation, Message } from "@/types";

export function ConversationsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesSearch =
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customerPhone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const conversationMessages = selectedConversation
    ? mockMessages[selectedConversation.id] || []
    : [];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Conversations"
        description="View and manage WhatsApp bot conversations"
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="abandoned">Abandoned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conversations Table */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Phone</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Started</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden lg:table-cell">Messages</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredConversations.map((conv, index) => (
                <tr
                  key={conv.id}
                  className="hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {conv.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{conv.customerName}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">{conv.customerPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">
                    {conv.customerPhone}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-sm">
                      <p className="text-foreground">{formatRelativeTime(conv.startedAt)}</p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(conv.startedAt)}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize",
                        getStatusColor(conv.status) === 'success' && "bg-success/10 text-success",
                        getStatusColor(conv.status) === 'warning' && "bg-warning/10 text-warning",
                        getStatusColor(conv.status) === 'destructive' && "bg-destructive/10 text-destructive",
                        getStatusColor(conv.status) === 'info' && "bg-info/10 text-info",
                      )}
                    >
                      {conv.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" />
                      {conv.messageCount || 0}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversation(conv)}
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

        {filteredConversations.length === 0 && (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-foreground mb-1">No conversations found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Conversation Detail Modal */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {selectedConversation?.customerName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{selectedConversation?.customerName}</p>
                <p className="text-sm text-muted-foreground font-normal flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {selectedConversation?.customerPhone}
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {selectedConversation && formatDateTime(selectedConversation.startedAt)}
            </span>
            <Badge
              variant="secondary"
              className={cn(
                "capitalize",
                selectedConversation &&
                  getStatusColor(selectedConversation.status) === 'success' && "bg-success/10 text-success",
                selectedConversation &&
                  getStatusColor(selectedConversation.status) === 'info' && "bg-info/10 text-info",
              )}
            >
              {selectedConversation?.status}
            </Badge>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 py-4 scrollbar-thin">
            {conversationMessages.map((msg, index) => (
              <div
                key={msg.id}
                className={cn(
                  "flex animate-slide-up",
                  msg.sender === 'customer' ? "justify-start" : "justify-end"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5",
                    msg.sender === 'customer'
                      ? "bg-muted text-foreground rounded-bl-md"
                      : "bg-primary text-primary-foreground rounded-br-md"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.messageText}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      msg.sender === 'customer' ? "text-muted-foreground" : "text-primary-foreground/70"
                    )}
                  >
                    {formatDateTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
