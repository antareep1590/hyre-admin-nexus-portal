
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileText, Search, Star, Send, Edit, Plus } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TemplateLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const templates = {
    intake: [
      {
        id: 1,
        name: 'General Health Intake',
        description: 'Standard health questionnaire for new patients',
        isDefault: true,
        usageCount: 45,
        lastModified: '2024-06-15',
        category: 'intake',
      },
      {
        id: 2,
        name: 'Mental Health Intake',
        description: 'Specialized intake form for mental health services',
        isDefault: false,
        usageCount: 23,
        lastModified: '2024-06-10',
        category: 'intake',
      },
    ],
    questionnaires: [
      {
        id: 3,
        name: 'Fitness Assessment',
        description: 'Comprehensive fitness and wellness questionnaire',
        isDefault: true,
        usageCount: 67,
        lastModified: '2024-06-18',
        category: 'questionnaires',
      },
      {
        id: 4,
        name: 'Nutrition Screening',
        description: 'Dietary habits and nutrition assessment',
        isDefault: false,
        usageCount: 34,
        lastModified: '2024-06-12',
        category: 'questionnaires',
      },
    ],
    landing: [
      {
        id: 5,
        name: 'Modern Clinic Layout',
        description: 'Clean, professional layout for medical practices',
        isDefault: true,
        usageCount: 89,
        lastModified: '2024-06-20',
        category: 'landing',
      },
      {
        id: 6,
        name: 'Fitness Center Layout',
        description: 'Dynamic, energetic design for gyms and fitness centers',
        isDefault: false,
        usageCount: 42,
        lastModified: '2024-06-14',
        category: 'landing',
      },
    ],
    notifications: [
      {
        id: 7,
        name: 'Appointment Confirmation',
        description: 'Email template for confirming appointments',
        isDefault: true,
        usageCount: 156,
        lastModified: '2024-06-19',
        category: 'notifications',
      },
      {
        id: 8,
        name: 'Reminder SMS',
        description: 'SMS template for appointment reminders',
        isDefault: false,
        usageCount: 98,
        lastModified: '2024-06-16',
        category: 'notifications',
      },
    ],
  };

  const handleSetDefault = (templateId: number, category: string) => {
    console.log('Setting as default:', templateId, category);
  };

  const handlePushToMerchant = (templateId: number) => {
    console.log('Pushing template to merchant:', templateId);
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Library</h1>
          <p className="text-gray-600">Manage platform-wide templates and push updates to merchants</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Template Name</label>
                <Input placeholder="Enter template name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intake">Intake Forms</SelectItem>
                    <SelectItem value="questionnaires">Questionnaires</SelectItem>
                    <SelectItem value="landing">Landing Pages</SelectItem>
                    <SelectItem value="notifications">Notifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Template Management</CardTitle>
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
          <Tabs defaultValue="intake" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="intake">Intake Forms</TabsTrigger>
              <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
              <TabsTrigger value="landing">Landing Pages</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            {Object.entries(templates).map(([category, categoryTemplates]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <h3 className="font-medium text-gray-900">{template.name}</h3>
                            {template.isDefault && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Star className="w-3 h-3 mr-1" />
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>Used by {template.usageCount} merchants</span>
                          <span>Modified {template.lastModified}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTemplate(template)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          
                          {!template.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefault(template.id, category)}
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Set Default
                            </Button>
                          )}
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Send className="w-3 h-3 mr-1" />
                                Push
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Push Template to Merchants</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                  <p className="text-sm text-blue-800">
                                    This will update the template for all merchants using "{template.name}".
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Target Merchants</label>
                                  <Select>
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Select merchants" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="all">All Merchants</SelectItem>
                                      <SelectItem value="active">Active Merchants Only</SelectItem>
                                      <SelectItem value="specific">Specific Merchants</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button 
                                    onClick={() => handlePushToMerchant(template.id)}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Push Template
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Template - {selectedTemplate.name}</DialogTitle>
            </DialogHeader>
            <div className="pt-4">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Template editor interface would be implemented here</p>
                <p className="text-sm text-gray-500 mt-2">Drag & drop form builder, HTML editor, or visual designer</p>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
