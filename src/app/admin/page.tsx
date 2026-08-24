import AdminClient from './AdminClient';
import AdminGate from '@/components/AdminGate';
import { getAv3yaConfig } from '@/lib/platform-config';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const config = await getAv3yaConfig();
  return (
    <AdminGate config={config}>
      <AdminClient config={config} />
    </AdminGate>
  );
}
