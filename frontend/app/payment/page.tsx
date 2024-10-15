"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import PricingPage from "./paymenttable";

export default function Dashboard() {
  const [
    isSubscribed
    // setIsSubscribed
  ] = useState(false);
  const [
    currentPlan
    //  setCurrentPlan
  ] = useState(
    isSubscribed
      ? {
          name: "Standard",
          description: "8時間ごとに配信、条件数: 5",
          price: "¥50,000/月 (税別)"
        }
      : null
  );
  // const [showPricingTable, setShowPricingTable] = useState(false);

  const transactionHistory = isSubscribed
    ? [
        { id: 1, date: "2023-05-01", plan: "Standard", amount: 50000 },
        { id: 2, date: "2023-06-01", plan: "Standard", amount: 50000 },
        { id: 3, date: "2023-07-01", plan: "Advance", amount: 100000 },
        { id: 4, date: "2023-08-01", plan: "Advance", amount: 100000 },
        { id: 5, date: "2023-09-01", plan: "Million Finder", amount: 200000 }
      ]
    : [];

  //   function PricingPage() {
  //     // Paste the stripe-pricing-table snippet in your React component
  //     return <stripe-pricing-table pricing-table-id="prctbl_1Q9MIh2NBFGUETwJ8JZzY8tV" publishable-key="pk_test_51Pzs6W2NBFGUETwJgR5hG2IGwftHgAS6Ww0OiITXl1ddS3NYHFf5qU7yPYLUY5pkJ4FpUkeYyyDLq4YvBpYJNEiF00fqvrV7WU"></stripe-pricing-table>;
  //   }
  //   const handleSubscribe = () => {
  //     console.log("サブスクリプションに加入する");
  //     // Here you would typically redirect to a subscription page or open a modal
  //     return <stripe-pricing-table pricing-table-id="prctbl_1Q9MIh2NBFGUETwJ8JZzY8tV" publishable-key="pk_test_51Pzs6W2NBFGUETwJgR5hG2IGwftHgAS6Ww0OiITXl1ddS3NYHFf5qU7yPYLUY5pkJ4FpUkeYyyDLq4YvBpYJNEiF00fqvrV7WU"></stripe-pricing-table>;
  //   };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Button variant="outline" className="mb-6">
            <Link href="/">戻る</Link>
          </Button>
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsContent value="dashboard" className="space-y-4">
              {isSubscribed ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>現在のプラン</CardTitle>
                      <CardDescription>あなたの現在のサブスクリプションプラン</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h3 className="text-xl font-semibold">{currentPlan?.name}</h3>
                        <p className="text-gray-600">{currentPlan?.description}</p>
                        <p className="text-lg font-bold mt-2">{currentPlan?.price}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">プランを変更する</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>取引履歴</CardTitle>
                      <CardDescription>これまでの取引履歴を表示しています</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>日付</TableHead>
                            <TableHead>プラン</TableHead>
                            <TableHead className="text-right">金額（税別）</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactionHistory.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>{transaction.plan}</TableCell>
                              <TableCell className="text-right">¥{transaction.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>サブスクリプション</CardTitle>
                    <CardDescription>サービスを利用するには、サブスクリプションに加入してください</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">現在、サブスクリプションに加入していません。サービスの全機能を利用するには、サブスクリプションに加入する必要があります。</p>
                  </CardContent>
                  <PricingPage />
                  <CardFooter></CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
