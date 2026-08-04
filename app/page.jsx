import { redirect } from 'next/navigation';
import { DEFAULT_LOCATION } from '@/lib/locations';

export default function RootPage() {
  redirect(`/${DEFAULT_LOCATION}`);
}
