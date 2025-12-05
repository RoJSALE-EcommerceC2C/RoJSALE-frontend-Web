
import { PageHeader } from '@/components/page-header';
import { SettingsForm } from '@/app/(dashboard)/settings/settings-form';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and application settings."
      />
      <div className="max-w-4xl">
        <SettingsForm />
      </div>
    </div>
  );
}
