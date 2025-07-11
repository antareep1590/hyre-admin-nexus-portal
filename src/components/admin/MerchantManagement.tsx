
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, Search, MoreVertical, UserCheck, UserX, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MerchantManagementProps {
  onViewDetails: (merchantId: number) => void;
}

export const MerchantManagement: React.FC<MerchantManagementProps> = ({ onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const merchants = [
    {
      id: 1,
      name: 'Revive Clinic',
      email: 'admin@reviveclinic.com',
      domain: 'revive.hyrehealth.com',
      businessType: 'Medical Clinic',
      status: 'active',
      createdDate: '2024-01-15',
      revenue: '$12,450',
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'FitLife Gym',
      email: 'owner@fitlifegym.com',
      domain: 'fitlife.hyrehealth.com',
      businessType: 'Fitness Center',
      status: 'active',
      createdDate: '2024-02-20',
      revenue: '$8,920',
      lastActive: '1 day ago',
    },
    {
      id: 3,
      name: 'WellSpace Therapy',
      email: 'info@wellspace.com',
      domain: 'wellspace.hyrehealth.com',
      businessType: 'Mental Health',
      status: 'suspended',
      createdDate: '2024-03-10',
      revenue: '$5,670',
      lastActive: '1 week ago',
    },
  ];

  const businessTypes = [...new Set(merchants.map(m => m.businessType))];

  const filteredMerchants = merchants
    .filter(merchant => {
      const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           merchant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           merchant.domain.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter;
      const matchesBusinessType = businessTypeFilter === 'all' || merchant.businessType === businessTypeFilter;
      return matchesSearch && matchesStatus && matchesBusinessType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'revenue':
          return parseFloat(b.revenue.replace('$', '').replace(',', '')) - parseFloat(a.revenue.replace('$', '').replace(',', ''));
        case 'created':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'lastActive':
          return a.lastActive.localeCompare(b.lastActive);
        default:
          return 0;
      }
    });

  const handleSuspendMerchant = (merchantId: number) => {
    console.log('Suspending merchant:', merchantId);
  };

  const handleReactivateMerchant = (merchantId: number) => {
    console.log('Reactivating merchant:', merchantId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Merchant Management</h1>
          <p className="text-gray-600">Manage all merchant accounts and their platform access</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Merchants</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search merchants..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={businessTypeFilter} onValueChange={setBusinessTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Business Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {businessTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="created">Created Date</SelectItem>
                  <SelectItem value="lastActive">Last Active</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Domain</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Business Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.map((merchant) => (
                  <tr key={merchant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{merchant.name}</p>
                        <p className="text-sm text-gray-500">{merchant.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-blue-600">{merchant.domain}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-700">{merchant.businessType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={merchant.status === 'active' ? 'default' : 'secondary'}
                        className={merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {merchant.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{merchant.revenue}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{merchant.createdDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewDetails(merchant.id)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {merchant.status === 'active' ? (
                              <DropdownMenuItem 
                                onClick={() => handleSuspendMerchant(merchant.id)}
                                className="text-red-600"
                              >
                                <UserX className="w-4 h-4 mr-2" />
                                Suspend Account
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleReactivateMerchant(merchant.id)}
                                className="text-green-600"
                              >
                                <UserCheck className="w-4 h-4 mr-2" />
                                Reactivate Account
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredMerchants.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No merchants found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
