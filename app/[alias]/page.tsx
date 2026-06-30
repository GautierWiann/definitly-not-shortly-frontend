import { permanentRedirect } from 'next/navigation';
export default async function Page({ params }: { params: { alias: string } }) {
  const alias = (await params).alias;
  
  const res = await fetch(`http://localhost:3001/url/${alias}`);
  
  if (!res.ok) {
    // Si 404, on redirige vers la home
    permanentRedirect('/?error=lien non trouvé');
  }

  const data = await res.json();
  permanentRedirect(data.originalUrl);
}