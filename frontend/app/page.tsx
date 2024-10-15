"use client";
import { useState } from "react";
import { MapPin, Home, Building2, Save, Trash2, Trees, DollarSign, X } from "lucide-react";
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

interface SelectedLocationsProps {
  locations: string[];
  onRemove: (location: string) => void;
}

const SelectedLocations: React.FC<SelectedLocationsProps> = ({ locations, onRemove }) => {
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
  const [priceLower, setPriceLower] = useState("0");
  const [priceUpper, setPriceUpper] = useState("0");
  const [ageLower, setAgeLower] = useState("0");
  const [ageUpper, setAgeUpper] = useState("0");
  const [yieldLower, setYieldLower] = useState("0");
  const [yieldUpper, setYieldUpper] = useState("0");
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

  const maxPriceOptions = [
    { value: "0", label: "上限なし" },
    { value: "300", label: "300万円以下" },
    { value: "500", label: "500万円以下" },
    { value: "800", label: "800万円以下" },
    { value: "1000", label: "1,000万円以下" },
    { value: "2000", label: "2,000万円以下" },
    { value: "2500", label: "2,500万円以下" },
    { value: "3000", label: "3,000万円以下" },
    { value: "3500", label: "3,500万円以下" },
    { value: "4000", label: "4,000万円以下" },
    { value: "4000", label: "4,000万円以下" },
    { value: "5000", label: "5,000万円以下" },
    { value: "6000", label: "6,000万円以下" },
    { value: "7000", label: "7,000万円以下" },
    { value: "8000", label: "8,000万円以下" },
    { value: "9000", label: "9,000万円以下" },
    { value: "10000", label: "1億円以下" },
    { value: "20000", label: "2億円以下" },
    { value: "30000", label: "3億円以下" },
    { value: "50000", label: "5億円以下" }
  ];
  const minPriceOptions = [
    { value: "0", label: "下限なし" },
    { value: "300", label: "300万円以上" },
    { value: "500", label: "500万円以上" },
    { value: "800", label: "800万円以上" },
    { value: "1000", label: "1,000万円以上" },
    { value: "2000", label: "2,000万円以上" },
    { value: "2500", label: "2,500万円以上" },
    { value: "3000", label: "3,000万円以上" },
    { value: "3500", label: "3,500万円以上" },
    { value: "4000", label: "4,000万円以上" },
    { value: "4000", label: "4,000万円以上" },
    { value: "5000", label: "5,000万円以上" },
    { value: "6000", label: "6,000万円以上" },
    { value: "7000", label: "7,000万円以上" },
    { value: "8000", label: "8,000万円以上" },
    { value: "9000", label: "9,000万円" },
    { value: "10000", label: "1億円以上" },
    { value: "20000", label: "2億円以上" },
    { value: "30000", label: "3億円以上" },
    { value: "50000", label: "5億円以上" }
  ];

  const maxAgeOptions = [
    { value: "0", label: "下限なし" },
    { value: "1", label: "1年以上" },
    { value: "3", label: "3年以上" },
    { value: "5", label: "5年以上" },
    { value: "10", label: "10年以上" },
    { value: "15", label: "15年以上" },
    { value: "20", label: "20年以上" },
    { value: "30", label: "30年以上" },
    { value: "35", label: "35年以上" },
    { value: "40", label: "40年以上" }
  ];
  const minAgeOptions = [
    { value: "0", label: "上限なし" },
    { value: "1", label: "1年以下" },
    { value: "3", label: "3年以下" },
    { value: "5", label: "5年以下" },
    { value: "10", label: "10年以下" },
    { value: "15", label: "15年以下" },
    { value: "20", label: "20年以下" },
    { value: "30", label: "30年以下" },
    { value: "35", label: "35年以下" },
    { value: "40", label: "40年以下" }
  ];

  const minyieldOptions = [
    { value: "0", label: "下限なし" },
    { value: "50", label: "50%以上" },
    { value: "100", label: "100%以上" },
    { value: "150", label: "150%以上" },
    { value: "200", label: "200%以上" },
    { value: "300", label: "300%以上" },
    { value: "400", label: "400%以上" },
    { value: "500", label: "500%以上" }
  ];

  const maxyieldOptions = [
    { value: "0", label: "上限なし" },
    { value: "50", label: "50%以下" },
    { value: "100", label: "100%以下" },
    { value: "150", label: "150%以下" },
    { value: "200", label: "200%以下" },
    { value: "300", label: "300%以下" },
    { value: "400", label: "400%以下" },
    { value: "500", label: "500%以下" }
  ];

  const minlandOptions = [
    { value: "0", label: "下限なし" },
    { value: "50", label: "50m2以上" },
    { value: "100", label: "100m2以上" },
    { value: "150", label: "150m2以上" },
    { value: "200", label: "200m2以上" },
    { value: "250", label: "250m2以上" },
    { value: "300", label: "300m2以上" },
    { value: "350", label: "350m2以上" },
    { value: "400", label: "400m2以上" },
    { value: "450", label: "450m2以上" },
    { value: "500", label: "500m2以上" },
    { value: "550", label: "550m2以上" },
    { value: "600", label: "600m2以上" },
    { value: "650", label: "650m2以上" },
    { value: "700", label: "700m2以上" },
    { value: "750", label: "750m2以上" },
    { value: "800", label: "800m2以上" },
    { value: "850", label: "850m2以上" },
    { value: "900", label: "900m2以上" },
    { value: "950", label: "950m2以上" },
    { value: "1000", label: "1000m2以上" },
    { value: "1050", label: "1050m2以上" },
    { value: "1100", label: "1100m2以上" },
    { value: "1150", label: "1150m2以上" },
    { value: "1200", label: "1200m2以上" },
    { value: "1250", label: "1250m2以上" },
    { value: "1300", label: "1300m2以上" },
    { value: "1350", label: "1350m2以上" },
    { value: "1400", label: "1400m2以上" },
    { value: "1450", label: "1450m2以上" },
    { value: "1500", label: "1500m2以上" }
  ];
  const maxlandOptions = [
    { value: "0", label: "上限なし" },
    { value: "50", label: "50m2以下" },
    { value: "100", label: "100m2以下" },
    { value: "150", label: "150m2以下" },
    { value: "200", label: "200m2以下" },
    { value: "250", label: "250m2以下" },
    { value: "300", label: "300m2以下" },
    { value: "350", label: "350m2以下" },
    { value: "400", label: "400m2以下" },
    { value: "450", label: "450m2以下" },
    { value: "500", label: "500m2以下" },
    { value: "550", label: "550m2以下" },
    { value: "600", label: "600m2以下" },
    { value: "650", label: "650m2以下" },
    { value: "700", label: "700m2以下" },
    { value: "750", label: "750m2以下" },
    { value: "800", label: "800m2以下" },
    { value: "850", label: "850m2以下" },
    { value: "900", label: "900m2以下" },
    { value: "950", label: "950m2以下" },
    { value: "1000", label: "1000m2以下" },
    { value: "1050", label: "1050m2以下" },
    { value: "1100", label: "1100m2以下" },
    { value: "1150", label: "1150m2以下" },
    { value: "1200", label: "1200m2以下" },
    { value: "1250", label: "1250m2以下" },
    { value: "1300", label: "1300m2以下" },
    { value: "1350", label: "1350m2以下" },
    { value: "1400", label: "1400m2以下" },
    { value: "1450", label: "1450m2以下" },
    { value: "1500", label: "1500m2以下" }
  ];

  const structures: { value: string; label: string }[] = [
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
                        <SelectValue placeholder="下限なし" defaultValue={"0"} />
                      </SelectTrigger>
                      <SelectContent>
                        {minPriceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>〜</span>
                    <Select value={priceUpper} onValueChange={setPriceUpper}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="上限なし" defaultValue={"0"} />
                      </SelectTrigger>
                      <SelectContent>
                        {maxPriceOptions.map((option) => (
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
                            {minyieldOptions.map((option) => (
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
                            {maxyieldOptions.map((option) => (
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
                            <SelectValue placeholder="下限なし" defaultValue={"0"} />
                          </SelectTrigger>
                          <SelectContent>
                            {minyieldOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>〜</span>
                        <Select value={yieldUpper} onValueChange={setYieldUpper}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="上限なし" defaultValue={"0"} />
                          </SelectTrigger>
                          <SelectContent>
                            {minyieldOptions.map((option) => (
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
                          {minAgeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span>〜</span>
                      <Select value={ageUpper} onValueChange={setAgeUpper}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="上限なし"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {maxAgeOptions.map((option) => (
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
                            <SelectValue placeholder="下限なし" defaultValue={"0"} />
                          </SelectTrigger>
                          <SelectContent>
                            {minlandOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>〜</span>
                        <Select value={yieldUpper} onValueChange={setYieldUpper}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="上限なし" defaultValue={"0"} />
                          </SelectTrigger>
                          <SelectContent>
                            {maxlandOptions.map((option) => (
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
