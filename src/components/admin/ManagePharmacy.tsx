
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Edit, Building2 } from 'lucide-react';

interface Pharmacy {
  id: number;
  name: string;
  npi: string;
  email: string;
  phone: string;
  address: string;
  states: string[];
  status: 'Active' | 'Inactive';
  defaultForStates: string[];
  lastUpdated: string;
}

const mockPharmacies: Pharmacy[] = [
  {
    id: 1,
    name: "MedSupply Central",
    npi: "1234567890",
    email: "orders@medsupplycentral.com",
    phone: "(555) 123-4567",
    address: "123 Pharmacy St, Los Angeles, CA 90210",
    states: ["CA", "NV", "AZ"],
    status: "Active",
    defaultForStates: ["CA", "NV"],
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "East Coast Pharmacy",
    npi: "0987654321",
    email: "info@eastcoastpharm.com",
    phone: "(555) 987-6543",
    address: "456 Medical Ave, New York, NY 10001",
    states: ["NY", "NJ", "CT"],
    status: "Active",
    defaultForStates: ["NY"],
    lastUpdated: "2024-01-12"
  },
  {
    id: 3,
    name: "Texas Health Supply",
    npi: "1122334455",
    email: "contact@txhealthsupply.com",
    phone: "(555) 555-0123",
    address: "789 Health Blvd, Houston, TX 77001",
    states: ["TX", "OK", "LA"],
    status: "Inactive",
    defaultForStates: [],
    lastUpdated: "2024-01-10"
  }
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const ManagePharmacy: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(mockPharmacies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState<Pharmacy | null>(null);

  const [newPharmacy, setNewPharmacy] = useState({
    name: '',
    npi: '',
    email: '',
    phone: '',
    address: '',
    states: [] as string[],
    status: 'Active' as 'Active' | 'Inactive',
    defaultForStates: [] as string[]
  });

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.npi.includes(searchTerm) ||
                         pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pharmacy.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPharmacy = () => {
    const pharmacy: Pharmacy = {
      id: Math.max(...pharmacies.map(p => p.id)) + 1,
      ...newPharmacy,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPharmacies([...pharmacies, pharmacy]);
    resetNewPharmacy();
    setIsAddModalOpen(false);
  };

  const resetNewPharmacy = () => {
    setNewPharmacy({
      name: '',
      npi: '',
      email: '',
      phone: '',
      address: '',
      states: [],
      status: 'Active',
      defaultForStates: []
    });
  };

  const handleEditPharmacy = (pharmacy: Pharmacy) => {
    setEditingPharmacy({...pharmacy});
  };

  const handleSaveEdit = () => {
    if (!editingPharmacy) return;
    const updatedPharmacy = {
      ...editingPharmacy,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPharmacies(pharmacies.map(p => p.id === editingPharmacy.id ? updatedPharmacy : p));
    setEditingPharmacy(null);
  };

  const togglePharmacyStatus = (id: number) => {
    setPharmacies(pharmacies.map(pharmacy => 
      pharmacy.id === id 
        ? { 
            ...pharmacy, 
            status: pharmacy.status === 'Active' ? 'Inactive' : 'Active',
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : pharmacy
    ));
  };

  const handleStateToggle = (state: string, isSelected: boolean, isForDefaults = false) => {
    if (isForDefaults) {
      if (isSelected) {
        setNewPharmacy({
          ...newPharmacy,
          defaultForStates: [...newPharmacy.defaultForStates, state]
        });
      } else {
        setNewPharmacy({
          ...newPharmacy,
          defaultForStates: newPharmacy.defaultForStates.filter(s => s !== state)
        });
      }
    } else {
      if (isSelected) {
        setNewPharmacy({
          ...newPharmacy,
          states: [...newPharmacy.states, state]
        });
      } else {
        setNewPharmacy({
          ...newPharmacy,
          states: newPharmacy.states.filter(s => s !== state),
          defaultForStates: newPharmacy.defaultForStates.filter(s => s !== state)
        });
      }
    }
  };

  const handleEditStateToggle = (state: string, isSelected: boolean, isForDefaults = false) => {
    if (!editingPharmacy) return;
    
    if (isForDefaults) {
      if (isSelected) {
        setEditingPharmacy({
          ...editingPharmacy,
          defaultForStates: [...editingPharmacy.defaultForStates, state]
        });
      } else {
        setEditingPharmacy({
          ...editingPharmacy,
          defaultForStates: editingPharmacy.defaultForStates.filter(s => s !== state)
        });
      }
    } else {
      if (isSelected) {
        setEditingPharmacy({
          ...editingPharmacy,
          states: [...editingPharmacy.states, state]
        });
      } else {
        setEditingPharmacy({
          ...editingPharmacy,
          states: editingPharmacy.states.filter(s => s !== state),
          defaultForStates: editingPharmacy.defaultForStates.filter(s => s !== state)
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy</h1>
          <p className="text-gray-600 mt-1">Manage all pharmacies available on the platform</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Pharmacy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Pharmacy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Pharmacy Name</Label>
                  <Input
                    id="name"
                    value={newPharmacy.name}
                    onChange={(e) => setNewPharmacy({...newPharmacy, name: e.target.value})}
                    placeholder="Enter pharmacy name"
                  />
                </div>
                <div>
                  <Label htmlFor="npi">NPI Number</Label>
                  <Input
                    id="npi"
                    value={newPharmacy.npi}
                    onChange={(e) => setNewPharmacy({...newPharmacy, npi: e.target.value})}
                    placeholder="Enter NPI number"
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
                    placeholder="Enter contact email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newPharmacy.phone}
                    onChange={(e) => setNewPharmacy({...newPharmacy, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newPharmacy.address}
                  onChange={(e) => setNewPharmacy({...newPharmacy, address: e.target.value})}
                  placeholder="Enter full address"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newPharmacy.status === 'Active'}
                  onCheckedChange={(checked) => setNewPharmacy({...newPharmacy, status: checked ? 'Active' : 'Inactive'})}
                />
                <Label>Active Status</Label>
              </div>
              <div>
                <Label>Available States</Label>
                <div className="grid grid-cols-8 gap-2 mt-2 max-h-32 overflow-y-auto border rounded p-2">
                  {US_STATES.map(state => (
                    <div key={state} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`state-${state}`}
                        checked={newPharmacy.states.includes(state)}
                        onChange={(e) => handleStateToggle(state, e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor={`state-${state}`} className="text-sm">{state}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Set as Default for States</Label>
                <p className="text-sm text-gray-500 mb-2">Select which states this should be the default pharmacy for</p>
                <div className="grid grid-cols-8 gap-2 mt-2 max-h-32 overflow-y-auto border rounded p-2">
                  {newPharmacy.states.map(state => (
                    <div key={`default-${state}`} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`default-${state}`}
                        checked={newPharmacy.defaultForStates.includes(state)}
                        onChange={(e) => handleStateToggle(state, e.target.checked, true)}
                        className="rounded"
                      />
                      <label htmlFor={`default-${state}`} className="text-sm">{state}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPharmacy}>
                  Add Pharmacy
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Pharmacies</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search pharmacies..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pharmacy Name</TableHead>
                <TableHead>NPI</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Available States</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPharmacies.map((pharmacy) => (
                <TableRow key={pharmacy.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                      {pharmacy.name}
                    </div>
                  </TableCell>
                  <TableCell>{pharmacy.npi}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{pharmacy.email}</div>
                      <div className="text-sm text-gray-500">{pharmacy.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {pharmacy.states.map(state => (
                        <Badge 
                          key={state} 
                          variant={pharmacy.defaultForStates.includes(state) ? "default" : "outline"} 
                          className="text-xs"
                        >
                          {state}
                          {pharmacy.defaultForStates.includes(state) && " (Default)"}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant={pharmacy.status === 'Active' ? 'default' : 'secondary'}>
                        {pharmacy.status}
                      </Badge>
                      <Switch
                        checked={pharmacy.status === 'Active'}
                        onCheckedChange={() => togglePharmacyStatus(pharmacy.id)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {pharmacy.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPharmacy(pharmacy)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {editingPharmacy && (
        <Dialog open={!!editingPharmacy} onOpenChange={() => setEditingPharmacy(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Pharmacy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Pharmacy Name</Label>
                  <Input
                    id="edit-name"
                    value={editingPharmacy.name}
                    onChange={(e) => setEditingPharmacy({...editingPharmacy, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-npi">NPI Number</Label>
                  <Input
                    id="edit-npi"
                    value={editingPharmacy.npi}
                    onChange={(e) => setEditingPharmacy({...editingPharmacy, npi: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-email">Contact Email</Label>
                  <Input
                    id="edit-email"
                    value={editingPharmacy.email}
                    onChange={(e) => setEditingPharmacy({...editingPharmacy, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={editingPharmacy.phone}
                    onChange={(e) => setEditingPharmacy({...editingPharmacy, phone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Textarea
                  id="edit-address"
                  value={editingPharmacy.address}
                  onChange={(e) => setEditingPharmacy({...editingPharmacy, address: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingPharmacy.status === 'Active'}
                  onCheckedChange={(checked) => setEditingPharmacy({...editingPharmacy, status: checked ? 'Active' : 'Inactive'})}
                />
                <Label>Active Status</Label>
              </div>
              <div>
                <Label>Available States</Label>
                <div className="grid grid-cols-8 gap-2 mt-2 max-h-32 overflow-y-auto border rounded p-2">
                  {US_STATES.map(state => (
                    <div key={state} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-state-${state}`}
                        checked={editingPharmacy.states.includes(state)}
                        onChange={(e) => handleEditStateToggle(state, e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor={`edit-state-${state}`} className="text-sm">{state}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Set as Default for States</Label>
                <p className="text-sm text-gray-500 mb-2">Select which states this should be the default pharmacy for</p>
                <div className="grid grid-cols-8 gap-2 mt-2 max-h-32 overflow-y-auto border rounded p-2">
                  {editingPharmacy.states.map(state => (
                    <div key={`edit-default-${state}`} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-default-${state}`}
                        checked={editingPharmacy.defaultForStates.includes(state)}
                        onChange={(e) => handleEditStateToggle(state, e.target.checked, true)}
                        className="rounded"
                      />
                      <label htmlFor={`edit-default-${state}`} className="text-sm">{state}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingPharmacy(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>
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
