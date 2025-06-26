
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Filter, Download, CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const Payouts: React.FC = () => {
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [note, setNote] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const payouts = [
    {
      id: 1,
      merchant: 'Revive Clinic',
      availableBalance: '$2,450',
      lastPayout: '$1,200',
      lastPayoutDate: '2024-05-15',
      requestStatus: 'pending',
      requestDate: '2024-06-20',
      totalEarnings: '$12,450',
    },
    {
      id: 2,
      merchant: 'FitLife Gym',
      availableBalance: '$1,890',
      lastPayout: '$2,100',
      lastPayoutDate: '2024-06-10',
      requestStatus: 'paid',
      requestDate: '2024-06-18',
      totalEarnings: '$8,920',
    },
    {
      id: 3,
      merchant: 'WellSpace Therapy',
      availableBalance: '$3,120',
      lastPayout: '$950',
      lastPayoutDate: '2024-05-28',
      requestStatus: 'pending',
      requestDate: '2024-06-19',
      totalEarnings: '$5,670',
    },
    {
      id: 4,
      merchant: 'Peak Performance',
      availableBalance: '$1,560',
      lastPayout: '$1,800',
      lastPayoutDate: '2024-06-01',
      requestStatus: 'paid',
      requestDate: '2024-06-15',
      totalEarnings: '$7,890',
    },
  ];

  const handleProcessPayout = (payoutId: number) => {
    console.log('Processing payout:', payoutId, 'with note:', note);
    setSelectedPayout(null);
    setNote('');
  };

  const filteredPayouts = payouts.filter(payout => 
    statusFilter === 'all' || payout.requestStatus === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
          <p className="text-gray-600">Manage merchant payout requests and balances</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Payouts
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Pending
            </CardTitle>
            <DollarSign className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$5,570</div>
            <p className="text-xs text-gray-500 mt-1">2 pending requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Paid This Month
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$8,350</div>
            <p className="text-xs text-gray-500 mt-1">12 payouts processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Payout
            </CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$1,560</div>
            <p className="text-xs text-gray-500 mt-1">per merchant</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payout Requests</CardTitle>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Available Balance</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Last Payout</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Request Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Request Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayouts.map((payout) => (
                  <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{payout.merchant}</p>
                        <p className="text-sm text-gray-500">Total: {payout.totalEarnings}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-green-600">{payout.availableBalance}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{payout.lastPayout}</p>
                        <p className="text-xs text-gray-500">{payout.lastPayoutDate}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={payout.requestStatus === 'paid' ? 'default' : 'secondary'}
                        className={payout.requestStatus === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {payout.requestStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{payout.requestDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      {payout.requestStatus === 'pending' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPayout(payout)}
                            >
                              Process Payout
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Process Payout - {selectedPayout?.merchant}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">Amount to Pay:</span>
                                  <span className="font-bold text-green-600">{selectedPayout?.availableBalance}</span>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700">Note (Optional)</label>
                                <Textarea
                                  placeholder="Add any notes about this payout..."
                                  value={note}
                                  onChange={(e) => setNote(e.target.value)}
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setSelectedPayout(null)}>
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={() => handleProcessPayout(selectedPayout?.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Mark as Paid
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
