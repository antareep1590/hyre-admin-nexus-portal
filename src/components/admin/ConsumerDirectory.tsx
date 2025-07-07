import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Eye, Mail, Phone, MapPin, Calendar } from 'lucide-react';
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

interface Consumer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  merchantName: string;
  merchantId: number;
  status: 'Active' | 'Inactive';
  subscriptionCount: number;
  joinDate: string;
  location?: string;
  lastActivity: string;
  totalSpent: number;
  prescriptions: number;
}

const mockConsumers: Consumer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b332b1c2?w=100&h=100&fit=crop&crop=face",
    merchantName: "Wellness Clinic NYC",
    merchantId: 1,
    status: "Active",
    subscriptionCount: 2,
    joinDate: "2024-01-15",
    location: "New York, NY",
    lastActivity: "2024-01-28",
    totalSpent: 598,
    prescriptions: 3,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "(555) 987-6543",
    merchantName: "FitLife Gym",
    merchantId: 2,
    status: "Active",
    subscriptionCount: 1,
    joinDate: "2024-01-20",
    location: "Los Angeles, CA",
    lastActivity: "2024-01-27",
    totalSpent: 299,
    prescriptions: 1,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    merchantName: "Wellness Clinic NYC",
    merchantId: 1,
    status: "Inactive",
    subscriptionCount: 0,
    joinDate: "2024-01-10",
    location: "Miami, FL",
    lastActivity: "2024-01-20",
    totalSpent: 199,
    prescriptions: 1,
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "(555) 456-7890",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    merchantName: "Telehealth Pro",
    merchantId: 3,
    status: "Active",
    subscriptionCount: 3,
    joinDate: "2024-01-05",
    location: "Austin, TX",
    lastActivity: "2024-01-28",
    totalSpent: 897,
    prescriptions: 4,
  },
];

const merchants = [
  { id: 1, name: "Wellness Clinic NYC" },
  { id: 2, name: "FitLife Gym" },
  { id: 3, name: "Telehealth Pro" },
  { id: 4, name: "Holistic Health Center" },
];

export const ConsumerDirectory: React.FC = () => {
  const [consumers, setConsumers] = useState<Consumer[]>(mockConsumers);
  const [searchQuery, setSearchQuery] = useState('');
  const [merchantFilter, setMerchantFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingConsumer, setViewingConsumer] = useState<Consumer | null>(null);

  const filteredConsumers = consumers.filter(consumer => {
    const matchesSearch = 
      consumer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consumer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consumer.merchantName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMerchant = merchantFilter === 'all' || consumer.merchantName === merchantFilter;
    const matchesStatus = statusFilter === 'all' || consumer.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesMerchant && matchesStatus;
  });

  const handleViewConsumer = (consumer: Consumer) => {
    setViewingConsumer(consumer);
  };

  const totalConsumers = consumers.length;
  const activeConsumers = consumers.filter(c => c.status === 'Active').length;
  const totalRevenue = consumers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSubscriptions = consumers.reduce((sum, c) => sum + c.subscriptionCount, 0) / consumers.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consumer Directory</h1>
          <p className="text-gray-600">Platform-wide consumer overview across all merchants</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Consumers</p>
                <p className="text-2xl font-bold text-gray-900">{totalConsumers}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Consumers</p>
                <p className="text-2xl font-bold text-green-600">{activeConsumers}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{avgSubscriptions.toFixed(1)}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Consumers</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search consumers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={merchantFilter} onValueChange={setMerchantFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by Merchant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Merchants</SelectItem>
                  {merchants.map(merchant => (
                    <SelectItem key={merchant.id} value={merchant.name}>
                      {merchant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Consumer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Subscriptions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsumers.map((consumer) => (
                  <tr key={consumer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={consumer.avatarUrl} alt={consumer.name} />
                          <AvatarFallback>
                            {consumer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{consumer.name}</div>
                          <div className="text-sm text-gray-500">{consumer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{consumer.merchantName}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={consumer.status === 'Active' ? 'default' : 'secondary'}
                        className={consumer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {consumer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-900">{consumer.subscriptionCount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">${consumer.totalSpent}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{new Date(consumer.joinDate).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewConsumer(consumer)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Consumer Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={consumer.avatarUrl} alt={consumer.name} />
                                <AvatarFallback className="text-lg">
                                  {consumer.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">{consumer.name}</h3>
                                <p className="text-gray-600">{consumer.merchantName}</p>
                                <Badge 
                                  variant={consumer.status === 'Active' ? 'default' : 'secondary'}
                                  className={consumer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                                >
                                  {consumer.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                  <Mail className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">{consumer.email}</span>
                                </div>
                                
                                {consumer.phone && (
                                  <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{consumer.phone}</span>
                                  </div>
                                )}
                                
                                {consumer.location && (
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{consumer.location}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">
                                    Joined {new Date(consumer.joinDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h4 className="font-medium text-gray-900 mb-2">Activity Summary</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Active Subscriptions:</span>
                                      <span className="font-medium">{consumer.subscriptionCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Total Spent:</span>
                                      <span className="font-medium">${consumer.totalSpent}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Prescriptions:</span>
                                      <span className="font-medium">{consumer.prescriptions}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Last Activity:</span>
                                      <span className="font-medium">
                                        {new Date(consumer.lastActivity).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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