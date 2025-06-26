
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, Upload, Search, Plus } from 'lucide-react';
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

export const SupportBroadcasts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSubject, setBroadcastSubject] = useState('');

  const tickets = [
    {
      id: 1,
      merchant: 'Revive Clinic',
      subject: 'Domain setup assistance needed',
      status: 'open',
      priority: 'high',
      created: '2024-06-20',
      lastReply: '2 hours ago',
      messages: 3,
    },
    {
      id: 2,
      merchant: 'FitLife Gym',
      subject: 'Payment processing question',
      status: 'resolved',
      priority: 'medium',
      created: '2024-06-19',
      lastReply: '1 day ago',
      messages: 5,
    },
    {
      id: 3,
      merchant: 'WellSpace Therapy',
      subject: 'Template customization help',
      status: 'escalated',
      priority: 'high',
      created: '2024-06-18',
      lastReply: '3 hours ago',
      messages: 8,
    },
  ];

  const guides = [
    {
      id: 1,
      title: 'Getting Started with Hyre Health',
      type: 'guide',
      uploadDate: '2024-06-15',
      downloads: 45,
    },
    {
      id: 2,
      title: 'Domain Setup Tutorial',
      type: 'video',
      uploadDate: '2024-06-10',
      downloads: 67,
    },
    {
      id: 3,
      title: 'Payment Configuration Guide',
      type: 'guide',
      uploadDate: '2024-06-08',
      downloads: 89,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'escalated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendBroadcast = () => {
    console.log('Sending broadcast:', { broadcastSubject, broadcastMessage });
    setBroadcastSubject('');
    setBroadcastMessage('');
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support & Broadcasts</h1>
          <p className="text-gray-600">Manage support tickets and send announcements to merchants</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Send Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <Input
                  placeholder="Enter announcement subject"
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <Textarea
                  placeholder="Write your announcement message..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="mt-1"
                  rows={6}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Recipients</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Merchants</SelectItem>
                    <SelectItem value="active">Active Merchants Only</SelectItem>
                    <SelectItem value="specific">Specific Merchants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Delivery Method</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Only</SelectItem>
                    <SelectItem value="sms">SMS Only</SelectItem>
                    <SelectItem value="both">Email + SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSendBroadcast} className="bg-blue-600 hover:bg-blue-700">
                  Send Announcement
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="resources">Resources & Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Support Tickets
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Merchant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Reply</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-900">{ticket.merchant}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{ticket.subject}</p>
                            <p className="text-xs text-gray-500">{ticket.messages} messages</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">{ticket.created}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">{ticket.lastReply}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewTicket(ticket)}
                          >
                            View Ticket
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resources & Guides</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload New Resource</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Resource Title</label>
                        <Input placeholder="Enter resource title" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Type</label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="guide">Guide/Tutorial</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="document">Document</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">File</label>
                        <Input type="file" className="mt-1" />
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">Upload</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {guides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900">{guide.title}</h3>
                        <Badge variant="outline">
                          {guide.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Uploaded: {guide.uploadDate}</p>
                        <p>Downloads: {guide.downloads}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Support Ticket - {selectedTicket.subject}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{selectedTicket.merchant}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Created: {selectedTicket.created}</p>
                <p className="text-sm text-gray-600">Last Reply: {selectedTicket.lastReply}</p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white border rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">Customer message:</p>
                  <p className="text-gray-900">We're having trouble setting up our custom domain. The DNS configuration seems correct but the verification is failing. Can you help us troubleshoot this issue?</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-600 mb-1">Internal note:</p>
                  <p className="text-blue-900">Customer has correctly configured CNAME record. Issue appears to be with SSL certificate provisioning. Escalating to technical team.</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Add Response</label>
                <Textarea
                  placeholder="Type your response..."
                  className="mt-1"
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                  Close
                </Button>
                <Button variant="outline">
                  Add Internal Note
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Send Response
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
