// app/admin/settings/page.tsx
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Store, Bell, CreditCard, Truck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <AdminHeader title="Settings" subtitle="Manage your store preferences" />

      <div className="p-6 max-w-4xl space-y-8">
        {/* Store Information */}
        <section className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Store Information</h3>
              <p className="text-sm text-muted-foreground">Basic store details</p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="My Store" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input id="storeEmail" type="email" defaultValue="contact@mystore.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  <SelectItem value="est">Eastern Time (EST)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Bell className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage notification preferences</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Order Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified for new orders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Low Stock Alerts</p>
                <p className="text-sm text-muted-foreground">Alert when products are low</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Customer Reviews</p>
                <p className="text-sm text-muted-foreground">Notify for new reviews</p>
              </div>
              <Switch />
            </div>
          </div>
        </section>

        {/* Payment Settings */}
        <section className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10">
              <CreditCard className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Payment</h3>
              <p className="text-sm text-muted-foreground">Configure payment methods</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Credit/Debit Cards</p>
                <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, Amex</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">PayPal</p>
                <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Truck className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Shipping</h3>
              <p className="text-sm text-muted-foreground">Configure shipping options</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Express Delivery</p>
                <p className="text-sm text-muted-foreground">1-2 day delivery option</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
