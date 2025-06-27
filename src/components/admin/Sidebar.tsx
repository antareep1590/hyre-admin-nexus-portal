
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  DollarSign, 
  Globe, 
  FileText, 
  Activity, 
  MessageSquare, 
  ShieldCheck, 
  UserCog,
  ChevronLeft,
  ChevronRight,
  Building2,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'merchants', label: 'Merchant Management', icon: Users },
  { id: 'subscription', label: 'Subscription Plan', icon: CreditCard },
  { id: 'payouts', label: 'Payouts', icon: DollarSign },
  { id: 'domains', label: 'Domain & Branding', icon: Globe },
  { id: 'templates', label: 'Template Library', icon: FileText },
  { id: 'pharmacy', label: 'Pharmacy', icon: Building2 },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'activity', label: 'Activity Logs', icon: Activity },
  { id: 'support', label: 'Support & Broadcasts', icon: MessageSquare },
  { id: 'compliance', label: 'Compliance Center', icon: ShieldCheck },
  { id: 'admin-team', label: 'Admin Team', icon: UserCog },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-gray-900">Hyre Health</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn("w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
