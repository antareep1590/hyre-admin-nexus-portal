
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Copy, ExternalLink, Edit, Save, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MerchantDetailsProps {
  merchantId: number | null;
  onBack: () => void;
}

export const MerchantDetails: React.FC<MerchantDetailsProps> = ({ merchantId, onBack }) => {
  const [editingCommission, setEditingCommission] = useState(false);
  const [commissionRate, setCommissionRate] = useState('15');
  const [editingMerchantId, setEditingMerchantId] = useState(false);
  const [merchantIdValue, setMerchantIdValue] = useState('MER-001-2024');
  const [editingApiKey, setEditingApiKey] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState('sk_live_xxxxxxxxxxxxxxxxxxxx');

  // Mock merchant data
  const merchant = {
    id: merchantId,
    name: 'Revive Clinic',
    email: 'admin@reviveclinic.com',
    businessType: 'Weight Loss',
    createdDate: '2024-01-15',
    status: 'active',
    subscriptionPlan: 'Active - $997',
    commissionRate: '15%',
    platformLaunchDate: '2024-01-20',
    subdomain: 'revive.hyrehealth.com',
    customDomain: 'reviveclinic.com',
    dnsStatus: 'verified',
    sslStatus: 'active',
    merchantPortalUrl: 'https://revive.hyrehealth.com/admin',
    patientPortalUrl: 'https://revive.hyrehealth.com',
    ecommerceUrl: 'https://revive.hyrehealth.com/shop',
    lastActive: '2 hours ago',
    totalRevenue: '$12,450'
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  const handleOpenInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  const handleSaveCommission = () => {
    console.log('Saving commission rate:', commissionRate);
    setEditingCommission(false);
  };

  const handleSaveMerchantId = () => {
    console.log('Saving merchant ID:', merchantIdValue);
    setEditingMerchantId(false);
  };

  const handleSaveApiKey = () => {
    console.log('Saving API key:', apiKeyValue);
    setEditingApiKey(false);
  };

  if (!merchant) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Merchants
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Merchant not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Merchants
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{merchant.name}</h1>
            <p className="text-gray-600">Merchant Details & Configuration</p>
          </div>
        </div>
        <Badge 
          variant={merchant.status === 'active' ? 'default' : 'secondary'}
          className={merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        >
          {merchant.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Merchant Name</label>
              <p className="text-gray-900">{merchant.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{merchant.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Business Type</label>
              <p className="text-gray-900">{merchant.businessType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Created Date</label>
              <p className="text-gray-900">{merchant.createdDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Last Active</label>
              <p className="text-gray-900">{merchant.lastActive}</p>
            </div>
          </CardContent>
        </Card>

        {/* Platform Info */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Subscription Plan</label>
              <p className="text-gray-900">{merchant.subscriptionPlan}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Commission Rate</label>
              {editingCommission ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="w-20"
                  />
                  <span className="text-gray-700">%</span>
                  <Button size="sm" onClick={handleSaveCommission}>
                    <Save className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingCommission(false)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="text-gray-900">{merchant.commissionRate}</p>
                  <Button variant="ghost" size="sm" onClick={() => setEditingCommission(true)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Platform Launch Date</label>
              <p className="text-gray-900">{merchant.platformLaunchDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Total Revenue</label>
              <p className="text-gray-900 font-semibold">{merchant.totalRevenue}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Merchant ID (M-ID)</label>
              {editingMerchantId ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={merchantIdValue}
                    onChange={(e) => setMerchantIdValue(e.target.value)}
                    className="w-40"
                    placeholder="MER-001-2024"
                  />
                  <Button size="sm" onClick={handleSaveMerchantId}>
                    <Save className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingMerchantId(false)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="text-gray-900 font-mono">{merchantIdValue}</p>
                  <Button variant="ghost" size="sm" onClick={() => setEditingMerchantId(true)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">API Key</label>
              {editingApiKey ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={apiKeyValue}
                    onChange={(e) => setApiKeyValue(e.target.value)}
                    className="w-60"
                    placeholder="sk_live_xxxxxxxxxxxxxxxxxxxx"
                  />
                  <Button size="sm" onClick={handleSaveApiKey}>
                    <Save className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingApiKey(false)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="text-gray-900 font-mono">{apiKeyValue.substring(0, 12)}*********************</p>
                  <Button variant="ghost" size="sm" onClick={() => setEditingApiKey(true)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Info */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Subdomain</label>
              <p className="text-gray-900 font-mono">{merchant.subdomain}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Custom Domain</label>
              <p className="text-gray-900 font-mono">{merchant.customDomain}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">DNS Status</label>
              <Badge className="bg-green-100 text-green-800">{merchant.dnsStatus}</Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">SSL Status</label>
              <Badge className="bg-green-100 text-green-800">{merchant.sslStatus}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Platform Links */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Merchant Portal</p>
                <p className="text-sm text-gray-600 font-mono">{merchant.merchantPortalUrl}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyToClipboard(merchant.merchantPortalUrl)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenInNewTab(merchant.merchantPortalUrl)}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Patient Portal</p>
                <p className="text-sm text-gray-600 font-mono">{merchant.patientPortalUrl}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyToClipboard(merchant.patientPortalUrl)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenInNewTab(merchant.patientPortalUrl)}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">E-commerce Storefront</p>
                <p className="text-sm text-gray-600 font-mono">{merchant.ecommerceUrl}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyToClipboard(merchant.ecommerceUrl)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenInNewTab(merchant.ecommerceUrl)}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
