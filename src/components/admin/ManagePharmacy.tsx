
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, MapPin, Phone, Mail, Search, Filter } from 'lucide-react';
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

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

interface Pharmacy {
  id: number;
  name: string;
  npi: string;
  email: string;
  phone: string;
  address: string;
  availableStates: string[];
  defaultForStates: string[];
  status: 'Active' | 'Inactive';
  createdDate: string;
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
      defaultForStates: ['New York'],
      status: 'Active',
      createdDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'MediCare Solutions',
      npi: '0987654321',
      email: 'contact@medicare-sol.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      availableStates: ['California', 'Nevada', 'Arizona'],
      defaultForStates: ['California', 'Nevada'],
      status: 'Active',
      createdDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'Wellness Pharmacy',
      npi: '1122334455',
      email: 'info@wellnessrx.com',
      phone: '(555) 555-0123',
      address: '789 Pine St, Chicago, IL 60601',
      availableStates: ['Illinois', 'Wisconsin', 'Indiana'],
      defaultForStates: [],
      status: 'Inactive',
      createdDate: '2024-03-10',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [newPharmacy, setNewPharmacy] = useState({
    name: '',
    npi: '',
    email: '',
    phone: '',
    address: '',
    availableStates: [] as string[],
    defaultForStates: [] as string[],
    status: 'Active' as 'Active' | 'Inactive',
  });

  const availableStates = [...new Set(pharmacies.flatMap(p => p.availableStates))];

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pharmacy.npi.includes(searchQuery) ||
                         pharmacy.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pharmacy.status === statusFilter;
    const matchesState = stateFilter === 'all' || pharmacy.availableStates.includes(stateFilter);
    return matchesSearch && matchesStatus && matchesState;
  });

  const handleAddPharmacy = () => {
    const pharmacy: Pharmacy = {
      id: Math.max(...pharmacies.map(p => p.id)) + 1,
      ...newPharmacy,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setPharmacies([...pharmacies, pharmacy]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditPharmacy = (pharmacy: Pharmacy) => {
    setEditingPharmacy(pharmacy);
    setNewPharmacy({
      name: pharmacy.name,
      npi: pharmacy.npi,
      email: pharmacy.email,
      phone: pharmacy.phone,
      address: pharmacy.address,
      availableStates: [...pharmacy.availableStates],
      defaultForStates: [...pharmacy.defaultForStates],
      status: pharmacy.status,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingPharmacy) return;
    const updatedPharmacy: Pharmacy = {
      ...editingPharmacy,
      ...newPharmacy,
    };
    setPharmacies(pharmacies.map(p => p.id === editingPharmacy.id ? updatedPharmacy : p));
    setEditingPharmacy(null);
    resetForm();
    setIsAddModalOpen(false);
  };

  const resetForm = () => {
    setNewPharmacy({
      name: '',
      npi: '',
      email: '',
      phone: '',
      address: '',
      availableStates: [],
      defaultForStates: [],
      status: 'Active',
    });
  };

  const handleStateChange = (state: string, checked: boolean) => {
    if (checked) {
      setNewPharmacy(prev => ({
        ...prev,
        availableStates: [...prev.availableStates, state]
      }));
    } else {
      setNewPharmacy(prev => ({
        ...prev,
        availableStates: prev.availableStates.filter(s => s !== state),
        defaultForStates: prev.defaultForStates.filter(s => s !== state)
      }));
    }
  };


  const togglePharmacyStatus = (id: number) => {
    setPharmacies(pharmacies.map(pharmacy =>
      pharmacy.id === id
        ? { ...pharmacy, status: pharmacy.status === 'Active' ? 'Inactive' : 'Active' }
        : pharmacy
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy</h1>
          <p className="text-gray-600">Manage pharmacy partners and their service areas</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Pharmacy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPharmacy ? 'Edit Pharmacy' : 'Add New Pharmacy'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Pharmacy Name</Label>
                  <Input
                    id="name"
                    value={newPharmacy.name}
                    onChange={(e) => setNewPharmacy({...newPharmacy, name: e.target.value})}
                    placeholder="Enter pharmacy name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="npi">NPI Number</Label>
                  <Input
                    id="npi"
                    value={newPharmacy.npi}
                    onChange={(e) => setNewPharmacy({...newPharmacy, npi: e.target.value})}
                    placeholder="Enter NPI number"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPharmacy.email}
                    onChange={(e) => setNewPharmacy({...newPharmacy, email: e.target.value})}
                    placeholder="contact@pharmacy.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newPharmacy.phone}
                    onChange={(e) => setNewPharmacy({...newPharmacy, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newPharmacy.address}
                  onChange={(e) => setNewPharmacy({...newPharmacy, address: e.target.value})}
                  placeholder="Enter complete address"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Available States</Label>
                <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {US_STATES.map((state) => (
                      <div key={state} className="flex items-center space-x-2">
                        <Checkbox
                          id={`state-${state}`}
                          checked={newPharmacy.availableStates.includes(state)}
                          onCheckedChange={(checked) => handleStateChange(state, !!checked)}
                        />
                        <Label htmlFor={`state-${state}`} className="text-sm font-normal">
                          {state}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newPharmacy.status === 'Active'}
                  onCheckedChange={(checked) => 
                    setNewPharmacy({...newPharmacy, status: checked ? 'Active' : 'Inactive'})
                  }
                />
                <Label htmlFor="status">Active Status</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPharmacy(null);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button onClick={editingPharmacy ? handleSaveEdit : handleAddPharmacy}>
                  {editingPharmacy ? 'Save Changes' : 'Add Pharmacy'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Pharmacies</CardTitle>
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
                  {availableStates.map(state => (
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Pharmacy</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">NPI</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Available States</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
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
                      <span className="font-mono text-sm">{pharmacy.npi}</span>
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
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.availableStates.slice(0, 2).map((state) => (
                          <Badge 
                            key={state} 
                            variant="outline" 
                            className={`text-xs ${pharmacy.defaultForStates.includes(state) ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}`}
                          >
                            {state}
                            {pharmacy.defaultForStates.includes(state) && ' (Default)'}
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
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={pharmacy.status === 'Active' ? 'default' : 'secondary'}
                          className={pharmacy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {pharmacy.status}
                        </Badge>
                        <Switch
                          checked={pharmacy.status === 'Active'}
                          onCheckedChange={() => togglePharmacyStatus(pharmacy.id)}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPharmacy(pharmacy)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
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
