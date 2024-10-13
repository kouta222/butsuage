"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useRouter } from "next/router";

export default function TermsOfService() {
  //   const router = useRouter();

  const handleAgree = () => {
    // Here you would typically update the user's status in your backend
    // to indicate they've agreed to the terms of service
    console.log("User agreed to terms of service");
    // router.push("/dashboard"); // Redirect to main dashboard after agreement
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">ブツあげシステム利用規約</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">1. サービスの利用</h2>
              <p>本サービスを利用するにあたり、ユーザーは以下の条件に同意するものとします。</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>本サービスの目的に沿った適切な利用を行うこと</li>
                <li>他のユーザーの権利を侵害しないこと</li>
                <li>法令や公序良俗に反する行為を行わないこと</li>
              </ul>

              <h2 className="text-xl font-semibold">2. アカウント管理</h2>
              <p>ユーザーは自身のアカウントの管理責任を負います。パスワードの管理には十分注意してください。</p>

              <h2 className="text-xl font-semibold">3. プライバシーポリシー</h2>
              <p>当社のプライバシーポリシーに従い、ユーザーの個人情報を適切に取り扱います。</p>

              <h2 className="text-xl font-semibold">4. サービスの変更・終了</h2>
              <p>当社は、事前の通知なくサービスの内容を変更、または終了する場合があります。</p>

              <h2 className="text-xl font-semibold">5. 免責事項</h2>
              <p>本サービスの利用によって生じたいかなる損害についても、当社は責任を負いません。</p>
            </div>
          </ScrollArea>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              利用規約に同意します
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAgree} className="w-full">
            同意して続ける
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
