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
  businessTypes?: string[];
  tags?: string[];
  sku?: string;
  status: 'Active' | 'Inactive';
  description: string;
  benefits: string | string[];
  sideEffects: string | string[];
  ingredients?: string;
  instructions?: string;
  faqs?: { question: string; answer: string; }[];
  shippingReturns?: string;
  images: (string | { url: string; alt: string })[];
  videoUrl?: string;
  basePrice?: number;
  comparePrice?: number;
  subscriptionPricing: SubscriptionPricing;
  dosageOptions: DosageOption[];
  relatedProductId?: number;
  relatedProductIds?: number[];
  prescriptionRequired?: boolean;
  fulfillmentType?: string;
  fdaWarning?: boolean;
  prescriptionNotes?: string;
  ageRestriction?: number;
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
    general: true,
    content: true,
    media: true,
    pricing: true,
    compliance: false
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const relatedProduct = product.relatedProductId 
    ? allProducts.find(p => p.id === product.relatedProductId)
    : null;

  const relatedProducts = allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formatContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content;
    }
    if (typeof content === 'string' && content.includes('<')) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Media & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Product Images */}
          <Collapsible open={openSections.media} onOpenChange={() => toggleSection('media')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle>Media Gallery</CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.media ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {/* Main Image Display */}
                  <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={typeof product.images[selectedImageIndex] === 'string' 
                          ? product.images[selectedImageIndex] as string
                          : (product.images[selectedImageIndex] as { url: string; alt: string }).url
                        } 
                        alt={`${product.name} ${selectedImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  {product.images && product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.slice(0, 8).map((image, index) => (
                        <div 
                          key={index}
                          className={`aspect-square bg-muted/30 rounded cursor-pointer overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <img 
                            src={typeof image === 'string' ? image : (image as { url: string; alt: string }).url}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Video Section */}
                  {product.videoUrl && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Product Video</h4>
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                          <iframe
                            src={product.videoUrl.replace('watch?v=', 'embed/')}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                          />
                        ) : (
                          <video controls className="w-full h-full">
                            <source src={product.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">SKU</span>
                  <span className="text-sm font-medium">{product.sku || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Merchants Using</span>
                  <span className="text-sm font-medium">{product.merchantsUsing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-medium">{product.lastUpdated}</span>
                </div>
              </div>

              {/* Business Types */}
              {product.businessTypes && product.businessTypes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Business Types</span>
                  <div className="flex flex-wrap gap-1">
                    {product.businessTypes.map((type, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Detailed Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                  <p className="text-muted-foreground">
                    Product ID: {product.id} • {product.category}
                  </p>
                </div>
                
                {/* Pricing Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">${product.basePrice || product.subscriptionPricing.oneMonth}</div>
                    <div className="text-xs text-muted-foreground">Base Price</div>
                  </div>
                  {product.comparePrice && (
                    <div className="text-center">
                      <div className="text-xl font-bold text-muted-foreground line-through">${product.comparePrice}</div>
                      <div className="text-xs text-muted-foreground">Compare Price</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{product.dosageOptions.length}</div>
                    <div className="text-xs text-muted-foreground">Dosage Options</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{product.merchantsUsing}</div>
                    <div className="text-xs text-muted-foreground">Active Merchants</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <Collapsible open={openSections.content} onOpenChange={() => toggleSection('content')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle>Product Content & Details</CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.content ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {/* Description */}
                  {product.description && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Product Description</h4>
                      <div className="prose max-w-none text-muted-foreground">
                        {formatContent(product.description)}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {product.benefits && (
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Benefits
                      </h4>
                      <div className="prose max-w-none text-muted-foreground">
                        {formatContent(product.benefits)}
                      </div>
                    </div>
                  )}

                  {/* Side Effects */}
                  {product.sideEffects && (
                    <div>
                      <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Side Effects & Warnings
                      </h4>
                      <div className="prose max-w-none text-muted-foreground">
                        {formatContent(product.sideEffects)}
                      </div>
                    </div>
                  )}

                  {/* Ingredients */}
                  {product.ingredients && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Ingredients & Composition</h4>
                      <div className="prose max-w-none text-muted-foreground">
                        {formatContent(product.ingredients)}
                      </div>
                    </div>
                  )}

                  {/* Instructions */}
                  {product.instructions && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">How to Use / Instructions</h4>
                      <div className="prose max-w-none text-muted-foreground">
                        {formatContent(product.instructions)}
                      </div>
                    </div>
                  )}

                  {/* FAQs */}
                  {product.faqs && product.faqs.length > 0 && product.faqs[0].question && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Frequently Asked Questions</h4>
                      <div className="space-y-4">
                        {product.faqs.map((faq, index) => (
                          faq.question && (
                            <div key={index} className="border-l-4 border-primary pl-4">
                              <h5 className="font-medium text-foreground mb-1">{faq.question}</h5>
                              <div className="prose prose-sm max-w-none text-muted-foreground">
                                {formatContent(faq.answer)}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Shipping & Returns */}
                  {product.shippingReturns && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Shipping & Returns</h4>
                      <div className="prose max-w-none text-muted-foreground">
                        {formatContent(product.shippingReturns)}
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Pricing & Dosage Details */}
          <Collapsible open={openSections.pricing} onOpenChange={() => toggleSection('pricing')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle>Pricing & Dosage Options</CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.pricing ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {/* Subscription Pricing */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Subscription Plans</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">${product.subscriptionPricing.oneMonth}</div>
                        <div className="text-sm font-medium mb-1">1 Month Plan</div>
                        <div className="text-xs text-muted-foreground">Monthly delivery</div>
                      </div>
                      <div className="border-2 border-primary rounded-lg p-4 text-center bg-primary/5">
                        <div className="text-2xl font-bold text-primary mb-1">${product.subscriptionPricing.twoMonth}</div>
                        <div className="text-sm font-medium mb-1">2 Month Plan</div>
                        <div className="text-xs text-muted-foreground">Every 2 months</div>
                        <Badge variant="default" className="mt-2 text-xs">Popular</Badge>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">${product.subscriptionPricing.threeMonth}</div>
                        <div className="text-sm font-medium mb-1">3 Month Plan</div>
                        <div className="text-xs text-muted-foreground">Quarterly delivery</div>
                        <Badge variant="outline" className="mt-2 text-xs">Best Value</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Dosage Options */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Available Dosages</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.dosageOptions.map((option, index) => (
                        <div key={option.id || index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{option.label}</span>
                            {option.isDefault && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                          </div>
                          <div className="text-lg font-bold text-primary">${option.pricePerMonth}/month</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Compliance & Requirements */}
          <Collapsible open={openSections.compliance} onOpenChange={() => toggleSection('compliance')}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle>Compliance & Requirements</CardTitle>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSections.compliance ? 'rotate-180' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium">Prescription Required</span>
                        <Badge variant={product.prescriptionRequired ? 'default' : 'secondary'}>
                          {product.prescriptionRequired ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium">Fulfillment Type</span>
                        <Badge variant="outline">{product.fulfillmentType || 'Pharmacy-Shipped'}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium">Age Restriction</span>
                        <Badge variant="outline">{product.ageRestriction || 18}+</Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium">FDA Warning</span>
                        <Badge variant={product.fdaWarning ? 'destructive' : 'secondary'}>
                          {product.fdaWarning ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      {product.prescriptionNotes && (
                        <div className="p-3 border rounded-lg">
                          <div className="text-sm font-medium mb-2">Prescription Notes</div>
                          <div className="text-sm text-muted-foreground">{product.prescriptionNotes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        {relatedProduct.images && relatedProduct.images.length > 0 ? (
                          <img 
                            src={typeof relatedProduct.images[0] === 'string' 
                              ? relatedProduct.images[0] as string
                              : (relatedProduct.images[0] as { url: string; alt: string }).url
                            }
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
                </div>
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};