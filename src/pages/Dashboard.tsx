import { useState } from "react";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { ConversationsView } from "@/components/conversations/ConversationsView";
import { OrdersView } from "@/components/orders/OrdersView";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";
import { SettingsView } from "@/components/settings/SettingsView";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardView />;
      case "conversations":
        return <ConversationsView />;
      case "orders":
        return <OrdersView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarNav currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
