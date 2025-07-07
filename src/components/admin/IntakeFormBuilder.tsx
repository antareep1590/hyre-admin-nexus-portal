import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  GripVertical 
} from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';

interface FormField {
  id: number;
  label: string;
  type: 'text' | 'long-text' | 'dropdown' | 'checkbox' | 'number' | 'date' | 'file-upload';
  options?: string[];
  required: boolean;
  businessTypes: string[];
  assignmentType: 'General' | 'Business-Specific';
  placeholder?: string;
}

const businessTypes = ['Clinics', 'Gyms', 'Wellness Centers', 'Telehealth', 'Pharmacy'];
const fieldTypes = [
  { value: 'text', label: 'Text Input' },
  { value: 'long-text', label: 'Long Text (Textarea)' },
  { value: 'number', label: 'Number Input' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
  { value: 'file-upload', label: 'File Upload' },
];

export const IntakeFormBuilder: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: 1,
      label: "Current Weight (lbs)",
      type: 'number',
      required: true,
      businessTypes: ['Clinics', 'Telehealth'],
      assignmentType: 'General',
      placeholder: 'Enter weight in pounds',
    },
    {
      id: 2,
      label: "Height",
      type: 'text',
      required: true,
      businessTypes: ['Clinics', 'Telehealth'],
      assignmentType: 'General',
      placeholder: 'e.g., 5\'10"',
    },
    {
      id: 3,
      label: "Exercise Frequency",
      type: 'dropdown',
      options: ['Never', '1-2 times per week', '3-4 times per week', '5+ times per week'],
      required: false,
      businessTypes: ['Gyms', 'Wellness Centers'],
      assignmentType: 'Business-Specific',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignmentFilter, setAssignmentFilter] = useState('all');
  const [previewMode, setPreviewMode] = useState(false);

  const [newField, setNewField] = useState({
    label: '',
    type: 'text' as FormField['type'],
    options: [''],
    required: false,
    businessTypes: [] as string[],
    assignmentType: 'General' as 'General' | 'Business-Specific',
    placeholder: '',
  });

  const filteredFields = formFields.filter(field => {
    const matchesSearch = field.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignment = assignmentFilter === 'all' || field.assignmentType === assignmentFilter;
    return matchesSearch && matchesAssignment;
  });

  const handleAddField = () => {
    const field: FormField = {
      id: Math.max(...formFields.map(f => f.id)) + 1,
      ...newField,
      options: newField.type === 'dropdown' 
        ? newField.options.filter(opt => opt.trim() !== '') 
        : undefined,
    };
    setFormFields([...formFields, field]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
    setNewField({
      label: field.label,
      type: field.type,
      options: field.options || [''],
      required: field.required,
      businessTypes: field.businessTypes,
      assignmentType: field.assignmentType,
      placeholder: field.placeholder || '',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingField) return;
    const updatedField: FormField = {
      ...editingField,
      ...newField,
      options: newField.type === 'dropdown' 
        ? newField.options.filter(opt => opt.trim() !== '') 
        : undefined,
    };
    setFormFields(formFields.map(f => f.id === editingField.id ? updatedField : f));
    setEditingField(null);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleDeleteField = (id: number) => {
    setFormFields(formFields.filter(f => f.id !== id));
  };

  const resetForm = () => {
    setNewField({
      label: '',
      type: 'text',
      options: [''],
      required: false,
      businessTypes: [],
      assignmentType: 'General',
      placeholder: '',
    });
  };

  const addOption = () => {
    setNewField({
      ...newField,
      options: [...newField.options, '']
    });
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...newField.options];
    updatedOptions[index] = value;
    setNewField({
      ...newField,
      options: updatedOptions
    });
  };

  const removeOption = (index: number) => {
    setNewField({
      ...newField,
      options: newField.options.filter((_, i) => i !== index)
    });
  };

  const toggleBusinessType = (type: string) => {
    const updatedTypes = newField.businessTypes.includes(type)
      ? newField.businessTypes.filter(t => t !== type)
      : [...newField.businessTypes, type];
    setNewField({
      ...newField,
      businessTypes: updatedTypes
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Intake Form Builder</h1>
          <p className="text-gray-600">Create intake forms for provider consultations</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit Mode' : 'Preview Form'}
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingField ? 'Edit Form Field' : 'Add New Form Field'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="field-label">Field Label</Label>
                  <Input
                    id="field-label"
                    value={newField.label}
                    onChange={(e) => setNewField({...newField, label: e.target.value})}
                    placeholder="Enter field label..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="field-type">Field Type</Label>
                  <Select 
                    value={newField.type} 
                    onValueChange={(value: FormField['type']) => setNewField({...newField, type: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="placeholder">Placeholder Text</Label>
                  <Input
                    id="placeholder"
                    value={newField.placeholder}
                    onChange={(e) => setNewField({...newField, placeholder: e.target.value})}
                    placeholder="Enter placeholder text..."
                    className="mt-1"
                  />
                </div>

                {newField.type === 'dropdown' && (
                  <div>
                    <Label>Dropdown Options</Label>
                    <div className="space-y-2 mt-1">
                      {newField.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                          />
                          {newField.options.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeOption(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="assignment-type">Assignment Type</Label>
                  <Select 
                    value={newField.assignmentType} 
                    onValueChange={(value: 'General' | 'Business-Specific') => setNewField({...newField, assignmentType: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select assignment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General (All Merchants)</SelectItem>
                      <SelectItem value="Business-Specific">Business-Specific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newField.assignmentType === 'Business-Specific' && (
                  <div>
                    <Label>Business Types</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {businessTypes.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={newField.businessTypes.includes(type)}
                            onCheckedChange={() => toggleBusinessType(type)}
                          />
                          <Label htmlFor={type} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="required"
                    checked={newField.required}
                    onCheckedChange={(checked) => 
                      setNewField({...newField, required: checked})
                    }
                  />
                  <Label htmlFor="required">Required Field</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingField(null);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={editingField ? handleSaveEdit : handleAddField}>
                    {editingField ? 'Save Changes' : 'Add Field'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {!previewMode ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Form Fields</CardTitle>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search fields..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Assignment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignment Types</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Business-Specific">Business-Specific</SelectItem>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Field Label</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Required</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Assignment</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Business Types</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFields.map((field) => (
                    <tr key={field.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{field.label}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">
                          {fieldTypes.find(t => t.value === field.type)?.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={field.required ? 'default' : 'secondary'}>
                          {field.required ? 'Required' : 'Optional'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={field.assignmentType === 'General' ? 'default' : 'outline'}>
                          {field.assignmentType}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {field.assignmentType === 'General' ? (
                            <Badge variant="secondary" className="text-xs">All</Badge>
                          ) : (
                            field.businessTypes.map(type => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditField(field)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteField(field.id)}
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Provider Intake Form Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredFields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label className="text-base font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  
                  {field.type === 'text' && (
                    <Input placeholder={field.placeholder || 'Enter text...'} />
                  )}
                  
                  {field.type === 'long-text' && (
                    <Textarea placeholder={field.placeholder || 'Enter detailed information...'} rows={3} />
                  )}
                  
                  {field.type === 'number' && (
                    <Input type="number" placeholder={field.placeholder || 'Enter a number...'} />
                  )}
                  
                  {field.type === 'date' && (
                    <Input type="date" />
                  )}
                  
                  {field.type === 'dropdown' && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder || 'Select an option...'} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {field.type === 'checkbox' && (
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <Label>{field.placeholder || 'Check if applicable'}</Label>
                    </div>
                  )}
                  
                  {field.type === 'file-upload' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Plus className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600">
                          {field.placeholder || 'Click to upload file or drag and drop'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};