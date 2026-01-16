import { useState } from "react";
import { PageHeader } from "../layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Building2, Bell, Shield, Palette } from "lucide-react";
import { mockTenant, mockUser } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

export function SettingsView() {
  const [settings, setSettings] = useState({
    businessName: mockTenant.name,
    phone: mockTenant.phone,
    location: mockTenant.location,
    email: mockUser.email,
    notifications: {
      newOrders: true,
      paymentConfirmations: true,
      dailyReports: false,
      weeklyReports: true,
    },
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Settings"
        description="Manage your business settings and preferences"
        actions={
          <Button onClick={handleSave} className="gap-2 bg-gradient-primary hover:opacity-90">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        }
      />

      <div className="max-w-2xl space-y-6">
        {/* Business Info */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Business Information</h3>
              <p className="text-sm text-muted-foreground">Your store details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="phone">WhatsApp Number</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure alert preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Order Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when new orders arrive</p>
              </div>
              <Switch
                checked={settings.notifications.newOrders}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, newOrders: checked },
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Payment Confirmations</p>
                <p className="text-sm text-muted-foreground">Alert when payments are confirmed</p>
              </div>
              <Switch
                checked={settings.notifications.paymentConfirmations}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, paymentConfirmations: checked },
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Daily Reports</p>
                <p className="text-sm text-muted-foreground">Receive daily sales summary</p>
              </div>
              <Switch
                checked={settings.notifications.dailyReports}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, dailyReports: checked },
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Receive weekly performance summary</p>
              </div>
              <Switch
                checked={settings.notifications.weeklyReports}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyReports: checked },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center text-info">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">Manage access and authentication</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
            </div>
            <div>
              <Button variant="outline" className="w-full justify-start">
                Enable Two-Factor Authentication
              </Button>
            </div>
            <div>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                Sign Out of All Devices
              </Button>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center text-accent-foreground">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Branding</h3>
              <p className="text-sm text-muted-foreground">Customize your dashboard appearance</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Business Logo</Label>
              <div className="mt-1.5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  M
                </div>
                <Button variant="outline">Upload Logo</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
