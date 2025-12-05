
import { PageHeader } from '@/components/page-header';
import { RolesForm } from './roles-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="MANAGE ROLES" />
      <div className="max-w-4xl">
        <RolesForm />
      </div>
    </div>
  );
}
