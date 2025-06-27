
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Edit, Package, Eye } from 'lucide-react';
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
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Semaglutide",
    category: "Weight Loss",
    description: "A GLP-1 receptor agonist for weight management and diabetes control.",
    benefits: ["Significant weight loss", "Improved blood sugar control", "Reduced appetite", "Better cardiovascular health"],
    sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Constipation"],
    images: ["/placeholder.svg"],
    dosageOptions: [
      { id: 1, label: "0.25mg", pricePerMonth: 299, isDefault: true },
      { id: 2, label: "0.5mg", pricePerMonth: 399, isDefault: false },
      { id: 3, label: "1.0mg", pricePerMonth: 499, isDefault: false }
    ],
    subscriptionPricing: {
      oneMonth: 299,
      twoMonth: 579,
      threeMonth: 849
    },
    status: "Active",
    merchantsUsing: 15
  },
  {
    id: 2,
    name: "Tirzepatide",
    category: "Weight Loss",
    description: "Dual GIP/GLP-1 receptor agonist for enhanced weight loss results.",
    benefits: ["Superior weight loss", "Excellent glucose control", "Improved insulin sensitivity"],
    sideEffects: ["Nausea", "Decreased appetite", "Vomiting", "Diarrhea"],
    images: ["/placeholder.svg"],
    dosageOptions: [
      { id: 4, label: "2.5mg", pricePerMonth: 399, isDefault: true },
      { id: 5, label: "5.0mg", pricePerMonth: 499, isDefault: false },
      { id: 6, label: "7.5mg", pricePerMonth: 599, isDefault: false }
    ],
    subscriptionPricing: {
      oneMonth: 399,
      twoMonth: 779,
      threeMonth: 1149
    },
    relatedProductId: 1,
    status: "Active",
    merchantsUsing: 8
  },
  {
    id: 3,
    name: "NAD+ Therapy",
    category: "Anti-Aging",
    description: "Cellular regeneration therapy for anti-aging and energy enhancement.",
    benefits: ["Increased energy", "Better sleep", "Improved cognitive function", "Cellular repair"],
    sideEffects: ["Mild fatigue initially", "Temporary headache", "Injection site reaction"],
    images: ["/placeholder.svg"],
    dosageOptions: [
      { id: 7, label: "250mg", pricePerMonth: 199, isDefault: true },
      { id: 8, label: "500mg", pricePerMonth: 299, isDefault: false }
    ],
    subscriptionPricing: {
      oneMonth: 199,
      twoMonth: 389,
      threeMonth: 569
    },
    status: "Inactive",
    merchantsUsing: 3
  }
];

const categories = ["Weight Loss", "Anti-Aging", "Peptides", "Fitness", "Wellness"];

export const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    benefits: [''],
    sideEffects: [''],
    images: [] as string[],
    dosageOptions: [{ label: '', pricePerMonth: 0, isDefault: true }] as Omit<DosageOption, 'id'>[],
    subscriptionPricing: { oneMonth: 0, twoMonth: 0, threeMonth: 0 },
    relatedProductId: undefined as number | undefined,
    status: 'Active' as 'Active' | 'Inactive'
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    const product: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      ...newProduct,
      dosageOptions: newProduct.dosageOptions.map((option, index) => ({
        ...option,
        id: Date.now() + index
      })),
      merchantsUsing: 0
    };
    setProducts([...products, product]);
    resetNewProduct();
    setIsAddModalOpen(false);
  };

  const resetNewProduct = () => {
    setNewProduct({
      name: '',
      category: '',
      description: '',
      benefits: [''],
      sideEffects: [''],
      images: [],
      dosageOptions: [{ label: '', pricePerMonth: 0, isDefault: true }],
      subscriptionPricing: { oneMonth: 0, twoMonth: 0, threeMonth: 0 },
      relatedProductId: undefined,
      status: 'Active'
    });
  };

  const toggleProductStatus = (id: number) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, status: product.status === 'Active' ? 'Inactive' : 'Active' }
        : product
    ));
  };

  const addBenefit = () => {
    setNewProduct({
      ...newProduct,
      benefits: [...newProduct.benefits, '']
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const updatedBenefits = [...newProduct.benefits];
    updatedBenefits[index] = value;
    setNewProduct({
      ...newProduct,
      benefits: updatedBenefits
    });
  };

  const removeBenefit = (index: number) => {
    setNewProduct({
      ...newProduct,
      benefits: newProduct.benefits.filter((_, i) => i !== index)
    });
  };

  const addSideEffect = () => {
    setNewProduct({
      ...newProduct,
      sideEffects: [...newProduct.sideEffects, '']
    });
  };

  const updateSideEffect = (index: number, value: string) => {
    const updatedSideEffects = [...newProduct.sideEffects];
    updatedSideEffects[index] = value;
    setNewProduct({
      ...newProduct,
      sideEffects: updatedSideEffects
    });
  };

  const removeSideEffect = (index: number) => {
    setNewProduct({
      ...newProduct,
      sideEffects: newProduct.sideEffects.filter((_, i) => i !== index)
    });
  };

  const addDosageOption = () => {
    setNewProduct({
      ...newProduct,
      dosageOptions: [...newProduct.dosageOptions, { label: '', pricePerMonth: 0, isDefault: false }]
    });
  };

  const updateDosageOption = (index: number, field: keyof Omit<DosageOption, 'id'>, value: any) => {
    const updatedOptions = [...newProduct.dosageOptions];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setNewProduct({
      ...newProduct,
      dosageOptions: updatedOptions
    });
  };

  const removeDosageOption = (index: number) => {
    setNewProduct({
      ...newProduct,
      dosageOptions: newProduct.dosageOptions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-1">Platform-wide product catalog for merchant storefronts</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList>
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="dosage">Dosage & Pricing</TabsTrigger>
                <TabsTrigger value="details">Benefits & Side Effects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input
                      id="product-name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Enter detailed product description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="related-product">Related Product (Optional)</Label>
                  <select
                    id="related-product"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newProduct.relatedProductId || ''}
                    onChange={(e) => setNewProduct({...newProduct, relatedProductId: e.target.value ? parseInt(e.target.value) : undefined})}
                  >
                    <option value="">No related product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
              </TabsContent>

              <TabsContent value="dosage" className="space-y-4">
                <div>
                  <Label>Dosage Options</Label>
                  {newProduct.dosageOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Input
                        placeholder="Dosage (e.g., 0.25mg)"
                        value={option.label}
                        onChange={(e) => updateDosageOption(index, 'label', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder="Price per month"
                        value={option.pricePerMonth}
                        onChange={(e) => updateDosageOption(index, 'pricePerMonth', parseFloat(e.target.value))}
                        className="w-32"
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="defaultDosage"
                          checked={option.isDefault}
                          onChange={() => {
                            const updatedOptions = newProduct.dosageOptions.map((opt, i) => ({
                              ...opt,
                              isDefault: i === index
                            }));
                            setNewProduct({...newProduct, dosageOptions: updatedOptions});
                          }}
                        />
                        <Label className="text-sm">Default</Label>
                      </div>
                      {newProduct.dosageOptions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeDosageOption(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addDosageOption}
                    className="mt-2"
                  >
                    Add Dosage Option
                  </Button>
                </div>
                
                <div>
                  <Label>Subscription Pricing</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="one-month">1 Month</Label>
                      <Input
                        id="one-month"
                        type="number"
                        value={newProduct.subscriptionPricing.oneMonth}
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          subscriptionPricing: {
                            ...newProduct.subscriptionPricing,
                            oneMonth: parseFloat(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="two-month">2 Month</Label>
                      <Input
                        id="two-month"
                        type="number"
                        value={newProduct.subscriptionPricing.twoMonth}
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          subscriptionPricing: {
                            ...newProduct.subscriptionPricing,
                            twoMonth: parseFloat(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="three-month">3 Month</Label>
                      <Input
                        id="three-month"
                        type="number"
                        value={newProduct.subscriptionPricing.threeMonth}
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          subscriptionPricing: {
                            ...newProduct.subscriptionPricing,
                            threeMonth: parseFloat(e.target.value)
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div>
                  <Label>Benefits</Label>
                  {newProduct.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Input
                        placeholder="Enter benefit"
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        className="flex-1"
                      />
                      {newProduct.benefits.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBenefit(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addBenefit}
                    className="mt-2"
                  >
                    Add Benefit
                  </Button>
                </div>

                <div>
                  <Label>Side Effects</Label>
                  {newProduct.sideEffects.map((sideEffect, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Input
                        placeholder="Enter side effect"
                        value={sideEffect}
                        onChange={(e) => updateSideEffect(index, e.target.value)}
                        className="flex-1"
                      />
                      {newProduct.sideEffects.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSideEffect(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSideEffect}
                    className="mt-2"
                  >
                    Add Side Effect
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="list">Product List</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Products</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Merchants Using</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-2 text-gray-500" />
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                          <Switch
                            checked={product.status === 'Active'}
                            onCheckedChange={() => toggleProductStatus(product.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{product.merchantsUsing}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setViewingProduct(product)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Product Detail View Modal */}
      {viewingProduct && (
        <Dialog open={!!viewingProduct} onOpenChange={() => setViewingProduct(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingProduct.name} - Product Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <p><strong>Category:</strong> {viewingProduct.category}</p>
                    <p><strong>Status:</strong> 
                      <Badge className="ml-2" variant={viewingProduct.status === 'Active' ? 'default' : 'secondary'}>
                        {viewingProduct.status}
                      </Badge>
                    </p>
                    <p><strong>Merchants Using:</strong> {viewingProduct.merchantsUsing}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Related Product</h3>
                  {viewingProduct.relatedProductId ? (
                    <p>{products.find(p => p.id === viewingProduct.relatedProductId)?.name || 'Unknown'}</p>
                  ) : (
                    <p className="text-gray-500">None</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{viewingProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {viewingProduct.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Side Effects</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {viewingProduct.sideEffects.map((sideEffect, index) => (
                      <li key={index} className="text-gray-700">{sideEffect}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Dosage Options</h3>
                <div className="grid grid-cols-3 gap-4">
                  {viewingProduct.dosageOptions.map((option) => (
                    <div key={option.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {option.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                      </div>
                      <p className="text-lg font-bold text-green-600">${option.pricePerMonth}/month</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Subscription Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <p className="font-medium">1 Month</p>
                    <p className="text-lg font-bold text-blue-600">${viewingProduct.subscriptionPricing.oneMonth}</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="font-medium">2 Months</p>
                    <p className="text-lg font-bold text-blue-600">${viewingProduct.subscriptionPricing.twoMonth}</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="font-medium">3 Months</p>
                    <p className="text-lg font-bold text-blue-600">${viewingProduct.subscriptionPricing.threeMonth}</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
