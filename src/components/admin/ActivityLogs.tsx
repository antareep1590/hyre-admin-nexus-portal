
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Activity, Search, Download, Filter, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ActivityLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [merchantFilter, setMerchantFilter] = useState('all');
  const [activityFilter, setActivityFilter] = useState('all');

  const activities = [
    {
      id: 1,
      merchant: 'Revive Clinic',
      action: 'Updated intake form',
      details: 'Modified "General Health Assessment" form - added 3 new questions',
      timestamp: '2024-06-20 14:30:22',
      type: 'form_update',
      user: 'admin@reviveclinic.com',
    },
    {
      id: 2,
      merchant: 'FitLife Gym',
      action: 'Product created',
      details: 'Added new product "Personal Training Session" - $89',
      timestamp: '2024-06-20 13:45:10',
      type: 'product_update',
      user: 'owner@fitlifegym.com',
    },
    {
      id: 3,
      merchant: 'WellSpace Therapy',
      action: 'Payout requested',
      details: 'Requested payout of $3,120 - available balance',
      timestamp: '2024-06-20 12:15:33',
      type: 'payout_request',
      user: 'info@wellspace.com',
    },
    {
      id: 4,
      merchant: 'Peak Performance',
      action: 'User login',
      details: 'Admin user logged in from IP 192.168.1.100',
      timestamp: '2024-06-20 11:22:45',
      type: 'user_login',
      user: 'admin@peakperformance.com',
    },
    {
      id: 5,
      merchant: 'Revive Clinic',
      action: 'Template updated',
      details: 'Modified landing page template - updated hero section',
      timestamp: '2024-06-20 10:30:12',
      type: 'template_update',
      user: 'admin@reviveclinic.com',
    },
    {
      id: 6,
      merchant: 'FitLife Gym',
      action: 'Domain verified',
      details: 'Custom domain fitlife.com successfully verified',
      timestamp: '2024-06-20 09:45:28',
      type: 'domain_update',
      user: 'system',
    },
  ];

  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      form_update: '📝',
      product_update: '🛍️',
      payout_request: '💰',
      user_login: '🔐',
      template_update: '🎨',
      domain_update: '🌐',
    };
    return icons[type] || '📋';
  };

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      form_update: 'bg-blue-100 text-blue-800',
      product_update: 'bg-green-100 text-green-800',
      payout_request: 'bg-yellow-100 text-yellow-800',
      user_login: 'bg-purple-100 text-purple-800',
      template_update: 'bg-pink-100 text-pink-800',
      domain_update: 'bg-indigo-100 text-indigo-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMerchant = merchantFilter === 'all' || activity.merchant === merchantFilter;
    const matchesType = activityFilter === 'all' || activity.type === activityFilter;
    
    return matchesSearch && matchesMerchant && matchesType;
  });

  const exportLogs = () => {
    console.log('Exporting activity logs...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Merchant Activity Logs</h1>
          <p className="text-gray-600">Monitor all merchant actions and system events</p>
        </div>
        <Button variant="outline" onClick={exportLogs}>
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Activity Timeline
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={merchantFilter} onValueChange={setMerchantFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by merchant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Merchants</SelectItem>
                  <SelectItem value="Revive Clinic">Revive Clinic</SelectItem>
                  <SelectItem value="FitLife Gym">FitLife Gym</SelectItem>
                  <SelectItem value="WellSpace Therapy">WellSpace Therapy</SelectItem>
                  <SelectItem value="Peak Performance">Peak Performance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={activityFilter} onValueChange={setActivityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="form_update">Form Updates</SelectItem>
                  <SelectItem value="product_update">Product Updates</SelectItem>
                  <SelectItem value="payout_request">Payout Requests</SelectItem>
                  <SelectItem value="user_login">User Logins</SelectItem>
                  <SelectItem value="template_update">Template Updates</SelectItem>
                  <SelectItem value="domain_update">Domain Updates</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{activity.merchant}</span>
                        <Badge variant="outline" className={getActivityColor(activity.type)}>
                          {activity.action}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{activity.details}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {activity.timestamp}
                        </span>
                        <span>User: {activity.user}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No activities found matching your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
