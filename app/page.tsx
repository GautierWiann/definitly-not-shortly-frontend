"use client"
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Background from './component/background';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { translations } from './locales';

interface UrlResult {
  alias: string;
  originalUrl: string;
  qrCode: string;
}
type Lang = 'fr' | 'en';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [customAlias, setCustomAlias] = useState<string>('');
  const [showAliasInput, setShowAliasInput] = useState<boolean>(false);
  const [result, setResult] = useState<UrlResult | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCopiedQR, setIsCopiedQR] = useState<boolean>(false);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as Lang) || 'fr';
    }
    return 'fr';
  });
  const t = translations[lang];

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      // Nettoyage de l'URL après lecture
      window.history.replaceState({}, '', '/');
    }
  }, [errorMessage]);




  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': lang
        },
        body: JSON.stringify({
          originalUrl,
          customAlias: customAlias || undefined
        }),
      });

      const data: UrlResult | { message: string } = await response.json();

      if (!response.ok) {
        throw new Error((data as { message: string }).message || 'Une erreur est survenue');
      }

      setResult(data as UrlResult);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const aliasRef = useRef<HTMLDivElement>(null);

  // Animation lorsque l'état change
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (showAliasInput) {
        // Animation d'entrée : sort de derrière
        gsap.fromTo(aliasRef.current,
          { y: -40, opacity: 0, },
          { y: 0, opacity: 1, duration: 0.6, height: 'fit-content', ease: "power2.out" }
        );
      } else {
        // Animation de sortie
        gsap.to(aliasRef.current,
          { y: -40, opacity: 0 },
        );
      }
    });
    return () => ctx.revert();
  }, [showAliasInput]);


  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  const copyQrCodeToClipboard = async (imageUrl: string) => {
    try {
      // Convertir l'image (data:image/...) en Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      setIsCopiedQR(true)

    } catch (err : unknown) {
      toast.error(t.qrCopiedError);
    }
  };

  return (
    <main className="min-h-screen w-screen overflow-hidden bg-background bg-grid-pattern flex flex-col items-center justify-center relative z-1 py-[4lvh]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='h-[100lvh] w-screen absolute top-0 left-0 z-2'>
        <Background
          speed={0.6}
          scale={1.7}
          brightness={1.4}
          color1="#003B00"
          color2="#008F11"
          noiseFrequency={2.5}
          noiseAmplitude={2.5}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.13}
          layerOffset={0}
          colorSpeed={1.2}
          enableMouseInteraction={false}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_51%)] bg-[length:100%_4px] pointer-events-none" />

      <div className="w-full max-w-4xl px-[4dvw] relative z-10">
        <div className="text-center mb-12">
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
            className="px-[20px] py-[14px] mb-[4dvh] border rounded cursor-pointer"
          >
            {t.changeLang} : {lang.toUpperCase()}
          </button>
          <h1 className="text-5xl md:text-6xl text-on-surface mb-6 tracking-tight uppercase font-bold">
            {t.header.split(',')[0]}, <span className="text-primary">{t.header.split(',')[1]}</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-mono">
            {t.description}
          </p>
        </div>

        <div className="bg-surface-container-lowest glass-panel border border-outline-variant p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <button type="button" onClick={() => setShowAliasInput(!showAliasInput)} className="text-xs uppercase text-outline">
              {showAliasInput ? "-" : "+"} {t.aliasButton}
            </button>
            <input
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="px-[24px] py-[18px] bg-surface-container-low border border-outline-variant  text-on-surface"
              placeholder={t.placeholderUrl}
              required
            />

            <div ref={aliasRef} className="pt-2">
              <input
                className="w-full border border-outline-variant bg-surface-container-lowest px-[24px] py-[18px]"
                placeholder={t.placeholderAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />
            </div>

            <button type="submit" className="p-[5px] bg-primary text-on-primary uppercase font-bold cursor-pointer">
              {t.submit}
            </button>


          </form>

          {/* Résultats */}
          {result && (
            <div className="mt-[20px] pt-[20px] border-t border-outline-variant/50 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-surface-container-low border border-primary/50 p-4 flex items-center justify-between">
                <span className="text-primary font-mono font-bold">http://localhost:3000/{result.alias}</span>
                <button
                  onClick={() => handleCopy(`http://localhost:3000/${result.alias}`)}
                  className="bg-surface-variant px-4 py-2 text-xs uppercase transition-colors cursor-pointer"
                >
                  {isCopied ? t.copied : t.copy}
                </button>
              </div>
              <div className='flex flex-row justify-between mt-[20px]'>
                <Image height={2000} width={2000} src={result.qrCode} alt="QR Code du lien" className="w-[100px] h-[100px]" />
                <button
                  onClick={() => copyQrCodeToClipboard(result.qrCode)}
                  className="bg-surface-variant px-4 py-2 text-xs uppercase hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  {isCopiedQR ? t.copied : t.copy}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}