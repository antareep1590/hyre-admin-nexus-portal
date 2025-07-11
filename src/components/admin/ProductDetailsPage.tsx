import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  Eye, 
  ShieldCheck, 
  AlertTriangle,
  Calendar,
  Users,
  ExternalLink,
  Play
} from 'lucide-react';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const relatedProduct = product.relatedProductId 
    ? allProducts.find(p => p.id === product.relatedProductId)
    : null;

  const relatedProducts = allProducts.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

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

      {/* Product Header Info */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Badge variant="outline">{product.category}</Badge>
          <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
            {product.status}
          </Badge>
          {product.prescriptionRequired && (
            <Badge variant="outline" className="text-xs">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Prescription Required
            </Badge>
          )}
        </div>
        <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
        <p className="text-muted-foreground">Product ID: {product.id} • SKU: {product.sku || 'Not set'}</p>
        
        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Business Types */}
        {product.businessTypes && product.businessTypes.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1">
            {product.businessTypes.map((type, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Media Banner */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px]">
            {/* Main Image Display */}
            <div className="relative bg-muted/30">
              {product.images && product.images.length > 0 ? (
                <div className="relative h-full min-h-[400px]">
                  <img 
                    src={typeof product.images[selectedImageIndex] === 'string' 
                      ? product.images[selectedImageIndex] as string
                      : (product.images[selectedImageIndex] as { url: string; alt: string }).url
                    } 
                    alt={`${product.name} ${selectedImageIndex + 1}`}
                    className="w-full h-full object-contain p-8"
                  />
                  
                  {/* Image Navigation */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2 overflow-x-auto justify-center">
                        {product.images.slice(0, 6).map((image, index) => (
                          <div 
                            key={index}
                            className={`flex-shrink-0 cursor-pointer transition-all ${
                              selectedImageIndex === index ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-muted-foreground'
                            }`}
                            onClick={() => setSelectedImageIndex(index)}
                          >
                            <img 
                              src={typeof image === 'string' ? image : (image as { url: string; alt: string }).url}
                              alt={`${product.name} thumbnail ${index + 1}`}
                              className="w-16 h-16 object-cover rounded border-2 border-background"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex items-center justify-center">
                  <Package className="w-24 h-24 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Video Section */}
            <div className="relative bg-muted/10">
              {product.videoUrl ? (
                <div className="h-full min-h-[400px]">
                  {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={product.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                      title={`${product.name} video`}
                    />
                  ) : (
                    <video controls className="w-full h-full object-cover">
                      <source src={product.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No product video available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">${product.basePrice || product.subscriptionPricing.oneMonth}</div>
              <div className="text-sm text-muted-foreground">Starting Price</div>
            </div>
            {product.comparePrice && (
              <div>
                <div className="text-2xl font-bold text-muted-foreground line-through">${product.comparePrice}</div>
                <div className="text-sm text-muted-foreground">Compare Price</div>
              </div>
            )}
            <div>
              <div className="text-2xl font-bold text-foreground">{product.dosageOptions.length}</div>
              <div className="text-sm text-muted-foreground">Dosage Options</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{product.merchantsUsing}</div>
              <div className="text-sm text-muted-foreground">Active Merchants</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Content Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Description */}
          {product.description && (
            <Card>
              <CardHeader>
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  {formatContent(product.description)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {product.benefits && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  {formatContent(product.benefits)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Side Effects */}
          {product.sideEffects && (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Side Effects & Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  {formatContent(product.sideEffects)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <Card>
              <CardHeader>
                <CardTitle>Ingredients & Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  {formatContent(product.ingredients)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* How to Use / Instructions */}
          {product.instructions && (
            <Card>
              <CardHeader>
                <CardTitle>How to Use / Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  {formatContent(product.instructions)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Frequently Asked Questions */}
          {product.faqs && product.faqs.length > 0 && product.faqs.some(faq => faq.question) && (
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {product.faqs.map((faq, index) => (
                  faq.question && (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <h5 className="font-semibold text-foreground mb-2">{faq.question}</h5>
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        {formatContent(faq.answer)}
                      </div>
                    </div>
                  )
                ))}
              </CardContent>
            </Card>
          )}

          {/* Shipping & Returns Policy */}
          {product.shippingReturns && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping & Returns Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none text-muted-foreground">
                  {formatContent(product.shippingReturns)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Pricing & Subscription */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">1 Month</div>
                    <div className="text-sm text-muted-foreground">Monthly delivery</div>
                  </div>
                  <div className="text-xl font-bold text-primary">${product.subscriptionPricing.oneMonth}</div>
                </div>
                <div className="flex items-center justify-between p-3 border-2 border-primary rounded-lg bg-primary/5">
                  <div>
                    <div className="font-medium">2 Months</div>
                    <div className="text-sm text-muted-foreground">Every 2 months</div>
                  </div>
                  <div className="text-xl font-bold text-primary">${product.subscriptionPricing.twoMonth}</div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">3 Months</div>
                    <div className="text-sm text-muted-foreground">Quarterly delivery</div>
                  </div>
                  <div className="text-xl font-bold text-primary">${product.subscriptionPricing.threeMonth}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dosage Options */}
          <Card>
            <CardHeader>
              <CardTitle>Available Dosages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {product.dosageOptions.map((option, index) => (
                  <div key={option.id || index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{option.label}</span>
                      {option.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <span className="font-medium text-primary">${option.pricePerMonth}/mo</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
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
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm font-medium">FDA Warning</span>
                  <Badge variant={product.fdaWarning ? 'destructive' : 'secondary'}>
                    {product.fdaWarning ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
              
              {product.prescriptionNotes && (
                <div className="p-3 border rounded-lg bg-muted/30">
                  <div className="text-sm font-medium mb-2">Prescription Notes</div>
                  <div className="text-sm text-muted-foreground">{product.prescriptionNotes}</div>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {product.lastUpdated}
                  </div>
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
              <CardContent className="space-y-3">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <img 
                          src={typeof relatedProduct.images[0] === 'string' 
                            ? relatedProduct.images[0] as string
                            : (relatedProduct.images[0] as { url: string; alt: string }).url
                          }
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{relatedProduct.name}</h4>
                      <p className="text-xs text-muted-foreground">{relatedProduct.category}</p>
                      <p className="text-xs font-medium text-primary">${relatedProduct.subscriptionPricing.oneMonth}/mo</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};