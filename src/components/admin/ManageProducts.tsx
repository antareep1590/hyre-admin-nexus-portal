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
import { Plus, Search, Edit, Package, Eye, Upload, X, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductDetailsPage } from './ProductDetailsPage';
import { ProductForm } from './ProductForm';
import { MerchantProductForm } from './MerchantProductForm';

interface DosageOption {
  id: number;
  label: string;
  pricePerMonth: number;
  priceTwoMonth: number;
  priceThreeMonth: number;
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
  businessTypes?: string[];
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
  dosageOptions: DosageOption[];
  subscriptionPricing: SubscriptionPricing;
  relatedProductId?: number;
  prescriptionRequired?: boolean;
  fulfillmentType?: string;
  fdaWarning?: boolean;
  prescriptionNotes?: string;
  ageRestriction?: number;
  status: 'Active' | 'Inactive';
  merchantsUsing: number;
  lastUpdated: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Semaglutide",
    category: "Weight Loss",
    tags: ["GLP-1", "Injectable", "Weekly"],
    sku: "SEM-001",
    businessTypes: ["Clinics", "Telehealth"],
    description: "A GLP-1 receptor agonist for weight management and diabetes control. This medication helps regulate blood sugar levels and promotes significant weight loss through appetite suppression and improved insulin sensitivity.",
    benefits: ["Significant weight loss", "Improved blood sugar control", "Reduced appetite", "Better cardiovascular health"],
    sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Constipation"],
    ingredients: "<p><strong>Active Ingredient:</strong> Semaglutide 0.25mg/0.5mL</p><p><strong>Inactive Ingredients:</strong> Disodium phosphate dihydrate, propylene glycol, phenol, water for injection</p>",
    instructions: "<p><strong>Administration:</strong> Inject subcutaneously once weekly, preferably on the same day each week.</p><p><strong>Injection Sites:</strong> Thigh, abdomen, or upper arm. Rotate injection sites weekly.</p><p><strong>Storage:</strong> Store in refrigerator at 36°F to 46°F (2°C to 8°C). Do not freeze.</p>",
    faqs: [
      {
        question: "How long before I see results?",
        answer: "Most patients begin to see weight loss within 4-6 weeks of starting treatment. Significant results are typically observed after 12-16 weeks."
      },
      {
        question: "Can I take this with other medications?",
        answer: "Please consult with your healthcare provider about all medications you're taking. Some medications may interact with Semaglutide."
      },
      {
        question: "What should I do if I miss a dose?",
        answer: "If you miss a dose and it's been less than 5 days, take it as soon as possible. If more than 5 days have passed, skip the missed dose and continue with your regular schedule."
      }
    ],
    shippingReturns: "<p><strong>Shipping:</strong> All medications are shipped via temperature-controlled overnight delivery to ensure product integrity.</p><p><strong>Returns:</strong> Due to the nature of prescription medications, returns are not accepted unless the product was damaged during shipping. Contact customer service within 24 hours of delivery for damaged products.</p>",
    images: ["/placeholder.svg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    basePrice: 299,
    comparePrice: 399,
    dosageOptions: [
      { id: 1, label: "0.25mg", pricePerMonth: 299, priceTwoMonth: 579, priceThreeMonth: 849, isDefault: true },
      { id: 2, label: "0.5mg", pricePerMonth: 399, priceTwoMonth: 779, priceThreeMonth: 1149, isDefault: false },
      { id: 3, label: "1.0mg", pricePerMonth: 499, priceTwoMonth: 979, priceThreeMonth: 1449, isDefault: false }
    ],
    subscriptionPricing: {
      oneMonth: 299,
      twoMonth: 579,
      threeMonth: 849
    },
    prescriptionRequired: true,
    fulfillmentType: "Pharmacy-Shipped",
    fdaWarning: false,
    prescriptionNotes: "Requires consultation with licensed healthcare provider. Not suitable for patients with personal or family history of medullary thyroid carcinoma.",
    ageRestriction: 18,
    status: "Active",
    merchantsUsing: 15,
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "Tirzepatide",
    category: "Weight Loss",
    tags: ["GIP/GLP-1", "Injectable", "Weekly"],
    sku: "TIR-001",
    businessTypes: ["Clinics", "Wellness Centers"],
    description: "Dual GIP/GLP-1 receptor agonist for enhanced weight loss results. This advanced medication combines two hormone pathways for superior glucose control and weight management.",
    benefits: ["Superior weight loss", "Excellent glucose control", "Improved insulin sensitivity"],
    sideEffects: ["Nausea", "Decreased appetite", "Vomiting", "Diarrhea"],
    ingredients: "<p><strong>Active Ingredient:</strong> Tirzepatide 2.5mg/0.5mL</p><p><strong>Inactive Ingredients:</strong> Sodium chloride, sodium phosphate dibasic heptahydrate, water for injection</p>",
    instructions: "<p><strong>Administration:</strong> Inject subcutaneously once weekly at any time of day, with or without food.</p><p><strong>Injection Sites:</strong> Thigh, abdomen, or upper arm. Rotate injection sites with each dose.</p><p><strong>Storage:</strong> Store in original carton in refrigerator. Protect from light.</p>",
    faqs: [
      {
        question: "How is Tirzepatide different from Semaglutide?",
        answer: "Tirzepatide targets both GIP and GLP-1 receptors, while Semaglutide only targets GLP-1. This dual action may result in more significant weight loss for some patients."
      },
      {
        question: "What are the most common side effects?",
        answer: "The most common side effects include nausea, vomiting, diarrhea, and decreased appetite. These typically improve over time as your body adjusts to the medication."
      }
    ],
    shippingReturns: "<p><strong>Shipping:</strong> Free overnight shipping with temperature monitoring. Signature required upon delivery.</p><p><strong>Returns:</strong> Returns accepted only for manufacturing defects or shipping damage. Must be reported within 24 hours of delivery.</p>",
    images: ["/placeholder.svg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    basePrice: 399,
    comparePrice: 499,
    dosageOptions: [
      { id: 4, label: "2.5mg", pricePerMonth: 399, priceTwoMonth: 779, priceThreeMonth: 1149, isDefault: true },
      { id: 5, label: "5.0mg", pricePerMonth: 499, priceTwoMonth: 979, priceThreeMonth: 1449, isDefault: false },
      { id: 6, label: "7.5mg", pricePerMonth: 599, priceTwoMonth: 1179, priceThreeMonth: 1749, isDefault: false }
    ],
    subscriptionPricing: {
      oneMonth: 399,
      twoMonth: 779,
      threeMonth: 1149
    },
    relatedProductId: 1,
    prescriptionRequired: true,
    fulfillmentType: "Pharmacy-Shipped",
    fdaWarning: false,
    prescriptionNotes: "Requires comprehensive medical evaluation. Monitor for signs of pancreatitis and gallbladder disease.",
    ageRestriction: 18,
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
      { id: 7, label: "250mg", pricePerMonth: 199, priceTwoMonth: 389, priceThreeMonth: 569, isDefault: true },
      { id: 8, label: "500mg", pricePerMonth: 299, priceTwoMonth: 579, priceThreeMonth: 849, isDefault: false }
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
  const [merchantPricingProduct, setMerchantPricingProduct] = useState<Product | null>(null);
  const [showMerchantPricing, setShowMerchantPricing] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    benefits: [''],
    sideEffects: [''],
    images: [] as string[],
    dosageOptions: [{ label: '', pricePerMonth: 0, priceTwoMonth: 0, priceThreeMonth: 0, isDefault: true }] as Omit<DosageOption, 'id'>[],
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
      dosageOptions: [{ label: '', pricePerMonth: 0, priceTwoMonth: 0, priceThreeMonth: 0, isDefault: true }],
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
      dosageOptions: [...newProduct.dosageOptions, { label: '', pricePerMonth: 0, priceTwoMonth: 0, priceThreeMonth: 0, isDefault: false }]
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

  const handleMerchantPricing = (product: Product) => {
    // Ensure required fields for MerchantProductForm
    const productWithRequiredFields = {
      ...product,
      basePrice: product.basePrice || product.dosageOptions[0]?.pricePerMonth || 0,
      comparePrice: product.comparePrice || (product.basePrice || product.dosageOptions[0]?.pricePerMonth || 0) * 1.2
    } as Product & { basePrice: number; comparePrice: number };
    setMerchantPricingProduct(productWithRequiredFields);
    setShowMerchantPricing(true);
  };

  const handleMerchantPricingSave = (productData: any, isDraft = false) => {
    console.log('Merchant pricing saved:', productData, isDraft);
    setShowMerchantPricing(false);
    setMerchantPricingProduct(null);
  };

  const handleMerchantPricingCancel = () => {
    setShowMerchantPricing(false);
    setMerchantPricingProduct(null);
  };

  if (showMerchantPricing && merchantPricingProduct) {
    // Transform Product to ProductData format for MerchantProductForm
    const productData = {
      id: merchantPricingProduct.id,
      name: merchantPricingProduct.name,
      category: merchantPricingProduct.category,
      basePrice: merchantPricingProduct.basePrice || merchantPricingProduct.dosageOptions[0]?.pricePerMonth || 0,
      comparePrice: merchantPricingProduct.comparePrice || (merchantPricingProduct.basePrice || merchantPricingProduct.dosageOptions[0]?.pricePerMonth || 0) * 1.2,
      dosageOptions: merchantPricingProduct.dosageOptions
    };

    return (
      <MerchantProductForm
        product={productData}
        onSave={handleMerchantPricingSave}
        onCancel={handleMerchantPricingCancel}
      />
    );
  }

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
      <ProductDetailsPage
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMerchantPricing(product)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <DollarSign className="w-4 h-4 mr-1" />
                        Merchant Pricing
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
