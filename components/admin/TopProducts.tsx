import { Progress } from "@/components/ui/progress";

const products = [
  { name: "Premium Headphones", sales: 234, revenue: "$11,700", percentage: 85 },
  { name: "Wireless Keyboard", sales: 189, revenue: "$9,450", percentage: 72 },
  { name: "USB-C Hub Pro", sales: 156, revenue: "$7,800", percentage: 60 },
  { name: "Mechanical Mouse", sales: 128, revenue: "$6,400", percentage: 52 },
  { name: "Monitor Stand", sales: 98, revenue: "$4,900", percentage: 40 },
];

export function TopProducts() {
  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Top Products</h3>
        <p className="text-sm text-muted-foreground">Best selling products this month</p>
      </div>
      <div className="p-6 space-y-5">
        {products.map((product, index) => (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted text-muted-foreground text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                </div>
              </div>
              <span className="font-semibold text-foreground">{product.revenue}</span>
            </div>
            <Progress value={product.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
