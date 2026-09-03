interface CamperPageProps {
  params: Promise<{ camperId: string }>;
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  return <div>Деталі кемпера {camperId} (скоро)</div>;
}