
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, Plus, Search, Image } from 'lucide-react';
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

export const TemplateLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: 1,
      name: 'Weight Loss Pro',
      businessType: 'Weight Loss',
      description: 'Modern, conversion-focused design for weight loss clinics',
      isDefault: true,
      assignedMerchants: 12,
      lastModified: '2024-06-20',
      previewImage: '/api/placeholder/300/200',
    },
    {
      id: 2,
      name: 'Anti-Aging Elite',
      businessType: 'Anti-Aging',
      description: 'Luxury aesthetic for anti-aging and wellness centers',
      isDefault: false,
      assignedMerchants: 8,
      lastModified: '2024-06-18',
      previewImage: '/api/placeholder/300/200',
    },
    {
      id: 3,
      name: 'Peptide Science',
      businessType: 'Peptides',
      description: 'Clean, scientific layout for peptide therapy practices',
      isDefault: true,
      assignedMerchants: 5,
      lastModified: '2024-06-15',
      previewImage: '/api/placeholder/300/200',
    },
    {
      id: 4,
      name: 'FitLife Pro',
      businessType: 'Fitness',
      description: 'High-energy design for gyms and fitness centers',
      isDefault: false,
      assignedMerchants: 15,
      lastModified: '2024-06-12',
      previewImage: '/api/placeholder/300/200',
    },
  ];

  const businessTypes = ['Weight Loss', 'Anti-Aging', 'Peptides', 'Fitness', 'Mental Health'];

  const handlePreviewTemplate = (templateId: number) => {
    console.log('Previewing template:', templateId);
  };

  const handleAssignToBusinessType = (templateId: number, businessType: string) => {
    console.log('Assigning template to business type:', templateId, businessType);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Library</h1>
          <p className="text-gray-600">Manage landing page templates for different business types</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Template Name</label>
                <Input placeholder="Enter template name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Business Type</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Upload Design/Mockup</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Add Template</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Landing Page Templates</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <Image className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      {template.isDefault && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Business Type:</span>
                        <Badge variant="outline" className="text-xs">
                          {template.businessType}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Assigned to:</span>
                        <span>{template.assignedMerchants} merchants</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Modified:</span>
                        <span>{template.lastModified}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handlePreviewTemplate(template.id)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            Assign to Business Type
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Assign Template to Business Type</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-sm text-blue-800">
                                This will set "{template.name}" as the default template for the selected business type.
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700">Business Type</label>
                              <Select>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {businessTypes.map((type) => (
                                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">Cancel</Button>
                              <Button 
                                onClick={() => handleAssignToBusinessType(template.id, 'weight-loss')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Assign Template
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
