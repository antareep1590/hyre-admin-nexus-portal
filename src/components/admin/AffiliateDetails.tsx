import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Copy, 
  DollarSign, 
  Users, 
  TrendingUp,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface ReferredLead {
  id: number;
  merchantName: string;
  email: string;
  businessType: string;
  status: 'Invited' | 'In Progress' | 'Launched' | 'Disqualified';
  joinedOn: string;
  platformStatus: 'Live' | 'Setup' | 'Pending' | 'Rejected';
  commissionEligible: boolean;
}

interface AffiliateDetailsProps {
  affiliateId: number | null;
  onBack: () => void;
}

export const AffiliateDetails: React.FC<AffiliateDetailsProps> = ({ affiliateId, onBack }) => {
  const { toast } = useToast();

  // Mock affiliate data
  const affiliate = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@marketing.com',
    phone: '+1 (555) 123-4567',
    defaultCommission: 12,
    referralCode: 'SARAH2024',
    status: 'Active',
    joinedDate: '2024-01-15',
    totalEarnings: 15750.00,
    totalPaidOut: 12000.00,
    pendingEarnings: 3750.00,
    totalReferrals: 25
  };

  const [referredLeads] = useState<ReferredLead[]>([
    {
      id: 1,
      merchantName: 'Revive Wellness',
      email: 'john@revivewellness.com',
      businessType: 'Weight Loss',
      status: 'Launched',
      joinedOn: '2024-05-12',
      platformStatus: 'Live',
      commissionEligible: true
    },
    {
      id: 2,
      merchantName: 'Vitality Clinic',
      email: 'info@vitalityclinic.com',
      businessType: 'General Wellness',
      status: 'In Progress',
      joinedOn: '2024-06-08',
      platformStatus: 'Setup',
      commissionEligible: false
    },
    {
      id: 3,
      merchantName: 'Healthy Life Center',
      email: 'contact@healthylife.com',
      businessType: 'Medical Weight Loss',
      status: 'Invited',
      joinedOn: '2024-06-15',
      platformStatus: 'Pending',
      commissionEligible: false
    },
    {
      id: 4,
      merchantName: 'Wellness Hub',
      email: 'team@wellnesshub.com',
      businessType: 'Fitness',
      status: 'Disqualified',
      joinedOn: '2024-04-20',
      platformStatus: 'Rejected',
      commissionEligible: false
    }
  ]);

  const copyReferralLink = () => {
    const link = `https://setup.hyrhealth.com/onboard?ref=${affiliate.referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard.',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Launched':
      case 'Live':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'In Progress':
      case 'Setup':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Disqualified':
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Launched':
      case 'Live':
        return 'default';
      case 'In Progress':
      case 'Setup':
        return 'secondary';
      case 'Disqualified':
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Affiliates
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{affiliate.name}</h1>
            <p className="text-gray-600">Affiliate Details & Performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Affiliate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{affiliate.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{affiliate.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{affiliate.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Joined Date</p>
              <p className="font-medium">{new Date(affiliate.joinedDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant={affiliate.status === 'Active' ? 'default' : 'secondary'}>
                {affiliate.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Default Commission</p>
              <p className="font-medium">{affiliate.defaultCommission}%</p>
            </div>
          </CardContent>
        </Card>

        {/* Referral Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Referral Code</p>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {affiliate.referralCode}
                </code>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyReferralLink}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Referral Link</p>
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all">
                  https://setup.hyrhealth.com/onboard?ref={affiliate.referralCode}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Total Referrals</span>
                </div>
                <span className="font-semibold">{affiliate.totalReferrals}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Total Earnings</span>
                </div>
                <span className="font-semibold">${affiliate.totalEarnings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Paid Out</span>
                </div>
                <span className="font-semibold">${affiliate.totalPaidOut.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="font-semibold">${affiliate.pendingEarnings.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${affiliate.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid Out</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${affiliate.totalPaidOut.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Last payment: June 15, 2024
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${affiliate.pendingEarnings.toLocaleString()}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Button size="sm">
                Mark as Paid
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referred Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referred Leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined On</TableHead>
                <TableHead>Platform Status</TableHead>
                <TableHead>Commission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.merchantName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.businessType}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(lead.status)}
                      <Badge variant={getStatusVariant(lead.status)}>
                        {lead.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(lead.joinedOn).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(lead.platformStatus)}
                      <Badge variant={getStatusVariant(lead.platformStatus)}>
                        {lead.platformStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.commissionEligible ? 'default' : 'secondary'}>
                      {lead.commissionEligible ? 'Eligible' : 'Not Eligible'}
                    </Badge>
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