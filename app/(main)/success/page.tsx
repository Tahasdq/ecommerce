"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BaseService } from "@/services/base.service";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const baseService = new BaseService();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid payment session");
      setLoading(false);
      return;
    }

    const getOrderStatus = async () => {
      try {
        const res = await baseService.get(
          `/order/status?sessionId=${sessionId}`
        );
        setOrder(res?.order);
      } catch (err) {
        setError("Failed to verify payment");
      } finally {
        setLoading(false);
      }
    };

    getOrderStatus();
  }, [sessionId]);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardContent className="py-10 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Verifying payment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-[420px]">
          <CardContent className="py-6">
            <Alert variant="destructive">
              <XCircle className="h-5 w-5" />
              <AlertTitle>Payment Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>

            <div className="mt-6 text-center">
              <Link href="/checkout-page">
                <Button variant="outline">Back to Checkout</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ✅ Success
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[420px] text-center">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">
            Payment Successful
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your order has been placed successfully.
          </p>

          <div className="rounded-lg border p-3 text-sm text-left">
            <p>
              <span className="font-medium">Order ID:</span>{" "}
              {order?._id}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {order?.paymentStatus}
            </p>
          </div>

          <Link href="/orders" className="block">
            <Button className="w-full">View Orders</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
