'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  variantId:string
}

interface CartSummaryProps {
  items: CartItem[]
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemoveItem?: (id: string) => void
}

export default function CartSummary({
  items,
  onUpdateQuantity,
}: CartSummaryProps) {
    console.log("items",items)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping =  0 
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(price)
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>
          <Badge variant="secondary">{items.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="max-h-80 space-y-4 overflow-y-auto pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={item?.image || "https://next-ecommerce-shopco.vercel.app/images/header-res-homepage.png"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h4 className="text-sm font-medium leading-tight">{item.name}</h4>
                  {item.variantId && (
                    <p className="text-xs text-muted-foreground">{item.variantId}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {onUpdateQuantity && (
                      <>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                      </>
                    )}
                    {!onUpdateQuantity && (
                      <span className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    {/* {onRemoveItem && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Invoice Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        {/* {subtotal < 100 && (
          <p className="text-xs text-muted-foreground">
            Add {formatPrice(100 - subtotal)} more for free shipping!
          </p>
        )} */}

        {/* {subtotal >= 100 && ( */}
          <div className="rounded-md bg-green-50 p-2 text-center text-xs text-green-700 dark:bg-green-900/20 dark:text-green-400">
            You qualify for free shipping!
          </div>
        {/* )} */}
      </CardContent>
    </Card>
  )
}
