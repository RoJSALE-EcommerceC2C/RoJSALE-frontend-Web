
'use client';

import {
    CircleUser,
    Menu,
    Bell,
    ChevronDown,
  } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import { useSidebar } from './ui/sidebar';
  import React, { useState, useEffect } from 'react';
  import { Calendar } from './ui/calendar';
  import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
  
  export function DashboardHeader() {
    const { toggleSidebar } = useSidebar();
    const [currentTime, setCurrentTime] = useState('');
  
    useEffect(() => {
      const timer = setInterval(() => {
        const date = new Date();
        setCurrentTime(
          date.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        );
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
    return (
      <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
  
        <div className="flex items-center gap-1 sm:gap-3 ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="text-primary hidden sm:flex">
                {currentTime}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
  
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-primary" />
                <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-accent" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New user registered</DropdownMenuItem>
              <DropdownMenuItem>Ad requires approval</DropdownMenuItem>
              <DropdownMenuItem>Payment received</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
  
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-primary">
                RoJSALE
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }
