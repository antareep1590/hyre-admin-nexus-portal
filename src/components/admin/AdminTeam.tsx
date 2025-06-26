
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserCog, Plus, Edit, Shield, Eye } from 'lucide-react';
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

export const AdminTeam: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@hyrehealth.com',
      role: 'Owner',
      status: 'Active',
      createdDate: '2024-01-10',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@hyrehealth.com',
      role: 'Admin',
      status: 'Active',
      createdDate: '2024-02-15',
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike@hyrehealth.com',
      role: 'Read-Only',
      status: 'Inactive',
      createdDate: '2024-03-20',
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
  });

  const handleAddAdmin = () => {
    console.log('Adding new admin:', newUser);
    setIsAddModalOpen(false);
    setNewUser({ name: '', email: '', role: '', status: 'Active' });
  };

  const handleEditUser = (userId: number) => {
    setEditingUser(userId);
    console.log('Editing user:', userId);
  };

  const handleToggleStatus = (userId: number) => {
    setAdminUsers(users => 
      users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Owner':
        return <Shield className="w-4 h-4 text-purple-600" />;
      case 'Admin':
        return <UserCog className="w-4 h-4 text-blue-600" />;
      case 'Read-Only':
        return <Eye className="w-4 h-4 text-gray-600" />;
      default:
        return <UserCog className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'bg-purple-100 text-purple-800';
      case 'Admin':
        return 'bg-blue-100 text-blue-800';
      case 'Read-Only':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Team</h1>
          <p className="text-gray-600">Manage admin users and their permissions</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Admin User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="admin@hyrehealth.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => setNewUser({...newUser, role: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Read-Only">Read-Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newUser.status === 'Active'}
                  onCheckedChange={(checked) => 
                    setNewUser({...newUser, status: checked ? 'Active' : 'Inactive'})
                  }
                />
                <Label htmlFor="active">Activate immediately</Label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAdmin} className="bg-blue-600 hover:bg-blue-700">
                  Add Admin
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
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
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(user.role)}
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                        className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{user.createdDate}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user.id)}
                          disabled={user.role === 'Owner'}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Switch
                          checked={user.status === 'Active'}
                          onCheckedChange={() => handleToggleStatus(user.id)}
                          disabled={user.role === 'Owner'}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Owner</h4>
              </div>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Full platform access</li>
                <li>• Manage all users</li>
                <li>• Billing & subscription control</li>
                <li>• Delete/modify any data</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <UserCog className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Admin</h4>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Manage merchants</li>
                <li>• Process payouts</li>
                <li>• View reports</li>
                <li>• Cannot delete users or billing</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">Read-Only</h4>
              </div>
              <ul className="text-sm text-gray-800 space-y-1">
                <li>• View-only access</li>
                <li>• No editing permissions</li>
                <li>• Access to reports</li>
                <li>• Cannot modify any data</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
