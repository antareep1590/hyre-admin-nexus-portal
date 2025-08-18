import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DollarSign, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Receipt,
  Calendar,
  Search
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Transaction {
  id: string;
  date: string;
  transactionId: string;
  merchantName: string;
  customerName: string;
  customerEmail: string;
  transactionType: 'Purchase' | 'Refund' | 'Upcharge' | 'Payout';
  amount: number;
  paymentMethod: string;
  status: 'Successful' | 'Pending' | 'Failed';
  notes?: string;
}

export const Transactions: React.FC = () => {
  const [merchantFilter, setMerchantFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-20',
      transactionId: 'TXN-2024-001',
      merchantName: 'Revive Clinic',
      customerName: 'John Doe',
      customerEmail: 'john.doe@email.com',
      transactionType: 'Purchase',
      amount: 199.99,
      paymentMethod: 'Credit Card',
      status: 'Successful',
      notes: 'Weight management consultation'
    },
    {
      id: '2',
      date: '2024-01-19',
      transactionId: 'TXN-2024-002',
      merchantName: 'FitLife Gym',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@email.com',
      transactionType: 'Refund',
      amount: -89.99,
      paymentMethod: 'Credit Card',
      status: 'Successful',
      notes: 'Customer requested refund for wellness supplement'
    },
    {
      id: '3',
      date: '2024-01-18',
      transactionId: 'PAY-2024-001',
      merchantName: 'WellSpace Therapy',
      customerName: 'System',
      customerEmail: 'system@platform.com',
      transactionType: 'Payout',
      amount: -2450.00,
      paymentMethod: 'Bank Transfer',
      status: 'Successful',
      notes: 'Monthly payout - Batch ID: PAY001'
    },
    {
      id: '4',
      date: '2024-01-17',
      transactionId: 'TXN-2024-003',
      merchantName: 'Peak Performance',
      customerName: 'Mike Johnson',
      customerEmail: 'mike.j@email.com',
      transactionType: 'Upcharge',
      amount: 49.99,
      paymentMethod: 'Credit Card',
      status: 'Pending',
      notes: 'Additional premium features'
    },
    {
      id: '5',
      date: '2024-01-16',
      transactionId: 'TXN-2024-004',
      merchantName: 'Revive Clinic',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah.w@email.com',
      transactionType: 'Purchase',
      amount: 299.99,
      paymentMethod: 'Credit Card',
      status: 'Failed',
      notes: 'Payment declined'
    }
  ];

  const merchants = ['Revive Clinic', 'FitLife Gym', 'WellSpace Therapy', 'Peak Performance'];

  // Calculate KPIs
  const totalTransactions = transactions.length;
  const totalTransactionValue = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalRevenue = transactions
    .filter(t => ['Purchase', 'Upcharge'].includes(t.transactionType) && t.status === 'Successful')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalRefunds = transactions
    .filter(t => t.transactionType === 'Refund')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const refundCount = transactions.filter(t => t.transactionType === 'Refund').length;
  const totalPayouts = transactions
    .filter(t => t.transactionType === 'Payout')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesMerchant = merchantFilter === 'all' || transaction.merchantName === merchantFilter;
    const matchesType = typeFilter === 'all' || transaction.transactionType === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesSearch = !searchTerm || 
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesMerchant && matchesType && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Purchase':
        return 'bg-blue-100 text-blue-800';
      case 'Upcharge':
        return 'bg-purple-100 text-purple-800';
      case 'Refund':
        return 'bg-orange-100 text-orange-800';
      case 'Payout':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExport = () => {
    console.log('Exporting transactions with current filters...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Monitor all financial activities across the platform</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Transactions
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Transactions
            </CardTitle>
            <Receipt className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalTransactions}</div>
            <p className="text-xs text-gray-500 mt-1">${totalTransactionValue.toLocaleString()} total value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">from purchases & upcharges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Refunds
            </CardTitle>
            <TrendingDown className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalRefunds.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">{refundCount} refunded transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Payouts
            </CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${totalPayouts.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">paid to merchants</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4">
            <CardTitle>Transaction History</CardTitle>
            
            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by transaction ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Merchant Filter */}
              <Select value={merchantFilter} onValueChange={setMerchantFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Merchants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Merchants</SelectItem>
                  {merchants.map(merchant => (
                    <SelectItem key={merchant} value={merchant}>{merchant}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Purchase">Purchase</SelectItem>
                  <SelectItem value="Refund">Refund</SelectItem>
                  <SelectItem value="Upcharge">Upcharge</SelectItem>
                  <SelectItem value="Payout">Payout</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Successful">Successful</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Merchant</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Payment Method</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Notes</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        {transaction.transactionId}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {transaction.merchantName}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.customerName}</p>
                        <p className="text-xs text-gray-500">{transaction.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getTypeColor(transaction.transactionType)}>
                        {transaction.transactionType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span 
                        className={`font-medium ${
                          transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.amount >= 0 ? '+' : ''}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {transaction.paymentMethod}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-48">
                      <span className="truncate block" title={transaction.notes}>
                        {transaction.notes || '-'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {/* Refund button for successful Purchase/Upcharge transactions */}
                        {['Purchase', 'Upcharge'].includes(transaction.transactionType) && 
                         transaction.status === 'Successful' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => console.log('Refund transaction:', transaction.id)}
                          >
                            Refund
                          </Button>
                        )}
                        
                        {/* Process payout button for pending payout transactions */}
                        {transaction.transactionType === 'Payout' && 
                         transaction.status === 'Pending' && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => console.log('Process payout:', transaction.id)}
                          >
                            Process Payout
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};