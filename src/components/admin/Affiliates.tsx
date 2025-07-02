import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  UserX, 
  Copy, 
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Affiliate {
  id: number;
  name: string;
  email: string;
  phone: string;
  defaultCommission: number;
  totalEarnings: number;
  totalReferrals: number;
  referralCode: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

interface AffiliatesProps {
  onViewDetails: (affiliateId: number) => void;
}

export const Affiliates: React.FC<AffiliatesProps> = ({ onViewDetails }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAffiliate, setNewAffiliate] = useState({
    name: '',
    email: '',
    phone: '',
    defaultCommission: 10,
    referralCode: ''
  });

  // Mock data
  const [affiliates, setAffiliates] = useState<Affiliate[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@marketing.com',
      phone: '+1 (555) 123-4567',
      defaultCommission: 12,
      totalEarnings: 15750.00,
      totalReferrals: 25,
      referralCode: 'SARAH2024',
      status: 'Active',
      joinedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@bizdev.com',
      phone: '+1 (555) 987-6543',
      defaultCommission: 10,
      totalEarnings: 8900.00,
      totalReferrals: 18,
      referralCode: 'MIKE2024',
      status: 'Active',
      joinedDate: '2024-02-08'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      email: 'lisa@consultant.com',
      phone: '+1 (555) 456-7890',
      defaultCommission: 15,
      totalEarnings: 22300.00,
      totalReferrals: 31,
      referralCode: 'LISA2024',
      status: 'Inactive',
      joinedDate: '2023-11-20'
    }
  ]);

  const generateReferralCode = () => {
    const code = newAffiliate.name.toUpperCase().replace(/\s+/g, '').slice(0, 6) + '2024';
    setNewAffiliate(prev => ({ ...prev, referralCode: code }));
  };

  const handleAddAffiliate = () => {
    if (!newAffiliate.name || !newAffiliate.email || !newAffiliate.phone) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const affiliate: Affiliate = {
      id: affiliates.length + 1,
      ...newAffiliate,
      totalEarnings: 0,
      totalReferrals: 0,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setAffiliates(prev => [...prev, affiliate]);
    setNewAffiliate({
      name: '',
      email: '',
      phone: '',
      defaultCommission: 10,
      referralCode: ''
    });
    setIsAddModalOpen(false);
    toast({
      title: 'Success',
      description: 'Affiliate added successfully.',
    });
  };

  const copyReferralLink = (code: string) => {
    const link = `https://setup.hyrhealth.com/onboard?ref=${code}`;
    navigator.clipboard.writeText(link);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard.',
    });
  };

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || affiliate.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    totalEarnings: affiliates.reduce((sum, a) => sum + a.totalEarnings, 0),
    totalReferrals: affiliates.reduce((sum, a) => sum + a.totalReferrals, 0),
    activeAffiliates: affiliates.filter(a => a.status === 'Active').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Affiliates</h1>
          <p className="text-gray-600">Manage referral partners and track their performance</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Affiliate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Affiliate</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newAffiliate.name}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, name: e.target.value }))}
                  onBlur={generateReferralCode}
                  placeholder="Enter affiliate name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAffiliate.email}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={newAffiliate.phone}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="commission">Default Commission %</Label>
                <Input
                  id="commission"
                  type="number"
                  min="0"
                  max="100"
                  value={newAffiliate.defaultCommission}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, defaultCommission: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="referralCode">Referral Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="referralCode"
                    value={newAffiliate.referralCode}
                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, referralCode: e.target.value }))}
                    placeholder="Auto-generated code"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateReferralCode}
                    className="px-3"
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAffiliate}>
                  Add Affiliate
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.activeAffiliates}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalReferrals}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalStats.totalEarnings.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Affiliates Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affiliate Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Commission %</TableHead>
                <TableHead>Total Earnings</TableHead>
                <TableHead>Referrals</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAffiliates.map((affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell className="font-medium">{affiliate.name}</TableCell>
                  <TableCell>{affiliate.email}</TableCell>
                  <TableCell>{affiliate.phone}</TableCell>
                  <TableCell>{affiliate.defaultCommission}%</TableCell>
                  <TableCell>${affiliate.totalEarnings.toLocaleString()}</TableCell>
                  <TableCell>{affiliate.totalReferrals}</TableCell>
                  <TableCell>
                    <Badge variant={affiliate.status === 'Active' ? 'default' : 'secondary'}>
                      {affiliate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(affiliate.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyReferralLink(affiliate.referralCode)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <UserX className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};