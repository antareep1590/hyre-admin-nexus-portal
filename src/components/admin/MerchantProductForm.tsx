import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Save,
  FileText,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DosageOption {
  id: number;
  label: string;
  pricePerMonth: number;
  priceTwoMonth: number;
  priceThreeMonth: number;
  isDefault: boolean;
}

interface MerchantDosageOption extends DosageOption {
  merchantPricePerMonth?: number;
  merchantPriceTwoMonth?: number;
  merchantPriceThreeMonth?: number;
}

interface ProductData {
  id?: number;
  name: string;
  category: string;
  basePrice: number;
  comparePrice: number;
  dosageOptions: MerchantDosageOption[];
  merchantBasePrice?: number;
  merchantComparePrice?: number;
}

interface MerchantProductFormProps {
  product: ProductData;
  onSave: (product: ProductData, isDraft?: boolean) => void;
  onCancel: () => void;
}

const suggestedMargins = [10, 15, 20, 25, 30];

export const MerchantProductForm: React.FC<MerchantProductFormProps> = ({
  product,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<ProductData>({
    ...product,
    merchantBasePrice: product.merchantBasePrice || product.basePrice,
    merchantComparePrice: product.merchantComparePrice || product.comparePrice,
    dosageOptions: product.dosageOptions.map(option => ({
      ...option,
      merchantPricePerMonth: option.merchantPricePerMonth || option.pricePerMonth,
      merchantPriceTwoMonth: option.merchantPriceTwoMonth || option.priceTwoMonth,
      merchantPriceThreeMonth: option.merchantPriceThreeMonth || option.priceThreeMonth,
    }))
  });

  const [marginPercentage, setMarginPercentage] = useState<number>(0);
  const [openSections, setOpenSections] = useState({
    pricing: true,
  });

  const updateField = (field: keyof ProductData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const applyMarginPricing = (margin: number) => {
    if (margin <= 0 || !product.basePrice) return;
    
    const adminBasePrice = product.basePrice;
    const newMerchantPrice = adminBasePrice * (1 + margin / 100);
    const newMerchantComparePrice = product.comparePrice * (1 + margin / 100);
    
    // Update merchant base price
    updateField('merchantBasePrice', Math.round(newMerchantPrice * 100) / 100);
    updateField('merchantComparePrice', Math.round(newMerchantComparePrice * 100) / 100);
    
    // Update all dosage option prices for merchant
    const updatedDosageOptions = formData.dosageOptions.map(option => ({
      ...option,
      merchantPricePerMonth: Math.round((option.pricePerMonth * (1 + margin / 100)) * 100) / 100,
      merchantPriceTwoMonth: Math.round((option.priceTwoMonth * (1 + margin / 100)) * 100) / 100,
      merchantPriceThreeMonth: Math.round((option.priceThreeMonth * (1 + margin / 100)) * 100) / 100,
    }));
    
    updateField('dosageOptions', updatedDosageOptions);
  };

  const handleMarginChange = (value: number) => {
    setMarginPercentage(value);
    if (value > 0) {
      applyMarginPricing(value);
    }
  };

  const handleSuggestedMargin = (margin: number) => {
    handleMarginChange(margin);
  };

  const updateMerchantDosageOption = (index: number, field: string, value: number) => {
    const updatedOptions = [...formData.dosageOptions];
    (updatedOptions[index] as any)[field] = value;
    updateField('dosageOptions', updatedOptions);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = (isDraft = false) => {
    onSave(formData, isDraft);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Set Your Pricing - {product.name}
          </h1>
          <p className="text-muted-foreground">
            Customize pricing for your business based on admin settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSave(true)}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(false)}>
            <FileText className="w-4 h-4 mr-2" />
            Apply Pricing
          </Button>
        </div>
      </div>

      {/* Pricing Section */}
      <Collapsible open={openSections.pricing} onOpenChange={() => toggleSection('pricing')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pricing Configuration</CardTitle>
                <ChevronDown className={cn("w-5 h-5 transition-transform", openSections.pricing && "rotate-180")} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              {/* Suggested Margins */}
              <div className="space-y-3">
                <Label>Quick Margin Setup</Label>
                <p className="text-sm text-muted-foreground">
                  Choose a suggested margin to automatically calculate your pricing
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedMargins.map(margin => (
                    <Button
                      key={margin}
                      variant={marginPercentage === margin ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSuggestedMargin(margin)}
                      className="flex items-center gap-1"
                    >
                      <DollarSign className="w-3 h-3" />
                      {margin}%
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Margin */}
              <div className="space-y-3">
                <Label htmlFor="margin-percentage">Custom Margin %</Label>
                <Input
                  id="margin-percentage"
                  type="number"
                  value={marginPercentage}
                  onChange={(e) => handleMarginChange(parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 18"
                  className="max-w-xs"
                />
              </div>

              <Separator />

              {/* Base Pricing Comparison */}
              <div className="space-y-4">
                <Label className="text-lg">Base Pricing</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Admin Pricing (Read-only) */}
                  <Card className="border-muted">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Admin Set Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Base Price</Label>
                        <div className="p-2 bg-muted rounded-md">
                          <span className="text-sm font-medium">${product.basePrice}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Original Price</Label>
                        <div className="p-2 bg-muted rounded-md">
                          <span className="text-sm font-medium">${product.comparePrice}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Merchant Pricing (Editable) */}
                  <Card className="border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-primary">Your Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="merchant-base-price">Your Base Price *</Label>
                        <Input
                          id="merchant-base-price"
                          type="number"
                          value={formData.merchantBasePrice}
                          onChange={(e) => updateField('merchantBasePrice', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="merchant-compare-price">Your Original Price</Label>
                        <Input
                          id="merchant-compare-price"
                          type="number"
                          value={formData.merchantComparePrice}
                          onChange={(e) => updateField('merchantComparePrice', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Dosage Options Comparison */}
              <div className="space-y-4">
                <Label className="text-lg">Dosage Options Pricing</Label>
                <div className="space-y-4">
                  {formData.dosageOptions.map((option, index) => (
                    <Card key={option.id} className="border border-border">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{option.label || `Dosage Option ${index + 1}`}</h4>
                              {option.isDefault && (
                                <Badge variant="secondary" className="text-xs mt-1">Default</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Admin Pricing (Read-only) */}
                            <div className="space-y-3">
                              <Label className="text-sm text-muted-foreground">Admin Set Pricing</Label>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1">
                                  <Label className="text-xs">1 Month</Label>
                                  <div className="p-2 bg-muted rounded-md text-center">
                                    <span className="text-sm">${option.pricePerMonth}</span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">2 Months</Label>
                                  <div className="p-2 bg-muted rounded-md text-center">
                                    <span className="text-sm">${option.priceTwoMonth}</span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">3 Months</Label>
                                  <div className="p-2 bg-muted rounded-md text-center">
                                    <span className="text-sm">${option.priceThreeMonth}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Merchant Pricing (Editable) */}
                            <div className="space-y-3">
                              <Label className="text-sm text-primary">Your Pricing</Label>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1">
                                  <Label className="text-xs">1 Month</Label>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={option.merchantPricePerMonth}
                                    onChange={(e) => updateMerchantDosageOption(index, 'merchantPricePerMonth', parseFloat(e.target.value) || 0)}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">2 Months</Label>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={option.merchantPriceTwoMonth}
                                    onChange={(e) => updateMerchantDosageOption(index, 'merchantPriceTwoMonth', parseFloat(e.target.value) || 0)}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">3 Months</Label>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={option.merchantPriceThreeMonth}
                                    onChange={(e) => updateMerchantDosageOption(index, 'merchantPriceThreeMonth', parseFloat(e.target.value) || 0)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};