
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, ShoppingBag, Video, TrendingUp, TrendingDown } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Merchants',
      value: '127',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
    },
    {
      title: 'Monthly Revenue',
      value: '$84,429',
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      title: 'Product Sales',
      value: '2,431',
      change: '+15.3%',
      changeType: 'positive',
      icon: ShoppingBag,
    },
    {
      title: 'Active Consultations',
      value: '89',
      change: '-2.1%',
      changeType: 'negative',
      icon: Video,
    },
  ];

  const recentActivity = [
    {
      merchant: 'Revive Clinic',
      action: 'requested payout',
      amount: '$2,450',
      time: '2 hours ago',
      status: 'pending',
    },
    {
      merchant: 'FitLife Gym',
      action: 'launched new platform',
      amount: null,
      time: '4 hours ago',
      status: 'completed',
    },
    {
      merchant: 'WellSpace Therapy',
      action: 'updated intake forms',
      amount: null,
      time: '6 hours ago',
      status: 'completed',
    },
    {
      merchant: 'Peak Performance',
      action: 'domain verification',
      amount: null,
      time: '8 hours ago',
      status: 'pending',
    },
    {
      merchant: 'Mindful Medicine',
      action: 'subscription payment',
      amount: '$997',
      time: '1 day ago',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your platform performance and merchant activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 mt-1">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Merchant Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{activity.merchant}</span>
                      <span className="text-gray-600">{activity.action}</span>
                      {activity.amount && (
                        <span className="font-medium text-green-600">{activity.amount}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <Badge 
                    variant={activity.status === 'completed' ? 'default' : 'secondary'}
                    className={activity.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">📈</div>
                  <p className="text-gray-600">Revenue chart visualization</p>
                  <p className="text-sm text-gray-500">Integration with chart library</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">$84.4K</p>
                  <p className="text-sm text-gray-500">This Month</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">$77.8K</p>
                  <p className="text-sm text-gray-500">Last Month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
