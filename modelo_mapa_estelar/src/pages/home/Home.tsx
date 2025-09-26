import React, { useState } from "react";
import Galaxy from '../../reactbits/galaxy';
import Stack from '../../reactbits/stack';

const images = [
  { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
  { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
  { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
  { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
];

// Hook contador
const useRelationshipTimer = (startDate: string) => {
  const [time, setTime] = React.useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);

      setTime({
        years,
        months: months % 12,
        days: days % 365 % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return time;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const time = useRelationshipTimer("2024-08-26");
  // Tela inicial (antes de clicar)
  if (!loading && !showSite) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden">
        {/* fundo galáxia */}
        <div className="absolute inset-0">
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction={true}
            density={3}
            glowIntensity={0.3}
            saturation={0}
            hueShift={240}
          />
        </div>

        {/* botão */}
        <div className="relative z-10">
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                setShowSite(true);
              }, 2500);
            }}
            className="m-1 px-8 py-4 bg-transparent text-xl font-bold hover:text-white hover:cursor-pointer transition"
          >
            Clique Aqui
          </button>
        </div>
      </div>
    );
  }

  // Tela de loading (após clicar)
  if (loading) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction={true}
            density={3}
            glowIntensity={0.3}
            saturation={0}
            hueShift={240}
          />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl animate-bounce">🚀</div>
          <p className="text-xl z-100">Embarcando para o universo…</p>
        </div>

      </div>
    );
  }

  // Conteúdo principal do site (após carregar)
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="absolute inset-0 z-0">

      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-6 md:px-12 md:py-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          Para a minha estrela mais brilhante 🌟
        </h1>
        <p className="text-lg sm:text-xl md:text-lg max-w-2xl">
          Já imaginou se o universo pudesse contar quanto tempo estamos juntos nessa vida? Bom... aqui está a resposta:
        </p>
        <p className="text-2xl md:text-3xl mb-4 mt-4 font-bold text-indigo-600">
          {time.years} {time.years > 1 ? `anos` : `ano`}, {time.months} {time.months > 1 ? `meses` : `mes`}, {time.days} {time.days > 1 ? `dias` : `dia`}, {time.hours}h {time.minutes}m {time.seconds}s
        </p>

        {/* Galeria */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4">Nossas Memórias 🌌</h2>
        <p className="p-2 text-base sm:text-lg md:text-xl max-w-3xl">
          Cada instante que passei com você foi único, aqui estão algumas fotos dos nossos momentos:
        </p>

        <div className="flex justify-center items-center w-full mt-6">
          <div className="hidden md:block">
            <Stack
              randomRotation={true}
              sensitivity={150}
              sendToBackOnClick={false}
              cardDimensions={{ width: 350, height: 400 }}
              cardsData={images}
            />
          </div>
          <div className="block md:hidden">
            <Stack
              randomRotation={true}
              sensitivity={150}
              sendToBackOnClick={false}
              cardDimensions={{ width: 300, height: 400 }}
              cardsData={images}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
