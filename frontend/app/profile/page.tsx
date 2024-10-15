import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfileEdit() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Button variant="outline" className="mb-6">
          <Link href="/">戻る</Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">プロフィール編集</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <Button variant="outline">画像を変更</Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="company">会社名</Label>
                  <Input id="company" defaultValue="株式会社サンプル" />
                </div>
                <div>
                  <Label htmlFor="name">担当者名</Label>
                  <Input id="name" defaultValue="山田 太郎" />
                </div>
                <div>
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" type="email" defaultValue="yamada@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">電話番号</Label>
                  <Input id="phone" type="tel" defaultValue="03-1234-5678" />
                </div>
                <div>
                  <Label htmlFor="address">住所</Label>
                  <Input id="address" defaultValue="東京都千代田区〇〇1-2-3" />
                </div>
                <div>
                  <Label htmlFor="plan">プラン</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="plan">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="advance">Advance</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">キャンセル</Button>
                <Button>保存</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">LINE連携</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">LINEアカウントを連携して、より便利にサービスをご利用いただけます。</p>
            <Button className="w-full bg-[#00B900] hover:bg-[#00A000] text-white">LINEアカウントを連携する</Button>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">お問い合わせ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">ご不明な点やご要望がございましたら、お問い合わせフォームからお気軽にご連絡ください。</p>
          </CardContent>
          <CardFooter>
            <Link href="/contact" passHref>
              <Button className="w-full">お問い合わせフォームに飛ぶ</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
