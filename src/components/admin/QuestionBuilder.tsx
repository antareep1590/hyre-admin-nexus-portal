import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  GripVertical,
  ChevronDown,
  ChevronUp 
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

interface Question {
  id: number;
  text: string;
  type: 'text' | 'number' | 'multiple-choice' | 'dropdown' | 'checkbox' | 'date';
  options?: string[];
  required: boolean;
  correctAnswer?: string;
  businessTypes: string[];
  productIds?: number[];
  category: 'general' | 'product-specific';
}

const businessTypes = ['Clinics', 'Gyms', 'Wellness Centers', 'Telehealth', 'Pharmacy'];
const questionTypes = [
  { value: 'text', label: 'Text Input' },
  { value: 'number', label: 'Number Input' },
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
];

const questionCategories = [
  { value: 'general', label: 'General Question' },
  { value: 'product-specific', label: 'Product Specific' },
];

// Mock products data - in real app this would come from props or API
const mockProducts = [
  { id: 1, name: 'Semaglutide' },
  { id: 2, name: 'Tirzepatide' },
  { id: 3, name: 'NAD+ Therapy' },
  { id: 4, name: 'Testosterone Therapy' },
];

export const QuestionBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: "What is your age?",
      type: 'number',
      required: true,
      businessTypes: ['Clinics', 'Telehealth'],
      category: 'general',
    },
    {
      id: 2,
      text: "Do you have any heart conditions?",
      type: 'multiple-choice',
      options: ['Yes', 'No', 'Not sure'],
      required: true,
      correctAnswer: 'No',
      businessTypes: ['Clinics'],
      productIds: [1, 2],
      category: 'product-specific',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [previewMode, setPreviewMode] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'text' as Question['type'],
    options: [''],
    required: false,
    correctAnswer: '',
    businessTypes: [] as string[],
    productIds: [] as number[],
    category: 'general' as 'general' | 'product-specific',
    selectedProductId: undefined as number | undefined,
  });

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddQuestion = () => {
    const question: Question = {
      id: Math.max(...questions.map(q => q.id)) + 1,
      ...newQuestion,
      options: newQuestion.type === 'multiple-choice' || newQuestion.type === 'dropdown' 
        ? newQuestion.options.filter(opt => opt.trim() !== '') 
        : undefined,
      productIds: newQuestion.category === 'product-specific' && newQuestion.selectedProductId 
        ? [newQuestion.selectedProductId] 
        : [],
    };
    setQuestions([...questions, question]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setNewQuestion({
      text: question.text,
      type: question.type,
      options: question.options || [''],
      required: question.required,
      correctAnswer: question.correctAnswer || '',
      businessTypes: question.businessTypes,
      productIds: question.productIds || [],
      category: question.category,
      selectedProductId: question.productIds?.[0],
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingQuestion) return;
    const updatedQuestion: Question = {
      ...editingQuestion,
      ...newQuestion,
      options: newQuestion.type === 'multiple-choice' || newQuestion.type === 'dropdown' 
        ? newQuestion.options.filter(opt => opt.trim() !== '') 
        : undefined,
      productIds: newQuestion.category === 'product-specific' && newQuestion.selectedProductId 
        ? [newQuestion.selectedProductId] 
        : [],
    };
    setQuestions(questions.map(q => q.id === editingQuestion.id ? updatedQuestion : q));
    setEditingQuestion(null);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const resetForm = () => {
    setNewQuestion({
      text: '',
      type: 'text',
      options: [''],
      required: false,
      correctAnswer: '',
      businessTypes: [],
      productIds: [],
      category: 'general',
      selectedProductId: undefined,
    });
  };

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, '']
    });
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions
    });
  };

  const removeOption = (index: number) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.filter((_, i) => i !== index)
    });
  };

  const toggleBusinessType = (type: string) => {
    const updatedTypes = newQuestion.businessTypes.includes(type)
      ? newQuestion.businessTypes.filter(t => t !== type)
      : [...newQuestion.businessTypes, type];
    setNewQuestion({
      ...newQuestion,
      businessTypes: updatedTypes
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Question Builder</h1>
          <p className="text-gray-600">Create eligibility questionnaires for merchants</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingQuestion ? 'Edit Question' : 'Add New Question'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="question-text">Question Text</Label>
                  <Textarea
                    id="question-text"
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                    placeholder="Enter your question..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="question-category">Question Category</Label>
                    <Select 
                      value={newQuestion.category} 
                      onValueChange={(value: 'general' | 'product-specific') => 
                        setNewQuestion({...newQuestion, category: value, selectedProductId: undefined})
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {questionCategories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="question-type">Question Type</Label>
                    <Select 
                      value={newQuestion.type} 
                      onValueChange={(value: Question['type']) => setNewQuestion({...newQuestion, type: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select question type" />
                      </SelectTrigger>
                      <SelectContent>
                        {questionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newQuestion.category === 'product-specific' && (
                  <div>
                    <Label htmlFor="product-selection">Select Product</Label>
                    <Select 
                      value={newQuestion.selectedProductId?.toString()} 
                      onValueChange={(value) => setNewQuestion({...newQuestion, selectedProductId: parseInt(value)})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProducts.map(product => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-1">
                      This question will only appear when consumers are purchasing the selected product.
                    </p>
                  </div>
                )}

                {(newQuestion.type === 'multiple-choice' || newQuestion.type === 'dropdown') && (
                  <div>
                    <Label>Options</Label>
                    <div className="space-y-2 mt-1">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                          />
                          {newQuestion.options.length > 1 && (
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

                {(newQuestion.type === 'multiple-choice' || newQuestion.type === 'dropdown') && (
                  <div>
                    <Label htmlFor="correct-answer">Correct Answer (for eligibility)</Label>
                    <Select 
                      value={newQuestion.correctAnswer} 
                      onValueChange={(value) => setNewQuestion({...newQuestion, correctAnswer: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {newQuestion.options.filter(opt => opt.trim() !== '').map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label>Business Types</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {businessTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={newQuestion.businessTypes.includes(type)}
                          onCheckedChange={() => toggleBusinessType(type)}
                        />
                        <Label htmlFor={type} className="text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="required"
                    checked={newQuestion.required}
                    onCheckedChange={(checked) => 
                      setNewQuestion({...newQuestion, required: checked})
                    }
                  />
                  <Label htmlFor="required">Required Field</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingQuestion(null);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={editingQuestion ? handleSaveEdit : handleAddQuestion}>
                    {editingQuestion ? 'Save Changes' : 'Add Question'}
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
              <CardTitle>Questions</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Question</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Required</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Product/Business Types</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {filteredQuestions.map((question) => (
                      <tr key={question.id} className="border-b border-gray-100 hover:bg-gray-50">
                         <td className="py-3 px-4">
                           <span className="font-medium text-gray-900">{question.text}</span>
                         </td>
                        <td className="py-3 px-4">
                          <Badge variant={question.category === 'general' ? 'default' : 'secondary'}>
                            {questionCategories.find(c => c.value === question.category)?.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">
                            {questionTypes.find(t => t.value === question.type)?.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={question.required ? 'default' : 'secondary'}>
                            {question.required ? 'Required' : 'Optional'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {question.category === 'product-specific' && question.productIds && question.productIds.length > 0 ? (
                              question.productIds.map(productId => {
                                const product = mockProducts.find(p => p.id === productId);
                                return product ? (
                                  <Badge key={productId} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                    {product.name}
                                  </Badge>
                                ) : null;
                              })
                            ) : (
                              question.businessTypes.map(type => (
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
                            onClick={() => handleEditQuestion(question)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteQuestion(question.id)}
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
            <CardTitle>Patient Questionnaire Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredQuestions.map((question, index) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">
                      {index + 1}. {question.text}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={question.category === 'general' ? 'default' : 'secondary'} className="text-xs">
                        {questionCategories.find(c => c.value === question.category)?.label}
                      </Badge>
                      {question.category === 'product-specific' && question.productIds && question.productIds.length > 0 && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                          {mockProducts.find(p => p.id === question.productIds![0])?.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {question.type === 'text' && (
                    <Input placeholder="Enter your answer..." />
                  )}
                  
                  {question.type === 'number' && (
                    <Input type="number" placeholder="Enter a number..." />
                  )}
                  
                  {question.type === 'date' && (
                    <Input type="date" />
                  )}
                  
                  {question.type === 'multiple-choice' && (
                    <div className="space-y-2">
                      {question.options?.map(option => (
                        <div key={option} className="flex items-center space-x-2">
                          <input type="radio" name={`question-${question.id}`} />
                          <Label>{option}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'dropdown' && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option..." />
                      </SelectTrigger>
                      <SelectContent>
                        {question.options?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {question.type === 'checkbox' && (
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <Label>I agree / confirm</Label>
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