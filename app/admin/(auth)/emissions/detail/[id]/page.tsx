import { DetailEmissionContent } from '@/components/pages/emissions/detailemission/DetailEmissionContent';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <DetailEmissionContent id={params.id} />;
}
