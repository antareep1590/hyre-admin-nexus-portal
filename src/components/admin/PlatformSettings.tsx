
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Percent } from 'lucide-react';

export const PlatformSettings: React.FC = () => {
  const [globalCommission, setGlobalCommission] = useState('15');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveSettings = () => {
    console.log('Saving global commission rate:', globalCommission);
    setIsEditing(false);
    // Here you would typically make an API call to save the settings
  };

  const handleEditCommission = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setGlobalCommission('15'); // Reset to original value
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600">Manage global platform configuration</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Percent className="w-5 h-5 mr-2 text-blue-600" />
            Global Commission Rate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Commission Percentage
            </label>
            <p className="text-xs text-gray-500 mb-3">
              This rate will be applied to all new merchants by default. Existing merchant rates can be adjusted individually.
            </p>
            
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={globalCommission}
                    onChange={(e) => setGlobalCommission(e.target.value)}
                    className="w-24"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="text-gray-700">%</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveSettings}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-3xl font-bold text-gray-900">
                  {globalCommission}%
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleEditCommission}
                >
                  Edit Commission Rate
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">How Commission Rates Work</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• New merchants automatically receive the global commission rate</li>
                <li>• Individual merchant rates can be adjusted from their detail pages</li>
                <li>• Rate changes apply to future transactions only</li>
                <li>• All commission changes are logged for audit purposes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
