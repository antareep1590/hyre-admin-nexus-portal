
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Globe, Search, RefreshCw, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const DomainBranding: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const domains = [
    {
      id: 1,
      merchant: 'Revive Clinic',
      subdomain: 'revive.hyrehealth.com',
      customDomain: 'book.reviveclinic.com',
      dnsStatus: 'verified',
      sslStatus: 'active',
      lastChecked: '2 minutes ago',
    },
    {
      id: 2,
      merchant: 'FitLife Gym',
      subdomain: 'fitlife.hyrehealth.com',
      customDomain: null,
      dnsStatus: 'verified',
      sslStatus: 'active',
      lastChecked: '5 minutes ago',
    },
    {
      id: 3,
      merchant: 'WellSpace Therapy',
      subdomain: 'wellspace.hyrehealth.com',
      customDomain: 'therapy.wellspace.com',
      dnsStatus: 'pending',
      sslStatus: 'pending',
      lastChecked: '1 hour ago',
    },
    {
      id: 4,
      merchant: 'Peak Performance',
      subdomain: 'peak.hyrehealth.com',
      customDomain: 'booking.peakperformance.com',
      dnsStatus: 'failed',
      sslStatus: 'failed',
      lastChecked: '3 hours ago',
    },
  ];

  const handleRefreshDomain = (domainId: number) => {
    console.log('Refreshing domain status for:', domainId);
  };

  const handleManualOverride = (domainId: number) => {
    console.log('Manual override for domain:', domainId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Domain & Branding</h1>
          <p className="text-gray-600">Manage merchant domains and SSL certificates</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Domains</CardTitle>
            <Globe className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-gray-500 mt-1">8 custom domains</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Verified</CardTitle>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">9</div>
            <p className="text-xs text-gray-500 mt-1">75% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-xs text-gray-500 mt-1">awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed</CardTitle>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-gray-500 mt-1">needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Domain Management</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search domains..."
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Subdomain</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Custom Domain</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">DNS Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">SSL Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Checked</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain) => (
                  <tr key={domain.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{domain.merchant}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm text-blue-600">{domain.subdomain}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400 cursor-pointer hover:text-blue-600" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {domain.customDomain ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm text-purple-600">{domain.customDomain}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400 cursor-pointer hover:text-purple-600" />
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Not configured</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusColor(domain.dnsStatus)}>
                        {domain.dnsStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getStatusColor(domain.sslStatus)}>
                        {domain.sslStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600 text-sm">{domain.lastChecked}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRefreshDomain(domain.id)}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Refresh
                        </Button>
                        {(domain.dnsStatus === 'failed' || domain.sslStatus === 'failed') && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Override
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Manual Domain Override</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                  <p className="text-sm text-yellow-800">
                                    This will manually mark the domain as verified. Use only if you've confirmed the domain is working correctly.
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Domain</label>
                                  <Input value={domain.customDomain || domain.subdomain} disabled className="mt-1" />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button 
                                    onClick={() => handleManualOverride(domain.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Override Status
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
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
