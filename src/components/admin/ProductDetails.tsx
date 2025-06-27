
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Package } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  description: string;
  benefits: string[];
  sideEffects: string[];
  images: string[];
  dosageOptions: DosageOption[];
  subscriptionPricing: SubscriptionPricing;
  relatedProductId?: number;
  status: 'Active' | 'Inactive';
  merchantsUsing: number;
  lastUpdated: string;
}

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onEdit: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  onBack, 
  onEdit, 
  allProducts 
}) => {
  const relatedProduct = product.relatedProductId 
    ? allProducts.find(p => p.id === product.relatedProductId)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="w-8 h-8 mr-3 text-gray-500" />
              {product.name}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">{product.category}</Badge>
              <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                {product.status}
              </Badge>
              <span className="text-gray-500 text-sm">
                Used by {product.merchantsUsing} merchants
              </span>
              <span className="text-gray-500 text-sm">
                Last updated: {product.lastUpdated}
              </span>
            </div>
          </div>
        </div>
        <Button onClick={() => onEdit(product)} className="bg-blue-600 hover:bg-blue-700">
          <Edit className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="dosage">Dosage & Pricing</TabsTrigger>
              <TabsTrigger value="subscription">Subscription Options</TabsTrigger>
              <TabsTrigger value="related">Related Products</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">Side Effects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.sideEffects.map((sideEffect, index) => (
                        <li key={index} className="text-gray-700">{sideEffect}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="dosage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Dosage Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {product.dosageOptions.map((option) => (
                      <div key={option.id} className="border rounded-lg p-4 text-center">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{option.label}</span>
                          {option.isDefault && (
                            <Badge variant="secondary" className="text-xs">Default</Badge>
                          )}
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          ${option.pricePerMonth}
                        </p>
                        <p className="text-gray-500 text-sm">per month</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Pricing Tiers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-6 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">1 Month</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${product.subscriptionPricing.oneMonth}
                      </div>
                      <p className="text-gray-500 text-sm">Monthly delivery</p>
                    </div>
                    <div className="text-center p-6 border rounded-lg bg-blue-50">
                      <h3 className="font-medium text-lg mb-2">2 Months</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${product.subscriptionPricing.twoMonth}
                      </div>
                      <p className="text-gray-500 text-sm">Every 2 months</p>
                      <Badge variant="secondary" className="mt-2">Popular</Badge>
                    </div>
                    <div className="text-center p-6 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">3 Months</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${product.subscriptionPricing.threeMonth}
                      </div>
                      <p className="text-gray-500 text-sm">Quarterly delivery</p>
                      <Badge variant="outline" className="mt-2">Best Value</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Related Products</CardTitle>
                </CardHeader>
                <CardContent>
                  {relatedProduct ? (
                    <div className="flex items-center p-4 border rounded-lg">
                      <Package className="w-8 h-8 text-gray-500 mr-3" />
                      <div className="flex-1">
                        <h4 className="font-medium">{relatedProduct.name}</h4>
                        <p className="text-gray-500 text-sm">{relatedProduct.category}</p>
                      </div>
                      <Badge variant={relatedProduct.status === 'Active' ? 'default' : 'secondary'}>
                        {relatedProduct.status}
                      </Badge>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No related products configured</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
