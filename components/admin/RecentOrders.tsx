import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const orders = [
  { id: "#ORD-7352", customer: "Sarah Johnson", email: "sarah.j@email.com", amount: "$256.00", status: "Completed", date: "Jan 25, 2026" },
  { id: "#ORD-7351", customer: "Michael Chen", email: "m.chen@email.com", amount: "$189.50", status: "Processing", date: "Jan 25, 2026" },
  { id: "#ORD-7350", customer: "Emma Williams", email: "emma.w@email.com", amount: "$432.00", status: "Pending", date: "Jan 24, 2026" },
  { id: "#ORD-7349", customer: "James Wilson", email: "j.wilson@email.com", amount: "$78.00", status: "Completed", date: "Jan 24, 2026" },
  { id: "#ORD-7348", customer: "Lisa Anderson", email: "lisa.a@email.com", amount: "$567.00", status: "Cancelled", date: "Jan 23, 2026" },
];

const statusStyles: Record<string, string> = {
  Completed: "status-completed",
  Processing: "status-processing",
  Pending: "status-pending",
  Cancelled: "status-cancelled",
};

export function RecentOrders() {
  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
        <p className="text-sm text-muted-foreground">Latest orders from your store</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.email}</p>
                </div>
              </TableCell>
              <TableCell className="font-medium">{order.amount}</TableCell>
              <TableCell>
                <span className={cn("status-badge", statusStyles[order.status])}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
