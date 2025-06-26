
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Settings, Users, Percent, Save, Plus, Edit, Trash2 } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const PlatformSettings: React.FC = () => {
  const [defaultCommission, setDefaultCommission] = useState('15');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoPayouts, setAutoPayouts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const adminUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@hyrehealth.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-06-20 14:30',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@hyrehealth.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-06-19 16:45',
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike@hyrehealth.com',
      role: 'Support',
      status: 'inactive',
      lastLogin: '2024-06-15 09:20',
    },
  ];

  const roles = [
    {
      id: 1,
      name: 'Super Admin',
      permissions: ['all'],
      userCount: 1,
    },
    {
      id: 2,
      name: 'Admin',
      permissions: ['merchant_management', 'billing', 'support'],
      userCount: 3,
    },
    {
      id: 3,
      name: 'Support',
      permissions: ['support', 'compliance'],
      userCount: 2,
    },
  ];

  const handleSaveSettings = () => {
    console.log('Saving platform settings:', {
      defaultCommission,
      maintenanceMode,
      autoPayouts,
      emailNotifications,
    });
  };

  const handleCreateUser = () => {
    console.log('Creating new admin user');
  };

  const handleEditUser = (userId: number) => {
    console.log('Editing user:', userId);
  };

  const handleDeleteUser = (userId: number) => {
    console.log('Deleting user:', userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600">Configure global platform settings and admin access</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="users">Admin Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="w-5 h-5 mr-2" />
                  Commission Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Default Commission Rate (%)</label>
                  <Input
                    type="number"
                    value={defaultCommission}
                    onChange={(e) => setDefaultCommission(e.target.value)}
                    className="mt-1"
                    placeholder="15"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This rate applies to new merchants by default
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Auto-calculate Payouts</p>
                    <p className="text-xs text-gray-500">Automatically calculate merchant payouts</p>
                  </div>
                  <Switch
                    checked={autoPayouts}
                    onCheckedChange={setAutoPayouts}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Per-Merchant Overrides</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Revive Clinic:</span>
                      <span className="font-medium">12% (Custom)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FitLife Gym:</span>
                      <span className="text-gray-500">15% (Default)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Platform Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
                    <p className="text-xs text-gray-500">Temporarily disable merchant access</p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                    <p className="text-xs text-gray-500">Send system notifications to admins</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">System Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">API Status:</span>
                      <Badge className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Database:</span>
                      <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Payment Gateway:</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Admin Users
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Admin User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Admin User</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <Input placeholder="John Doe" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input type="email" placeholder="john@hyrehealth.com" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Role</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleCreateUser} className="bg-blue-600 hover:bg-blue-700">
                          Create User
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600 text-sm">{user.lastLogin}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            {user.role !== 'Super Admin' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
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
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Roles & Permissions</CardTitle>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <Card key={role.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">{role.name}</h3>
                        <Badge variant="outline">{role.userCount} users</Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-xs font-medium text-gray-600">PERMISSIONS:</p>
                        <div className="space-y-1">
                          {role.permissions.map((permission, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                              {permission === 'all' ? 'All Permissions' : 
                               permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        {role.name !== 'Super Admin' && (
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
