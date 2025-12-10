'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  PlusCircle,
  Search,
  User,
  Calendar,
} from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ===============================
// 📄 INLINE MOCK TICKETS
// ===============================

type Ticket = {
  ticketId: string;
  subject: string;
  user: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  lastUpdate: string;
  description: string;
};

const MOCK_TICKETS: Ticket[] = [
  {
    ticketId: 'TKT-001',
    subject: 'Unable to post ad',
    user: 'Rajesh Kumar',
    status: 'Open',
    priority: 'High',
    lastUpdate: '2024-03-20',
    description: 'I am unable to post my ad. It shows an error whenever I click submit.',
  },
  {
    ticketId: 'TKT-002',
    subject: 'Payment not reflected',
    user: 'Priya Sharma',
    status: 'In Progress',
    priority: 'High',
    lastUpdate: '2024-03-19',
    description: 'I made a payment for a premium package but it does not appear in my account.',
  },
  {
    ticketId: 'TKT-003',
    subject: 'Account suspended wrongly',
    user: 'Amit Singh',
    status: 'Resolved',
    priority: 'Medium',
    lastUpdate: '2024-03-18',
    description: 'My account was suspended but I have not violated any policies.',
  },
  {
    ticketId: 'TKT-004',
    subject: 'Feature Request: Dark Mode',
    user: 'Sneha Patel',
    status: 'Open',
    priority: 'Low',
    lastUpdate: '2024-03-17',
    description: 'Please add dark mode. It would help in nighttime usage.',
  },
  {
    ticketId: 'TKT-005',
    subject: 'Spam ad reported',
    user: 'Vikash Gupta',
    status: 'Open',
    priority: 'High',
    lastUpdate: '2024-03-21',
    description: 'I found a spam ad that needs immediate review.',
  },
];

// =============================================
// 🎴 Ticket Card Component
// =============================================

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'Open':
      case 'In Progress':
        return <AlertTriangle className="h-5 w-5 text-accent" />;
      case 'Resolved':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getStatusIcon()}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-primary">{ticket.subject}</h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn({
                    'bg-accent text-accent-foreground': ticket.status === 'Open',
                    'bg-primary/10 text-primary border-primary/20': ticket.status === 'In Progress',
                    'bg-blue-100 text-blue-700 border-blue-200': ticket.status === 'Resolved',
                  })}
                >
                  {ticket.status}
                </Badge>

                {ticket.priority && (
                  <Badge
                    variant="outline"
                    className={cn({
                      'bg-primary text-primary-foreground': ticket.priority === 'High',
                      'bg-accent text-primary': ticket.priority === 'Medium',
                      'bg-blue-100 text-blue-700 border-blue-200': ticket.priority === 'Low',
                    })}
                  >
                    {ticket.priority}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-primary mb-2">
              <div className="flex items-center gap-1.5">
                <User className="h-3 w-3" />
                <span>{ticket.user}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>{new Date(ticket.lastUpdate).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-sm text-primary">{ticket.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ===============================================
// 📄 Main Support Tickets Page
// ===============================================

export default function SupportTicketsPage() {
  const openTickets = MOCK_TICKETS.filter((t) => t.status === 'Open').length;
  const inProgressTickets = MOCK_TICKETS.filter((t) => t.status === 'In Progress').length;
  const resolvedTickets = MOCK_TICKETS.filter((t) => t.status === 'Resolved').length;
  const highPriorityTickets = MOCK_TICKETS.filter((t) => t.priority === 'High').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader title="Support Tickets">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Open Tickets" value={openTickets.toString()} icon="AlertTriangle" />
        <StatCard title="In Progress" value={inProgressTickets.toString()} icon="Clock" />
        <StatCard title="Resolved" value={resolvedTickets.toString()} icon="CheckCircle" />
        <StatCard title="High Priority" value={highPriorityTickets.toString()} icon="ShieldAlert" />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <Input placeholder="Search tickets by title, user, or email..." className="pl-10" />
          </div>

          <Select>
            <SelectTrigger className="w-full sm:w-[180px] text-primary">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[180px] text-primary">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Ticket List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">
                Support Tickets ({MOCK_TICKETS.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_TICKETS.map((ticket) => (
                <TicketCard key={ticket.ticketId} ticket={ticket} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Ticket Preview Placeholder */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-primary">Select a Ticket</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <p className="text-primary">Select a ticket to view details</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
