import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">ブツあげシステム</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">株式会社UNICS</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-50 bg-white	text-center	gap-2 border-2	rounded-sm	">
              <DropdownMenuLabel>株式会社UNICS</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <Link href="/profile">プロフィール編集</Link>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                <Link href="/payment">支払い情報</Link>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>ログアウト</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Header;
