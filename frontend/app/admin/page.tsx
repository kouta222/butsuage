"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Edit, Trash2, Plus, Clock, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

type Account = {
  id: number;
  companyName: string;
  email: string;
  status: "active" | "cancelled" | "inactive";
  plan: "standard" | "advance" | "premium";
};

type Plan = {
  name: string;
  startTime: string;
  deliveryInterval: number;
  maxConditions: number;
};

const plans: Plan[] = [
  { name: "standard", startTime: "06:00", deliveryInterval: 8, maxConditions: 5 },
  { name: "advance", startTime: "06:00", deliveryInterval: 4, maxConditions: 10 },
  { name: "premium", startTime: "06:00", deliveryInterval: 2, maxConditions: 20 }
];

const initialAccounts: Account[] = [
  { id: 1, companyName: "株式会社A", email: "company_a@example.com", status: "active", plan: "standard" },
  { id: 2, companyName: "株式会社B", email: "company_b@example.com", status: "cancelled", plan: "advance" },
  { id: 3, companyName: "株式会社C", email: "company_c@example.com", status: "inactive", plan: "premium" },
  { id: 4, companyName: "株式会社D", email: "company_d@example.com", status: "active", plan: "standard" },
  { id: 5, companyName: "株式会社E", email: "company_e@example.com", status: "active", plan: "premium" },
  { id: 6, companyName: "株式会社F", email: "company_e@example.com", status: "active", plan: "premium" }
];

export default function AdminScreen() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Account | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activePlan, setActivePlan] = useState<string>("all");
  const [deliverySettings, setDeliverySettings] = useState<Plan[]>(plans);

  const handleSort = (column: keyof Account) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedAccounts = [...accounts].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const filteredAccounts = sortedAccounts.filter((account) => (account.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || account.email.toLowerCase().includes(searchTerm.toLowerCase())) && (activePlan === "all" || account.plan === activePlan));

  const getStatusBadge = (status: Account["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active subscription</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled subscription</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive subscription</Badge>;
    }
  };

  const handleDeliverySettingChange = (planName: string, field: keyof Plan, value: string | number) => {
    setDeliverySettings((prevSettings) => prevSettings.map((setting) => (setting.name === planName ? { ...setting, [field]: value } : setting)));
  };

  const handleUpdateDeliverySettings = () => {
    console.log("Updated delivery settings:", deliverySettings);
    // Here you would typically send the updated settings to your backend
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              アカウント一覧
              {/* 新規アカウント作成ダイアログ */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    新規アカウント
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>新規アカウント作成</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="company-name">会社名</Label>
                      <Input id="company-name" placeholder="株式会社〇〇" />
                    </div>
                    <div>
                      <Label htmlFor="contact-name">担当者名</Label>
                      <Input id="contact-name" placeholder="山田 太郎" />
                    </div>
                    <div>
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input id="email" type="email" placeholder="example@company.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">電話番号</Label>
                      <Input id="phone" type="tel" placeholder="03-1234-5678" />
                    </div>
                    <div>
                      <Label htmlFor="address">住所</Label>
                      <Input id="address" placeholder="東京都千代田区〇〇1-2-3" />
                    </div>
                    <div>
                      <Label htmlFor="plan">プラン</Label>
                      <Select>
                        <SelectTrigger id="plan">
                          <SelectValue placeholder="プランを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="advance">Advance</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">
                      作成
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="検索" className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <Tabs defaultValue="all" onValueChange={setActivePlan}>
              <TabsList>
                <TabsTrigger value="all">全て</TabsTrigger>
                {plans.map((plan) => (
                  <TabsTrigger key={plan.name} value={plan.name} className="capitalize">
                    {plan.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="all">
                <AccountTable accounts={filteredAccounts} handleSort={handleSort} getStatusBadge={getStatusBadge} sortColumn={sortColumn} sortDirection={sortDirection} />
              </TabsContent>
              {plans.map((plan) => (
                <TabsContent key={plan.name} value={plan.name}>
                  <AccountTable accounts={filteredAccounts.filter((account) => account.plan === plan.name)} handleSort={handleSort} getStatusBadge={getStatusBadge} sortColumn={sortColumn} sortDirection={sortDirection} />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">配信タイミング設定</CardTitle>
          </CardHeader>
          <CardContent>
            {deliverySettings.map((plan) => (
              <div key={plan.name} className="mb-6">
                <h3 className="text-lg font-semibold mb-2 capitalize">{plan.name} Plan</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`${plan.name}-start-time`}>開始時間</Label>
                    <Input id={`${plan.name}-start-time`} type="time" value={plan.startTime} onChange={(e) => handleDeliverySettingChange(plan.name, "startTime", e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor={`${plan.name}-interval`}>配信間隔（時間）</Label>
                    <Input id={`${plan.name}-interval`} type="number" value={plan.deliveryInterval} onChange={(e) => handleDeliverySettingChange(plan.name, "deliveryInterval", parseInt(e.target.value))} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor={`${plan.name}-conditions`}>条件数</Label>
                    <Input id={`${plan.name}-conditions`} type="number" value={plan.maxConditions} onChange={(e) => handleDeliverySettingChange(plan.name, "maxConditions", parseInt(e.target.value))} className="mt-1" />
                  </div>
                </div>
              </div>
            ))}
            <Button className="mt-4" onClick={handleUpdateDeliverySettings}>
              <Clock className="mr-2 h-4 w-4" />
              配信タイミングを更新
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function AccountTable({ accounts, handleSort, getStatusBadge, sortColumn, sortDirection }: { accounts: Account[]; handleSort: (column: keyof Account) => void; getStatusBadge: (status: Account["status"]) => React.ReactNode; sortColumn: keyof Account | null; sortDirection: "asc" | "desc" }) {
  const getSortIcon = (column: keyof Account) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("companyName")} className="hover:bg-transparent">
              会社名 {getSortIcon("companyName")}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("email")} className="hover:bg-transparent">
              メールアドレス {getSortIcon("email")}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => handleSort("status")} className="hover:bg-transparent">
              ステータス {getSortIcon("status")}
            </Button>
          </TableHead>
          <TableHead className="text-right">アクション</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.companyName}</TableCell>
            <TableCell>{account.email}</TableCell>
            <TableCell>{getStatusBadge(account.status)}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
