import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConsumerDetailsPageProps {
  consumerId?: string;
}

interface SubscribedProduct {
  id: number;
  name: string;
  category: string;
  subscriptionDate: string;
  status: 'Active' | 'Paused' | 'Cancelled';
  nextDelivery: string;
  price: number;
  frequency: string;
}

interface QuestionnaireSubmission {
  id: number;
  name: string;
  completedDate: string;
  status: 'Submitted' | 'Pending' | 'Completed';
}

const mockConsumer = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b332b1c2?w=100&h=100&fit=crop&crop=face",
  status: "Active",
  subscriptionStatus: "Active",
  joinDate: "2024-01-15",
  lastActivity: "2 days ago",
  totalSpent: 450,
  location: "New York, NY",
  isActive: true
};

const mockQuestionnaires: QuestionnaireSubmission[] = [
  {
    id: 1,
    name: "General Questionnaire",
    completedDate: "2024-01-14",
    status: "Submitted"
  },
  {
    id: 2,
    name: "Weight Management Intake Form",
    completedDate: "2024-01-15",
    status: "Submitted"
  },
  {
    id: 3,
    name: "Wellness Intake Form",
    completedDate: "2024-01-16",
    status: "Submitted"
  }
];

const mockSubscribedProducts: SubscribedProduct[] = [
  {
    id: 1,
    name: "Weight Management",
    category: "Health & Wellness",
    subscriptionDate: "2024-01-15",
    status: "Active",
    nextDelivery: "2024-02-15",
    price: 199,
    frequency: "Monthly"
  },
  {
    id: 2,
    name: "Wellness Supplement",
    category: "Supplements",
    subscriptionDate: "2024-01-20",
    status: "Active",
    nextDelivery: "2024-02-20",
    price: 89,
    frequency: "Monthly"
  }
];

export const ConsumerDetailsPage: React.FC<ConsumerDetailsPageProps> = ({ consumerId }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin/consumers');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Submitted':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={handleBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={mockConsumer.avatarUrl} alt={mockConsumer.name} />
            <AvatarFallback>
              {mockConsumer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{mockConsumer.name}</h1>
            <p className="text-gray-600">{mockConsumer.email}</p>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-sm text-gray-600">Consumer Active</span>
            <Switch checked={mockConsumer.isActive} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Consumer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Consumer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Consumer Status</span>
                <div className="mt-1">
                  <Badge className={getStatusColor(mockConsumer.status)}>
                    {mockConsumer.status}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Subscription Status</span>
                <div className="mt-1">
                  <Badge className={getStatusColor(mockConsumer.subscriptionStatus)}>
                    {mockConsumer.subscriptionStatus}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Join Date</span>
                <div className="mt-1 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{new Date(mockConsumer.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Last Activity</span>
                <div className="mt-1">
                  <span className="text-sm">{mockConsumer.lastActivity}</span>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Total Spent</span>
                <div className="mt-1">
                  <span className="text-sm font-medium">${mockConsumer.totalSpent}</span>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600">Contact</span>
                <div className="mt-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{mockConsumer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{mockConsumer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{mockConsumer.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscribed Products Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Subscribed Products</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSubscribedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.category}</div>
                    </div>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Questionnaire Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Questionnaire Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockQuestionnaires.map((questionnaire) => (
                  <div key={questionnaire.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{questionnaire.name}</div>
                      <div className="text-sm text-gray-500">
                        Completed on {new Date(questionnaire.completedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge className={getStatusColor(questionnaire.status)}>
                      {questionnaire.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subscribed Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Subscribed Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Product Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Subscription Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Next Delivery</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSubscribedProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{product.name}</td>
                        <td className="py-3 px-4 text-gray-600">{product.category}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(product.subscriptionDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(product.nextDelivery).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-medium">${product.price}</td>
                        <td className="py-3 px-4 text-gray-600">{product.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};