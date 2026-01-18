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
import { Search, Download, Eye, Phone, Calendar, MapPin, CheckCircle, XCircle, Clock, UserX } from "lucide-react";
import { mockViewings } from "@/data/mockData";
import { formatDateTime, formatViewingDate, getStatusColor, getSourceIcon } from "@/lib/formatters";
import type { Viewing } from "@/types";
import { toast } from "@/hooks/use-toast";

export function ViewingsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedViewing, setSelectedViewing] = useState<Viewing | null>(null);
  const [viewings, setViewings] = useState(mockViewings);

  const filteredViewings = viewings.filter((viewing) => {
    const matchesSearch =
      viewing.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      viewing.guestPhone.includes(searchQuery) ||
      viewing.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      viewing.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || viewing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (viewingId: string, newStatus: Viewing['status']) => {
    setViewings(prev => 
      prev.map(viewing => 
        viewing.id === viewingId 
          ? { ...viewing, status: newStatus }
          : viewing
      )
    );
    
    if (selectedViewing?.id === viewingId) {
      setSelectedViewing(prev => prev ? { ...prev, status: newStatus } : null);
    }

    const statusLabels: Record<string, string> = {
      completed: 'Completed',
      cancelled: 'Cancelled',
      no_show: 'No-show',
      scheduled: 'Scheduled',
    };

    toast({
      title: `Viewing ${statusLabels[newStatus]}`,
      description: `Viewing ${viewingId} status updated successfully.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'no_show':
        return <UserX className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatStatus = (status: string): string => {
    return status.replace(/_/g, ' ');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Viewings"
        description="Manage property viewing appointments"
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-success/10 rounded-xl p-4 border border-success/20">
          <p className="text-sm text-success font-medium">Scheduled</p>
          <p className="text-2xl font-bold text-foreground">
            {viewings.filter(v => v.status === 'scheduled').length}
          </p>
        </div>
        <div className="bg-info/10 rounded-xl p-4 border border-info/20">
          <p className="text-sm text-info font-medium">Completed</p>
          <p className="text-2xl font-bold text-foreground">
            {viewings.filter(v => v.status === 'completed').length}
          </p>
        </div>
        <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
          <p className="text-sm text-destructive font-medium">Cancelled</p>
          <p className="text-2xl font-bold text-foreground">
            {viewings.filter(v => v.status === 'cancelled').length}
          </p>
        </div>
        <div className="bg-warning/10 rounded-xl p-4 border border-warning/20">
          <p className="text-sm text-warning font-medium">No-shows</p>
          <p className="text-2xl font-bold text-foreground">
            {viewings.filter(v => v.status === 'no_show').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest, phone, property, or ID..."
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
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no_show">No-show</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Viewings Table */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Viewing</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Guest</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Property</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date & Time</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredViewings.map((viewing, index) => (
                <tr
                  key={viewing.id}
                  className="hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{viewing.id}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {getSourceIcon(viewing.source)} via {viewing.source}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div>
                      <p className="font-medium text-foreground">{viewing.guestName}</p>
                      <p className="text-xs text-muted-foreground">{viewing.guestPhone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground hidden md:table-cell">
                    <p className="truncate max-w-[180px]">{viewing.propertyName}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">
                      {formatViewingDate(viewing.viewingDate, viewing.viewingTime)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "capitalize flex items-center gap-1.5 w-fit",
                        getStatusColor(viewing.status) === 'success' && "bg-success/10 text-success",
                        getStatusColor(viewing.status) === 'info' && "bg-info/10 text-info",
                        getStatusColor(viewing.status) === 'destructive' && "bg-destructive/10 text-destructive",
                        getStatusColor(viewing.status) === 'secondary' && "bg-muted text-muted-foreground",
                      )}
                    >
                      {getStatusIcon(viewing.status)}
                      {formatStatus(viewing.status)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedViewing(viewing)}
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

        {filteredViewings.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-foreground mb-1">No viewings found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Viewing Detail Modal */}
      <Dialog open={!!selectedViewing} onOpenChange={() => setSelectedViewing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Viewing {selectedViewing?.id}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "capitalize flex items-center gap-1.5",
                  selectedViewing &&
                    getStatusColor(selectedViewing.status) === 'success' && "bg-success/10 text-success",
                  selectedViewing &&
                    getStatusColor(selectedViewing.status) === 'info' && "bg-info/10 text-info",
                  selectedViewing &&
                    getStatusColor(selectedViewing.status) === 'destructive' && "bg-destructive/10 text-destructive",
                )}
              >
                {selectedViewing && getStatusIcon(selectedViewing.status)}
                {selectedViewing && formatStatus(selectedViewing.status)}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Guest Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Guest</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {selectedViewing?.guestName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedViewing?.guestName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    {selectedViewing?.guestPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Property Info */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Property</p>
              <div className="bg-muted/30 rounded-lg px-3 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{selectedViewing?.propertyName}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">
                {selectedViewing && formatViewingDate(selectedViewing.viewingDate, selectedViewing.viewingTime)}
              </span>
            </div>

            {/* Source */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{selectedViewing && getSourceIcon(selectedViewing.source)}</span>
              <span>Found via {selectedViewing?.source}</span>
            </div>

            {/* Notes */}
            {selectedViewing?.notes && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                <p className="text-sm text-foreground bg-muted/30 rounded-lg px-3 py-2">
                  {selectedViewing.notes}
                </p>
              </div>
            )}

            {/* Created */}
            <div className="text-sm text-muted-foreground">
              Created {selectedViewing && formatDateTime(selectedViewing.createdAt)}
            </div>

            {/* Actions */}
            {selectedViewing?.status === 'scheduled' && (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 text-destructive hover:bg-destructive/10"
                  onClick={() => handleUpdateStatus(selectedViewing.id, 'cancelled')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-warning hover:bg-warning/10"
                  onClick={() => handleUpdateStatus(selectedViewing.id, 'no_show')}
                >
                  <UserX className="w-4 h-4 mr-2" />
                  No-show
                </Button>
                <Button
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => handleUpdateStatus(selectedViewing.id, 'completed')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
