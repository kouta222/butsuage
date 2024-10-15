"use client";
import { useState } from "react";
import { MapPin, Home, Building2, Save, Trash2, Trees, DollarSign, X, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import Header from "@/components/Header";

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県"
];

const SelectedLocations = ({ locations, onRemove }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {locations.map((location) => (
        <Badge key={location} variant="secondary" className="text-sm">
          {location}
          <button onClick={() => onRemove(location)} className="ml-1 text-gray-500 hover:text-gray-700">
            <X size={14} />
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default function Component() {
  const [propertyType, setPropertyType] = useState("income");
  const [incomePropertyType, setIncomePropertyType] = useState("apartment");
  const [priceLower, setPriceLower] = useState("none");
  const [priceUpper, setPriceUpper] = useState("none");
  const [ageLower, setAgeLower] = useState("none");
  const [ageUpper, setAgeUpper] = useState("none");
  const [yieldLower, setYieldLower] = useState("none");
  const [yieldUpper, setYieldUpper] = useState("none");
  const [conditionName, setConditionName] = useState("");
  const [savedConditions, setSavedConditions] = useState([
    { id: 1, name: "東京都心部の高級マンション", active: true },
    { id: 2, name: "大阪の商業ビル", active: false },
    { id: 3, name: "福岡の新築物件", active: true }
  ]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const toggleSavedCondition = (id: number) => {
    setSavedConditions((prev) => prev.map((condition) => (condition.id === id ? { ...condition, active: !condition.active } : condition)));
  };

  const deleteSavedCondition = (id: number) => {
    setSavedConditions((prev) => prev.filter((condition) => condition.id !== id));
  };

  const saveCondition = () => {
    if (conditionName) {
      setSavedConditions((prev) => [...prev, { id: Date.now(), name: conditionName, active: true }]);
      setConditionName("");
    }
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]));
  };

  const removeLocation = (location: string) => {
    setSelectedLocations((prev) => prev.filter((l) => l !== location));
  };

  const priceOptions = [
    { value: "none", label: "下限なし" },
    { value: "1000", label: "1,000万円" },
    { value: "2000", label: "2,000万円" },
    { value: "3000", label: "3,000万円" },
    { value: "5000", label: "5,000万円" },
    { value: "10000", label: "1億円" },
    { value: "20000", label: "2億円" },
    { value: "30000", label: "3億円" }
  ];

  const ageOptions = [
    { value: "none", label: "下限なし" },
    { value: "1", label: "1年" },
    { value: "3", label: "3年" },
    { value: "5", label: "5年" },
    { value: "10", label: "10年" },
    { value: "15", label: "15年" },
    { value: "20", label: "20年" },
    { value: "30", label: "30年" }
  ];

  const yieldOptions = [
    { value: "none", label: "下限なし" },
    { value: "3", label: "3%" },
    { value: "5", label: "5%" },
    { value: "7", label: "7%" },
    { value: "10", label: "10%" },
    { value: "15", label: "15%" }
  ];

  const structures: { value: BuildingStructure; label: string }[] = [
    { value: "RC", label: "RC造" },
    { value: "Steel", label: "鉄骨造" },
    { value: "SRC", label: "SRC造" },
    { value: "Wood", label: "木造" },
    { value: "LightSteel", label: "軽量鉄骨造" }
  ];

  const bcrOptions = [
    { value: 30, label: "30%" },
    { value: 40, label: "40%" },
    { value: 50, label: "50%" },
    { value: 60, label: "60%" },
    { value: 70, label: "70%" },
    { value: 80, label: "80%" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="flex gap-8 max-md:flex-col">
        <Card className="mb-8 w-full">
          <CardHeader>
            <CardTitle>条件登録</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="conditionName">条件名</Label>
                  <Input id="conditionName" value={conditionName} onChange={(e) => setConditionName(e.target.value)} placeholder="条件名を入力" />
                </div>
                <div className="space-y-2">
                  <Label>駅徒歩</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1分以内</SelectItem>
                      <SelectItem value="3">3分以内</SelectItem>
                      <SelectItem value="5">5分以内</SelectItem>
                      <SelectItem value="10">10分以内</SelectItem>
                      <SelectItem value="15">15分以内</SelectItem>
                      <SelectItem value="20">20分以内</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>物件種類</Label>
                  <RadioGroup value={propertyType} onValueChange={setPropertyType} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="income" id="income" />
                      <Label htmlFor="income" className="flex items-center">
                        <DollarSign className="mr-2" size={18} />
                        収益物件
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="land" id="land" />
                      <Label htmlFor="land" className="flex items-center">
                        <Trees className="mr-2" size={18} />
                        土地
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2 ">
                  <Label>価格</Label>
                  <div className="flex items-center space-x-2">
                    <Select value={priceLower} onValueChange={setPriceLower}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="下限なし" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>〜</span>
                    <Select value={priceUpper} onValueChange={setPriceUpper}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="上限なし" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...priceOptions.slice(1), { value: "none", label: "上限なし" }].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {propertyType === "income" ? (
                    <div>
                      <Label>収益物件タイプ</Label>
                      <RadioGroup value={incomePropertyType} onValueChange={setIncomePropertyType} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="apartment" id="apartment" />
                          <Label htmlFor="apartment" className="flex items-center">
                            <Home className="mr-2" size={18} />
                            レジデンス
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="office" id="office" />
                          <Label htmlFor="office" className="flex items-center">
                            <Building2 className="mr-2" size={18} />
                            ビル
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <Label>所在地</Label>
                        <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <MapPin className="mr-2" size={18} />
                              地域を選択
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[400px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>所在地を選択</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="h-[60vh]">
                              <div className="space-y-4">
                                {prefectures.map((prefecture) => (
                                  <div key={prefecture} className="flex items-center space-x-2">
                                    <Checkbox id={prefecture} checked={selectedLocations.includes(prefecture)} onCheckedChange={() => toggleLocation(prefecture)} />
                                    <label htmlFor={prefecture}>{prefecture}</label>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                        <SelectedLocations locations={selectedLocations} onRemove={removeLocation} />
                      </div>
                    </div>
                  )}
                </div>

                {propertyType === "income" ? (
                  <div>
                    <Label>建物構造</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {structures.map((structure) => (
                        <div key={structure.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={structure.value}
                            // checked={selectedStructures.includes(structure.value)}
                            //  onCheckedChange={() => onStructureChange(structure.value)}
                          />
                          <Label htmlFor={structure.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {structure.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label>建蔽率</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {bcrOptions.map((structure) => (
                        <div key={structure.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={structure.value.toString()}
                            // checked={selectedStructures.includes(structure.value)}
                            //  onCheckedChange={() => onStructureChange(structure.value)}
                          />
                          <Label htmlFor={structure.value.toString()} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {structure.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {propertyType === "income" && (
                    <div>
                      <Label>所在地</Label>
                      <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <MapPin className="mr-2" size={18} />
                            地域を選択
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[400px] max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>所在地を選択</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh]">
                            <div className="space-y-4">
                              {prefectures.map((prefecture) => (
                                <div key={prefecture} className="flex items-center space-x-2">
                                  <Checkbox id={prefecture} checked={selectedLocations.includes(prefecture)} onCheckedChange={() => toggleLocation(prefecture)} />
                                  <label htmlFor={prefecture}>{prefecture}</label>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                      <SelectedLocations locations={selectedLocations} onRemove={removeLocation} />
                    </div>
                  )}
                </div>

                {propertyType === "income" ? (
                  <>
                    <div className="space-y-2 ">
                      <Label>利回り</Label>
                      <div className="flex items-center space-x-2">
                        <Select value={yieldLower} onValueChange={setYieldLower}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="下限なし" />
                          </SelectTrigger>
                          <SelectContent>
                            {yieldOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>〜</span>
                        <Select value={yieldUpper} onValueChange={setYieldUpper}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="上限なし" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...yieldOptions.slice(1), { value: "none", label: "上限なし" }].map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2 ">
                      <Label>容積率</Label>
                      <div className="flex items-center space-x-2">
                        <Select value={yieldLower} onValueChange={setYieldLower}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="下限なし" />
                          </SelectTrigger>
                          <SelectContent>
                            {yieldOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>〜</span>
                        <Select value={yieldUpper} onValueChange={setYieldUpper}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="上限なし" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...yieldOptions.slice(1), { value: "none", label: "上限なし" }].map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1"></div>
                {propertyType === "income" && (
                  <div>
                    <Label>築年数</Label>
                    <div className="flex items-center space-x-2">
                      <Select value={ageLower} onValueChange={setAgeLower}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="下限なし" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span>〜</span>
                      <Select value={ageUpper} onValueChange={setAgeUpper}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="上限なし" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...ageOptions.slice(1), { value: "none", label: "上限なし" }].map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {propertyType === "land" && (
                    <div className="space-y-2 ">
                      <Label>土地面積</Label>
                      <div className="flex items-center space-x-2">
                        <Select value={yieldLower} onValueChange={setYieldLower}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="下限なし" />
                          </SelectTrigger>
                          <SelectContent>
                            {yieldOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>〜</span>
                        <Select value={yieldUpper} onValueChange={setYieldUpper}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="上限なし" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...yieldOptions.slice(1), { value: "none", label: "上限なし" }].map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button className="w-32" onClick={saveCondition}>
                  <Save className="mr-2" size={18} />
                  保存
                </Button>

                <Button variant="outline" className="w-32">
                  リセット
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>保存済み条件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedConditions.map((condition) => (
                <div key={condition.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Switch checked={condition.active} onCheckedChange={() => toggleSavedCondition(condition.id)} />
                    <span className="font-medium">{condition.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteSavedCondition(condition.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">保存済み条件を削除</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
