
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Search, Upload, Download, AlertTriangle } from 'lucide-react';
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

export const ComplianceCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const complianceData = [
    {
      id: 1,
      merchant: 'Revive Clinic',
      email: 'admin@reviveclinic.com',
      termsConditions: {
        status: 'complete',
        uploadDate: '2024-05-15',
        expiryDate: '2025-05-15',
      },
      privacyPolicy: {
        status: 'complete',
        uploadDate: '2024-05-15',
        expiryDate: '2025-05-15',
      },
      hipaaDocuments: {
        status: 'complete',
        uploadDate: '2024-05-20',
        expiryDate: '2025-05-20',
      },
    },
    {
      id: 2,
      merchant: 'FitLife Gym',
      email: 'owner@fitlifegym.com',
      termsConditions: {
        status: 'complete',
        uploadDate: '2024-06-01',
        expiryDate: '2025-06-01',
      },
      privacyPolicy: {
        status: 'missing',
        uploadDate: null,
        expiryDate: null,
      },
      hipaaDocuments: {
        status: 'expired',
        uploadDate: '2023-06-01',
        expiryDate: '2024-06-01',
      },
    },
    {
      id: 3,
      merchant: 'WellSpace Therapy',
      email: 'info@wellspace.com',
      termsConditions: {
        status: 'expired',
        uploadDate: '2023-03-10',
        expiryDate: '2024-03-10',
      },
      privacyPolicy: {
        status: 'complete',
        uploadDate: '2024-06-10',
        expiryDate: '2025-06-10',
      },
      hipaaDocuments: {
        status: 'complete',
        uploadDate: '2024-06-12',
        expiryDate: '2025-06-12',
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return '✅';
      case 'missing':
        return '❌';
      case 'expired':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const handleUploadDocument = (merchantId: number, documentType: string) => {
    console.log('Uploading document:', merchantId, documentType);
  };

  const handleSetReminder = (merchantId: number, documentType: string) => {
    console.log('Setting reminder for:', merchantId, documentType);
  };

  const filteredData = complianceData.filter(item => {
    const matchesSearch = item.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    
    const hasStatus = Object.values([item.termsConditions, item.privacyPolicy, item.hipaaDocuments])
      .some(doc => doc.status === statusFilter);
    return matchesSearch && hasStatus;
  });

  const getComplianceScore = (merchant: any) => {
    const documents = [merchant.termsConditions, merchant.privacyPolicy, merchant.hipaaDocuments];
    const completeCount = documents.filter(doc => doc.status === 'complete').length;
    return Math.round((completeCount / documents.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Center</h1>
          <p className="text-gray-600">Monitor merchant compliance documents and requirements</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Merchants</CardTitle>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">127</div>
            <p className="text-xs text-gray-500 mt-1">monitored for compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Fully Compliant</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89</div>
            <p className="text-xs text-gray-500 mt-1">70% compliance rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Expired Documents</CardTitle>
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <p className="text-xs text-gray-500 mt-1">need renewal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Missing Documents</CardTitle>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">26</div>
            <p className="text-xs text-gray-500 mt-1">require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Compliance Status</CardTitle>
            <div className="flex items-center space-x-2">
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
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Compliance Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Terms & Conditions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Privacy Policy</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">HIPAA Documents</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((merchant) => {
                  const score = getComplianceScore(merchant);
                  return (
                    <tr key={merchant.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{merchant.merchant}</p>
                          <p className="text-sm text-gray-500">{merchant.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-lg font-bold text-gray-900">{score}%</div>
                          <div className={`w-2 h-2 rounded-full ${
                            score === 100 ? 'bg-green-500' : 
                            score >= 66 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span>{getStatusIcon(merchant.termsConditions.status)}</span>
                          <Badge variant="outline" className={getStatusColor(merchant.termsConditions.status)}>
                            {merchant.termsConditions.status}
                          </Badge>
                          {merchant.termsConditions.expiryDate && (
                            <span className="text-xs text-gray-500">
                              Expires: {merchant.termsConditions.expiryDate}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span>{getStatusIcon(merchant.privacyPolicy.status)}</span>
                          <Badge variant="outline" className={getStatusColor(merchant.privacyPolicy.status)}>
                            {merchant.privacyPolicy.status}
                          </Badge>
                          {merchant.privacyPolicy.expiryDate && (
                            <span className="text-xs text-gray-500">
                              Expires: {merchant.privacyPolicy.expiryDate}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span>{getStatusIcon(merchant.hipaaDocuments.status)}</span>
                          <Badge variant="outline" className={getStatusColor(merchant.hipaaDocuments.status)}>
                            {merchant.hipaaDocuments.status}
                          </Badge>
                          {merchant.hipaaDocuments.expiryDate && (
                            <span className="text-xs text-gray-500">
                              Expires: {merchant.hipaaDocuments.expiryDate}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Upload className="w-3 h-3 mr-1" />
                                Upload
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Upload Document - {merchant.merchant}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Document Type</label>
                                  <Select>
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Select document type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="terms">Terms & Conditions</SelectItem>
                                      <SelectItem value="privacy">Privacy Policy</SelectItem>
                                      <SelectItem value="hipaa">HIPAA Documents</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">File</label>
                                  <Input type="file" className="mt-1" />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                                  <Input type="date" className="mt-1" />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button 
                                    onClick={() => handleUploadDocument(merchant.id, 'terms')}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Upload Document
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetReminder(merchant.id, 'expiry')}
                          >
                            Set Reminder
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
