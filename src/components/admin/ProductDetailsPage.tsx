import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  Eye, 
  ShieldCheck, 
  AlertTriangle,
  Calendar,
  Users,
  ChevronDown,
  ExternalLink,
  Play
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

interface Product {
  id: number;
  name: string;
  category: string;
  tags?: string[];
  sku?: string;
  status: 'Active' | 'Inactive';
  description: string;
  benefits: string[];
  sideEffects: string[];
  ingredients?: string;
  instructions?: string;
  faqs?: { question: string; answer: string; }[];
  shippingReturns?: string;
  images: string[];
  videoUrl?: string;
  basePrice?: number;
  comparePrice?: number;
  subscriptionPricing: SubscriptionPricing;
  dosageOptions: DosageOption[];
  relatedProductId?: number;
  merchantsUsing: number;
  lastUpdated: string;
}

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onEdit: (product: Product) => void;
  allProducts: Product[];
}

const formatContent = (content: string | string[]) => {
  if (Array.isArray(content)) {
    return content;
  }
  if (typeof content === 'string' && content.includes('<')) {
    // If it contains HTML tags, render as HTML
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return content;
};

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ 
  product, 
  onBack, 
  onEdit, 
  allProducts 
}) => {
  const [openSections, setOpenSections] = useState({
    description: true,
    benefits: true,
    sideEffects: true,
    ingredients: false,
    instructions: false,
    faqs: false,
    shipping: false
  });

  const relatedProduct = product.relatedProductId 
    ? allProducts.find(p => p.id === product.relatedProductId)
    : null;

  const relatedProducts = allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview as Patient
          </Button>
          <Button onClick={() => onEdit(product)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="relative bg-muted/30">
              {product.images.length > 0 ? (
                <div className="aspect-square flex items-center justify-center p-8">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center">
                  <Package className="w-24 h-24 text-muted-foreground" />
                </div>
              )}
              
              {/* Image Gallery */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="flex-shrink-0">
                        <img 
                          src={image} 
                          alt={`${product.name} ${index + 2}`}
                          className="w-16 h-16 object-cover rounded border-2 border-background cursor-pointer hover:border-primary"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Prescription Required
                    </Badge>
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{product.merchantsUsing}</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center">
                      <Users className="w-3 h-3 mr-1" />
                      Merchants Using
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">${product.subscriptionPricing.oneMonth}</div>
                    <div className="text-sm text-muted-foreground">Starting Price</div>
                  </div>
                </div>

                {/* Video Preview */}
                {product.videoUrl && (
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full">
                        <Play className="w-6 h-6 mr-2" />
                        Watch Product Video
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Product Description */}
          <Collapsible open={openSections.description} onOpenChange={() => toggleSection('description')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle>Product Description</CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.description ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="prose max-w-none">
                    {formatContent(product.description)}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Benefits */}
          <Collapsible open={openSections.benefits} onOpenChange={() => toggleSection('benefits')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-700">Benefits</CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.benefits ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="prose max-w-none">
                    {Array.isArray(product.benefits) ? (
                      <ul className="space-y-2">
                        {product.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      formatContent(product.benefits)
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Side Effects */}
          <Collapsible open={openSections.sideEffects} onOpenChange={() => toggleSection('sideEffects')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-red-700 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Side Effects
                    </CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.sideEffects ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="prose max-w-none">
                    {Array.isArray(product.sideEffects) ? (
                      <ul className="space-y-2">
                        {product.sideEffects.map((effect, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      formatContent(product.sideEffects)
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Ingredients */}
          {product.ingredients && (
            <Collapsible open={openSections.ingredients} onOpenChange={() => toggleSection('ingredients')}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle>Ingredients & Composition</CardTitle>
                      <ChevronDown className={`w-5 h-5 transition-transform ${openSections.ingredients ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="prose max-w-none">
                      {formatContent(product.ingredients)}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {/* Instructions */}
          {product.instructions && (
            <Collapsible open={openSections.instructions} onOpenChange={() => toggleSection('instructions')}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle>How to Use / Instructions</CardTitle>
                      <ChevronDown className={`w-5 h-5 transition-transform ${openSections.instructions ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="prose max-w-none">
                      {formatContent(product.instructions)}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {/* FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <Collapsible open={openSections.faqs} onOpenChange={() => toggleSection('faqs')}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <ChevronDown className={`w-5 h-5 transition-transform ${openSections.faqs ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    {product.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                        <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                          {formatContent(faq.answer)}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}

          {/* Shipping & Returns */}
          {product.shippingReturns && (
            <Collapsible open={openSections.shipping} onOpenChange={() => toggleSection('shipping')}>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle>Shipping & Returns</CardTitle>
                      <ChevronDown className={`w-5 h-5 transition-transform ${openSections.shipping ? 'rotate-180' : ''}`} />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="prose max-w-none">
                      {formatContent(product.shippingReturns)}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing & Dosage */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Dosage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subscription Pricing */}
              <div>
                <h4 className="font-medium mb-3">Subscription Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium">1 Month</div>
                      <div className="text-sm text-muted-foreground">Monthly delivery</div>
                    </div>
                    <div className="text-xl font-bold">${product.subscriptionPricing.oneMonth}</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-primary rounded-lg bg-primary/5">
                    <div>
                      <div className="font-medium">2 Months</div>
                      <div className="text-sm text-muted-foreground">Every 2 months</div>
                    </div>
                    <div className="text-xl font-bold">${product.subscriptionPricing.twoMonth}</div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="font-medium">3 Months</div>
                      <div className="text-sm text-muted-foreground">Quarterly delivery</div>
                    </div>
                    <div className="text-xl font-bold">${product.subscriptionPricing.threeMonth}</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Dosage Options */}
              <div>
                <h4 className="font-medium mb-3">Available Dosages</h4>
                <div className="space-y-2">
                  {product.dosageOptions.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{option.label}</span>
                        {option.isDefault && (
                          <Badge variant="secondary" className="text-xs">Default</Badge>
                        )}
                      </div>
                      <span className="font-medium">${option.pricePerMonth}/mo</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {relatedProduct.images.length > 0 ? (
                        <img 
                          src={relatedProduct.images[0]} 
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{relatedProduct.name}</h4>
                      <p className="text-xs text-muted-foreground">{relatedProduct.category}</p>
                      <p className="text-xs font-medium">${relatedProduct.subscriptionPricing.oneMonth}/mo</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Compliance Info */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Prescription Required</span>
                <Badge variant="outline" className="text-xs">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Yes
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Fulfillment Type</span>
                <Badge variant="outline" className="text-xs">Pharmacy-Shipped</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Age Restriction</span>
                <Badge variant="outline" className="text-xs">18+</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {product.lastUpdated}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};