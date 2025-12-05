
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, Lock } from 'lucide-react';

export function SecurityForm() {
  return (
    <Tabs defaultValue="authentication" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-muted">
        <TabsTrigger value="authentication">Authentication</TabsTrigger>
        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        <TabsTrigger value="firewall">Firewall</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="authentication">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary">Password Policy</h3>
              <p className="text-sm text-primary mb-6">Configure password requirements</p>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Minimum Length</p>
                    <p className="text-xs text-primary">Require minimum 8 characters</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Special Characters</p>
                    <p className="text-xs text-primary">Require special characters</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Password Expiry</p>
                    <p className="text-xs text-primary">Force password change every 90 days</p>
                  </div>
                  <Switch />
                </div>
                <div>
                  <p className="font-medium mb-1 text-primary">Max Login Attempts</p>
                  <Input defaultValue="5" />
                </div>
                <Button className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Admin Password
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary">Two-Factor Authentication</h3>
              <p className="text-sm text-primary mb-6">Enhance security with 2FA</p>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Admin 2FA</p>
                    <p className="text-xs text-primary">Required for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">User 2FA</p>
                    <p className="text-xs text-primary">Optional for regular users</p>
                  </div>
                  <Switch />
                </div>
                <div>
                    <p className="font-medium mb-2 text-primary">Backup Codes</p>
                    <Button className="w-full">Generate New Backup Codes</Button>
                </div>
                <Alert className="bg-blue-50 border-blue-200">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800 font-semibold">2FA Status: Active</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Last verified: 2 hours ago
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="api-keys">
        <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">API Keys management coming soon.</p>
        </div>
      </TabsContent>
      <TabsContent value="firewall">
        <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Firewall settings coming soon.</p>
        </div>
      </TabsContent>
      <TabsContent value="activity">
        <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Activity logs coming soon.</p>
        </div>
      </TabsContent>
      <TabsContent value="advanced">
        <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Advanced settings coming soon.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
