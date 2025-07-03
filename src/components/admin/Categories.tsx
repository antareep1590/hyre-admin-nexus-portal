import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Search, Filter, Upload, Image, Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Category {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  imageUrl?: string;
  dateCreated: string;
  isPopular?: boolean;
}

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Weight Loss',
      description: 'Medications and supplements for weight management',
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
      dateCreated: '2024-01-15',
    },
    {
      id: 2,
      name: 'Hormone Therapy',
      description: 'Hormone replacement and optimization treatments',
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      dateCreated: '2024-01-20',
    },
    {
      id: 3,
      name: 'Skincare',
      description: 'Dermatological treatments and skincare products',
      status: 'Active',
      imageUrl: 'https://images.unsplash.com/photo-1556228578-626c31d6e306?w=100&h=100&fit=crop&crop=center',
      dateCreated: '2024-02-01',
    },
    {
      id: 4,
      name: 'Hair Growth',
      description: 'Treatments for hair loss and growth stimulation',
      status: 'Inactive',
      imageUrl: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=100&h=100&fit=crop&crop=center',
      dateCreated: '2024-02-10',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    status: 'Active' as 'Active' | 'Inactive',
    imageUrl: '',
    isPopular: false,
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddCategory = () => {
    const category: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      ...newCategory,
      dateCreated: new Date().toISOString().split('T')[0],
    };
    setCategories([...categories, category]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      status: category.status,
      imageUrl: category.imageUrl || '',
      isPopular: category.isPopular || false,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingCategory) return;
    const updatedCategory: Category = {
      ...editingCategory,
      ...newCategory,
    };
    setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));
    setEditingCategory(null);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const resetForm = () => {
    setNewCategory({
      name: '',
      description: '',
      status: 'Active',
      imageUrl: '',
      isPopular: false,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // For demo purposes, we'll use a placeholder URL
      const imageUrl = URL.createObjectURL(file);
      setNewCategory(prev => ({ ...prev, imageUrl }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Manage product categories for merchant platforms</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="Enter category name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Enter category description"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image">Category Image</Label>
                <div className="mt-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                    </Button>
                    {newCategory.imageUrl && (
                      <div className="w-16 h-16 rounded-lg border overflow-hidden">
                        <img
                          src={newCategory.imageUrl}
                          alt="Category preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {!newCategory.imageUrl && (
                    <div className="w-16 h-16 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                      <Image className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newCategory.status === 'Active'}
                  onCheckedChange={(checked) => 
                    setNewCategory({...newCategory, status: checked ? 'Active' : 'Inactive'})
                  }
                />
                <Label htmlFor="status">Active Status</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={newCategory.isPopular}
                  onCheckedChange={(checked) => 
                    setNewCategory({...newCategory, isPopular: checked})
                  }
                />
                <Label htmlFor="popular">Mark as Popular Category</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingCategory(null);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button onClick={editingCategory ? handleSaveEdit : handleAddCategory}>
                  {editingCategory ? 'Save Changes' : 'Add Category'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Categories</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Category Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Image</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                     <td className="py-3 px-4">
                       <div className="flex items-center space-x-2">
                         <span className="font-medium text-gray-900">{category.name}</span>
                         {category.isPopular && (
                           <div className="flex items-center space-x-1">
                             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                             <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Popular</span>
                           </div>
                         )}
                       </div>
                     </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{category.description}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={category.status === 'Active' ? 'default' : 'secondary'}
                        className={category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {category.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {category.imageUrl ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border">
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                          <Image className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{new Date(category.dateCreated).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};