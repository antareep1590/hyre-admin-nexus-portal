import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  Plus, 
  X, 
  Upload, 
  GripVertical, 
  Eye,
  Save,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface DosageOption {
  id: number;
  label: string;
  pricePerMonth: number;
  isDefault: boolean;
}

interface SubscriptionPricing {
  oneMonth: number;
  twoMonth: number;
  threeMonth: number;
}

interface ProductData {
  id?: number;
  name: string;
  category: string;
  tags: string[];
  sku: string;
  status: 'Active' | 'Inactive';
  description: string;
  benefits: string;
  sideEffects: string;
  ingredients: string;
  instructions: string;
  faqs: { question: string; answer: string; }[];
  shippingReturns: string;
  images: { url: string; alt: string; }[];
  videoUrl: string;
  basePrice: number;
  comparePrice: number;
  subscriptionPricing: SubscriptionPricing;
  dosageOptions: DosageOption[];
  relatedProductIds: number[];
  prescriptionRequired: boolean;
  fulfillmentType: string;
  fdaWarning: boolean;
  prescriptionNotes: string;
  ageRestriction: number;
}

interface ProductFormProps {
  product?: ProductData;
  categories: string[];
  allProducts: any[];
  onSave: (product: ProductData, isDraft?: boolean) => void;
  onCancel: () => void;
}

const categories = ["Weight Loss", "Anti-Aging", "Peptides", "Fitness", "Wellness"];
const fulfillmentTypes = ["Pharmacy-Shipped", "In-Clinic", "Telemedicine", "Other"];

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories: propCategories = categories,
  allProducts = [],
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<ProductData>({
    name: product?.name || '',
    category: product?.category || '',
    tags: product?.tags || [],
    sku: product?.sku || '',
    status: product?.status || 'Active',
    description: product?.description || '',
    benefits: product?.benefits || '',
    sideEffects: product?.sideEffects || '',
    ingredients: product?.ingredients || '',
    instructions: product?.instructions || '',
    faqs: product?.faqs || [{ question: '', answer: '' }],
    shippingReturns: product?.shippingReturns || '',
    images: product?.images || [],
    videoUrl: product?.videoUrl || '',
    basePrice: product?.basePrice || 0,
    comparePrice: product?.comparePrice || 0,
    subscriptionPricing: product?.subscriptionPricing || { oneMonth: 0, twoMonth: 0, threeMonth: 0 },
    dosageOptions: product?.dosageOptions || [{ id: 1, label: '', pricePerMonth: 0, isDefault: true }],
    relatedProductIds: product?.relatedProductIds || [],
    prescriptionRequired: product?.prescriptionRequired || false,
    fulfillmentType: product?.fulfillmentType || 'Pharmacy-Shipped',
    fdaWarning: product?.fdaWarning || false,
    prescriptionNotes: product?.prescriptionNotes || '',
    ageRestriction: product?.ageRestriction || 0,
  });

  const [currentTag, setCurrentTag] = useState('');
  const [openSections, setOpenSections] = useState({
    general: true,
    content: false,
    pricing: false,
    media: false,
    advanced: false
  });

  const updateField = (field: keyof ProductData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      updateField('tags', [...formData.tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    updateField('tags', formData.tags.filter(t => t !== tag));
  };

  const addFAQ = () => {
    updateField('faqs', [...formData.faqs, { question: '', answer: '' }]);
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    updateField('faqs', updatedFaqs);
  };

  const removeFAQ = (index: number) => {
    updateField('faqs', formData.faqs.filter((_, i) => i !== index));
  };

  const addDosageOption = () => {
    const newOption = {
      id: Date.now(),
      label: '',
      pricePerMonth: 0,
      isDefault: false
    };
    updateField('dosageOptions', [...formData.dosageOptions, newOption]);
  };

  const updateDosageOption = (index: number, field: keyof DosageOption, value: string | number | boolean) => {
    const updatedOptions = [...formData.dosageOptions];
    if (field === 'isDefault' && value) {
      // Only one can be default
      updatedOptions.forEach((opt, i) => {
        opt.isDefault = i === index;
      });
    } else {
      (updatedOptions[index] as any)[field] = value;
    }
    updateField('dosageOptions', updatedOptions);
  };

  const removeDosageOption = (index: number) => {
    updateField('dosageOptions', formData.dosageOptions.filter((_, i) => i !== index));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        alt: ''
      }));
      updateField('images', [...formData.images, ...newImages]);
    }
  };

  const updateImageAlt = (index: number, alt: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index].alt = alt;
    updateField('images', updatedImages);
  };

  const removeImage = (index: number) => {
    updateField('images', formData.images.filter((_, i) => i !== index));
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
            {product ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-muted-foreground">
            Create and manage products for the platform
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
            Publish Product
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="space-y-6">
        {/* General Info */}
        <Collapsible open={openSections.general} onOpenChange={() => toggleSection('general')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">General Information</CardTitle>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", openSections.general && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background"
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                    >
                      <option value="">Select category</option>
                      {propCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Optional)</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => updateField('sku', e.target.value)}
                      placeholder="Product SKU"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={formData.status === 'Active'}
                        onCheckedChange={(checked) => updateField('status', checked ? 'Active' : 'Inactive')}
                      />
                      <span className="text-sm">{formData.status}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <Label>Product Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Content Sections */}
        <Collapsible open={openSections.content} onOpenChange={() => toggleSection('content')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Content & Description</CardTitle>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", openSections.content && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Product Description</Label>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={formData.description}
                    onChange={(value) => updateField('description', value)}
                    placeholder="Detailed product description..."
                  />
                </div>

                <div className="space-y-3">
                  <Label>Benefits</Label>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={formData.benefits}
                    onChange={(value) => updateField('benefits', value)}
                    placeholder="Product benefits and advantages..."
                  />
                </div>

                <div className="space-y-3">
                  <Label>Side Effects</Label>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={formData.sideEffects}
                    onChange={(value) => updateField('sideEffects', value)}
                    placeholder="Known side effects and warnings..."
                  />
                </div>

                <div className="space-y-3">
                  <Label>Ingredients / Composition</Label>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={formData.ingredients}
                    onChange={(value) => updateField('ingredients', value)}
                    placeholder="Active and inactive ingredients..."
                  />
                </div>

                <div className="space-y-3">
                  <Label>How to Use / Instructions</Label>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={formData.instructions}
                    onChange={(value) => updateField('instructions', value)}
                    placeholder="Usage instructions, frequency, timing..."
                  />
                </div>

                {/* FAQs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Frequently Asked Questions</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add FAQ
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {formData.faqs.map((faq, index) => (
                      <Card key={index} className="border border-border">
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">FAQ #{index + 1}</span>
                            {formData.faqs.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFAQ(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <Input
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                          />
                          <ReactQuill
                            theme="snow"
                            modules={quillModules}
                            value={faq.answer}
                            onChange={(value) => updateFAQ(index, 'answer', value)}
                            placeholder="Answer..."
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Shipping & Returns Policy</Label>
                  <ReactQuill
                    theme="snow"
                    modules={quillModules}
                    value={formData.shippingReturns}
                    onChange={(value) => updateField('shippingReturns', value)}
                    placeholder="Shipping timeframe and return policies..."
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Media & Visuals */}
        <Collapsible open={openSections.media} onOpenChange={() => toggleSection('media')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Media & Visuals</CardTitle>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", openSections.media && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {/* Product Images */}
                <div className="space-y-3">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground mb-2">Drag & drop images or click to upload</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button type="button" variant="outline" className="cursor-pointer">
                        Select Images
                      </Button>
                    </label>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="relative aspect-square">
                            <img
                              src={image.url}
                              alt={image.alt || `Product ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            <div className="absolute top-2 left-2">
                              <GripVertical className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <CardContent className="p-2">
                            <Input
                              placeholder="Alt text (optional)"
                              value={image.alt}
                              onChange={(e) => updateImageAlt(index, e.target.value)}
                              className="text-xs"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Video */}
                <div className="space-y-2">
                  <Label htmlFor="video">Product Video URL (Optional)</Label>
                  <Input
                    id="video"
                    value={formData.videoUrl}
                    onChange={(e) => updateField('videoUrl', e.target.value)}
                    placeholder="YouTube or Vimeo URL"
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Pricing & Subscription */}
        <Collapsible open={openSections.pricing} onOpenChange={() => toggleSection('pricing')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Pricing & Subscription</CardTitle>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", openSections.pricing && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {/* Base Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-price">Base Price *</Label>
                    <Input
                      id="base-price"
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => updateField('basePrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compare-price">Compare at Price (Optional)</Label>
                    <Input
                      id="compare-price"
                      type="number"
                      value={formData.comparePrice}
                      onChange={(e) => updateField('comparePrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Subscription Pricing */}
                <div className="space-y-3">
                  <Label>Subscription Pricing</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="one-month">1 Month</Label>
                      <Input
                        id="one-month"
                        type="number"
                        value={formData.subscriptionPricing.oneMonth}
                        onChange={(e) => updateField('subscriptionPricing', {
                          ...formData.subscriptionPricing,
                          oneMonth: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="two-month">2 Months</Label>
                      <Input
                        id="two-month"
                        type="number"
                        value={formData.subscriptionPricing.twoMonth}
                        onChange={(e) => updateField('subscriptionPricing', {
                          ...formData.subscriptionPricing,
                          twoMonth: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="three-month">3 Months</Label>
                      <Input
                        id="three-month"
                        type="number"
                        value={formData.subscriptionPricing.threeMonth}
                        onChange={(e) => updateField('subscriptionPricing', {
                          ...formData.subscriptionPricing,
                          threeMonth: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                </div>

                {/* Dosage Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Dosage Options</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addDosageOption}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Dosage
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {formData.dosageOptions.map((option, index) => (
                      <Card key={option.id} className="border border-border">
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2">
                              <Label>Dosage Name</Label>
                              <Input
                                placeholder="e.g., 0.25mg"
                                value={option.label}
                                onChange={(e) => updateDosageOption(index, 'label', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Price per Month</Label>
                              <Input
                                type="number"
                                placeholder="0.00"
                                value={option.pricePerMonth}
                                onChange={(e) => updateDosageOption(index, 'pricePerMonth', parseFloat(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Default Option</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={option.isDefault}
                                  onCheckedChange={(checked) => updateDosageOption(index, 'isDefault', checked)}
                                />
                                <span className="text-xs">Default</span>
                              </div>
                            </div>
                            <div>
                              {formData.dosageOptions.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeDosageOption(index)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Related Products */}
                <div className="space-y-2">
                  <Label>Related Products</Label>
                  <select
                    multiple
                    className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background min-h-[100px]"
                    value={formData.relatedProductIds.map(String)}
                    onChange={(e) => {
                      const selectedIds = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
                      updateField('relatedProductIds', selectedIds);
                    }}
                  >
                    {allProducts.filter(p => p.id !== product?.id).map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">Hold Ctrl/Cmd to select multiple products</p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Advanced Settings */}
        <Collapsible open={openSections.advanced} onOpenChange={() => toggleSection('advanced')}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Advanced Settings</CardTitle>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", openSections.advanced && "rotate-180")} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Prescription Required</Label>
                      <Switch
                        checked={formData.prescriptionRequired}
                        onCheckedChange={(checked) => updateField('prescriptionRequired', checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fulfillment">Fulfillment Type</Label>
                      <select
                        id="fulfillment"
                        className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background"
                        value={formData.fulfillmentType}
                        onChange={(e) => updateField('fulfillmentType', e.target.value)}
                      >
                        {fulfillmentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>FDA Warning Notice</Label>
                      <Switch
                        checked={formData.fdaWarning}
                        onCheckedChange={(checked) => updateField('fdaWarning', checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age-restriction">Age Restriction</Label>
                      <Input
                        id="age-restriction"
                        type="number"
                        value={formData.ageRestriction}
                        onChange={(e) => updateField('ageRestriction', parseInt(e.target.value) || 0)}
                        placeholder="18"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Prescription Info / Notes</Label>
                    <ReactQuill
                      theme="snow"
                      modules={quillModules}
                      value={formData.prescriptionNotes}
                      onChange={(value) => updateField('prescriptionNotes', value)}
                      placeholder="Additional prescription requirements or notes..."
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
};