
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit, DollarSign, Percent, CreditCard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const SubscriptionPlan: React.FC = () => {
  const [setupFee, setSetupFee] = useState('997');
  const [commissionRate, setCommissionRate] = useState('15');

  const merchants = [
    {
      id: 1,
      name: 'Revive Clinic',
      email: 'admin@reviveclinic.com',
      setupPaid: true,
      setupDate: '2024-01-15',
      monthlyCommission: '$245',
      lastPayment: '2024-06-20',
      status: 'active',
    },
    {
      id: 2,
      name: 'FitLife Gym',
      email: 'owner@fitlifegym.com',
      setupPaid: true,
      setupDate: '2024-02-20',
      monthlyCommission: '$180',
      lastPayment: '2024-06-18',
      status: 'active',
    },
    {
      id: 3,
      name: 'WellSpace Therapy',
      email: 'info@wellspace.com',
      setupPaid: false,
      setupDate: null,
      monthlyCommission: '$0',
      lastPayment: null,
      status: 'pending',
    },
  ];

  const handleUpdatePricing = () => {
    console.log('Updating pricing:', { setupFee, commissionRate });
  };

  const handleMarkPaid = (merchantId: number) => {
    console.log('Marking setup fee as paid for merchant:', merchantId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Plan</h1>
        <p className="text-gray-600">Manage platform pricing and merchant billing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Setup Fee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">${setupFee}</div>
            <p className="text-sm text-gray-600 mb-4">One-time platform setup fee</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Setup Fee</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Setup Fee ($)</label>
                    <Input
                      type="number"
                      value={setupFee}
                      onChange={(e) => setSetupFee(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleUpdatePricing} className="bg-blue-600 hover:bg-blue-700">
                      Update
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="w-5 h-5 mr-2 text-blue-600" />
              Commission Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">{commissionRate}%</div>
            <p className="text-sm text-gray-600 mb-4">Per transaction commission</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Commission Rate</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Commission Rate (%)</label>
                    <Input
                      type="number"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleUpdatePricing} className="bg-blue-600 hover:bg-blue-700">
                      Update
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
              Stripe Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mode</span>
                <Badge variant="outline">Live</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Webhooks</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Manage Stripe
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Merchant Payment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Setup Fee</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Monthly Commission</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {merchants.map((merchant) => (
                  <tr key={merchant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{merchant.name}</p>
                        <p className="text-sm text-gray-500">{merchant.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={merchant.setupPaid ? 'default' : 'secondary'}
                          className={merchant.setupPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {merchant.setupPaid ? 'Paid' : 'Pending'}
                        </Badge>
                        {merchant.setupDate && (
                          <span className="text-xs text-gray-500">{merchant.setupDate}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{merchant.monthlyCommission}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{merchant.lastPayment || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={merchant.status === 'active' ? 'default' : 'secondary'}
                        className={merchant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {merchant.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {!merchant.setupPaid && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkPaid(merchant.id)}
                        >
                          Mark as Paid
                        </Button>
                      )}
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
