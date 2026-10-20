
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Product Details Page
      </h1>
      <p className="mt-4">Product ID: {id}</p>
    </main>
  );
}
