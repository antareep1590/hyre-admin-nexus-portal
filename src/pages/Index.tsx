
import React, { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { TopNavigation } from '@/components/admin/TopNavigation';
import { Dashboard } from '@/components/admin/Dashboard';
import { MerchantManagement } from '@/components/admin/MerchantManagement';
import { SubscriptionPlan } from '@/components/admin/SubscriptionPlan';
import { Payouts } from '@/components/admin/Payouts';
import { DomainBranding } from '@/components/admin/DomainBranding';
import { TemplateLibrary } from '@/components/admin/TemplateLibrary';
import { ActivityLogs } from '@/components/admin/ActivityLogs';
import { SupportBroadcasts } from '@/components/admin/SupportBroadcasts';
import { ComplianceCenter } from '@/components/admin/ComplianceCenter';
import { PlatformSettings } from '@/components/admin/PlatformSettings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'merchants':
        return <MerchantManagement />;
      case 'subscription':
        return <SubscriptionPlan />;
      case 'payouts':
        return <Payouts />;
      case 'domains':
        return <DomainBranding />;
      case 'templates':
        return <TemplateLibrary />;
      case 'activity':
        return <ActivityLogs />;
      case 'support':
        return <SupportBroadcasts />;
      case 'compliance':
        return <ComplianceCenter />;
      case 'settings':
        return <PlatformSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <TopNavigation />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
