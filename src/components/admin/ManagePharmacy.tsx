
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, MapPin, Phone, Mail, Search, Filter, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Pharmacy {
  id: number;
  name: string;
  npi: string;
  email: string;
  phone: string;
  address: string;
  availableStates: string[];
  status: 'Active' | 'Inactive';
  lastSynced: string;
}

export const ManagePharmacy: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([
    {
      id: 1,
      name: 'HealthPlus Pharmacy',
      npi: '1234567890',
      email: 'admin@healthplus.com',
      phone: '(555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      availableStates: ['New York', 'New Jersey', 'Connecticut'],
      status: 'Active',
      lastSynced: '2024-07-03 10:30 AM',
    },
    {
      id: 2,
      name: 'MediCare Solutions',
      npi: '0987654321',
      email: 'contact@medicare-sol.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      availableStates: ['California', 'Nevada', 'Arizona'],
      status: 'Active',
      lastSynced: '2024-07-03 09:15 AM',
    },
    {
      id: 3,
      name: 'Wellness Pharmacy',
      npi: '1122334455',
      email: 'info@wellnessrx.com',
      phone: '(555) 555-0123',
      address: '789 Pine St, Chicago, IL 60601',
      availableStates: ['Illinois', 'Wisconsin', 'Indiana'],
      status: 'Inactive',
      lastSynced: '2024-07-03 08:45 AM',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const availableStates = [...new Set(pharmacies.flatMap(p => p.availableStates))];

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.npi.includes(searchQuery) ||
                         pharmacy.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pharmacy.status === statusFilter;
    const matchesState = stateFilter === 'all' || pharmacy.availableStates.includes(stateFilter);
    return matchesSearch && matchesStatus && matchesState;
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call to Qualiphy
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Partners</h1>
          <p className="text-gray-600">View pharmacies synced from Qualiphy</p>
        </div>
        <Button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Syncing...' : 'Refresh'}
        </Button>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Pharmacies are synced from Qualiphy. No manual changes allowed here.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Qualiphy Pharmacies</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search pharmacies..."
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

              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {[...new Set(pharmacies.flatMap(p => p.availableStates))].map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Pharmacy Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Contact Info</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">NPI Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Available States</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Synced</th>
                </tr>
              </thead>
              <tbody>
                {filteredPharmacies.map((pharmacy) => (
                  <tr key={pharmacy.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{pharmacy.name}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {pharmacy.address}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          {pharmacy.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {pharmacy.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm">{pharmacy.npi}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.availableStates.slice(0, 2).map((state) => (
                          <Badge 
                            key={state} 
                            variant="outline" 
                            className="text-xs"
                          >
                            {state}
                          </Badge>
                        ))}
                        {pharmacy.availableStates.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{pharmacy.availableStates.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={pharmacy.status === 'Active' ? 'default' : 'secondary'}
                        className={pharmacy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {pharmacy.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{pharmacy.lastSynced}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPharmacies.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pharmacies found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
