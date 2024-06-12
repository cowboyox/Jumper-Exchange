import ProfilePage from '../../ui/profile/ProfilePage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jumper Profile',
    description: 'Jumper Profile is the profile page of Jumper Exchange.',
  };
}

export default async function Page() {
  return <ProfilePage />;
}
