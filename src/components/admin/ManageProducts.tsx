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
import { Plus, Search, Edit, Package, Eye, Upload, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductDetails } from './ProductDetails';
import { ProductForm } from './ProductForm';

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

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Semaglutide",
    category: "Weight Loss",
    description: "A GLP-1 receptor agonist for weight management and diabetes control. This medication helps regulate blood sugar levels and promotes significant weight loss through appetite suppression and improved insulin sensitivity.",
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
    merchantsUsing: 15,
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "Tirzepatide",
    category: "Weight Loss",
    description: "Dual GIP/GLP-1 receptor agonist for enhanced weight loss results. This advanced medication combines two hormone pathways for superior glucose control and weight management.",
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
    merchantsUsing: 8,
    lastUpdated: "2024-01-12"
  },
  {
    id: 3,
    name: "NAD+ Therapy",
    category: "Anti-Aging",
    description: "Cellular regeneration therapy for anti-aging and energy enhancement. NAD+ supports cellular repair processes and helps restore energy production at the mitochondrial level.",
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
    merchantsUsing: 3,
    lastUpdated: "2024-01-10"
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
  const [showProductForm, setShowProductForm] = useState(false);

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
      merchantsUsing: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
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
        ? { 
            ...product, 
            status: product.status === 'Active' ? 'Inactive' : 'Active',
            lastUpdated: new Date().toISOString().split('T')[0]
          }
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

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map(file => URL.createObjectURL(file));
      setNewProduct({
        ...newProduct,
        images: [...newProduct.images, ...imageUrls]
      });
    }
  };

  const removeImage = (index: number) => {
    setNewProduct({
      ...newProduct,
      images: newProduct.images.filter((_, i) => i !== index)
    });
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
    setActiveTab('details');
  };

  const handleBackToList = () => {
    setViewingProduct(null);
    setActiveTab('list');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    const updatedProduct: Product = {
      ...editingProduct,
      ...newProduct,
      dosageOptions: newProduct.dosageOptions.map((option, index) => ({
        ...option,
        id: editingProduct.dosageOptions[index]?.id || Date.now() + index
      })),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    resetNewProduct();
    setIsAddModalOpen(false);
  };

  const handleProductFormSave = (productData: any, isDraft = false) => {
    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        ...productData,
        lastUpdated: new Date().toISOString().split('T')[0],
        // Transform the data to match existing structure
        benefits: Array.isArray(productData.benefits) ? productData.benefits : [productData.benefits],
        sideEffects: Array.isArray(productData.sideEffects) ? productData.sideEffects : [productData.sideEffects],
        images: productData.images.map((img: any) => typeof img === 'string' ? img : img.url),
        relatedProductId: productData.relatedProductIds?.[0]
      };
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    } else {
      // Add new product
      const newProductData: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...productData,
        benefits: Array.isArray(productData.benefits) ? productData.benefits : [productData.benefits],
        sideEffects: Array.isArray(productData.sideEffects) ? productData.sideEffects : [productData.sideEffects],
        images: productData.images.map((img: any) => typeof img === 'string' ? img : img.url),
        relatedProductId: productData.relatedProductIds?.[0],
        merchantsUsing: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProductData]);
    }
    
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleProductFormCancel = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  if (showProductForm) {
    // Transform product data for the form
    const productForForm = editingProduct ? {
      ...editingProduct,
      tags: [],
      sku: '',
      benefits: typeof editingProduct.benefits === 'string' ? editingProduct.benefits : editingProduct.benefits.join('\n'),
      sideEffects: typeof editingProduct.sideEffects === 'string' ? editingProduct.sideEffects : editingProduct.sideEffects.join('\n'),
      ingredients: '',
      instructions: '',
      faqs: [],
      shippingReturns: '',
      images: editingProduct.images.map(img => ({ url: img, alt: '' })),
      videoUrl: '',
      basePrice: editingProduct.dosageOptions[0]?.pricePerMonth || 0,
      comparePrice: 0,
      relatedProductIds: editingProduct.relatedProductId ? [editingProduct.relatedProductId] : [],
      prescriptionRequired: false,
      fulfillmentType: 'Pharmacy-Shipped',
      fdaWarning: false,
      prescriptionNotes: '',
      ageRestriction: 0
    } : undefined;

    return (
      <ProductForm
        product={productForForm}
        categories={categories}
        allProducts={products}
        onSave={handleProductFormSave}
        onCancel={handleProductFormCancel}
      />
    );
  }

  if (activeTab === 'details' && viewingProduct) {
    return (
      <ProductDetails
        product={viewingProduct}
        onBack={handleBackToList}
        onEdit={handleEditProduct}
        allProducts={products}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Platform-wide product catalog for merchant storefronts</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowProductForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

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
                <TableHead>Last Updated</TableHead>
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
                  <TableCell className="text-sm text-gray-500">
                    {product.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
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
    </div>
  );
};
