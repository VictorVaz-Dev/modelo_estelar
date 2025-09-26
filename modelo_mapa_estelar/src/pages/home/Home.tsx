import React, { useState } from "react";
import starMapImg from "../../assets/fotos/ceu_estrelado_personalizacao_final.png"; 
import ParticlesSky from '../../reactbits/particles';
import Stack from '../../reactbits/stack'

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
      const years = Math.floor(days / 365);

      setTime({
        years,
        days: days % 365,
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
  const [showSite, setShowSite] = useState(false);
  const time = useRelationshipTimer("2024-06-20"); 

  // Tela inicial com partículas em full screen
  if (!showSite) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-black text-white overflow-hidden">
        {/* partículas em tela cheia */}
        <div className="absolute inset-0">
          <ParticlesSky
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10} 
            speed={0.2} 
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* botão na frente */}
        <div className="relative z-10">
            <button
              onClick={() => setShowSite(true)}
              className="m-1 px-8 py-4 bg-transparent text-xl font-bold hover:text-indigo-500 hover:cursor-pointer transition"
            >
              Clique Aqui
            </button>
        </div>
      </div>
    );
  }

  // Conteúdo principal do site
  return (  
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="relative z-10 flex flex-col items-center px-4 py-6 md:px-12 md:py-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          O Universo testemunhou nosso momento 🌌
        </h1>
        <p className="text-lg sm:text-xl md:text-lg max-w-2xl">
          Já imaginou se o universo pudesse nos contar quanto tempo estamos juntos nessa vida? Estamos juntos há:
        </p>
        <p className="text-xl md:text-2xl mb-4 mt-4 font-bold text-indigo-600">
          {time.years} anos, {time.days} dias, {time.hours}h {time.minutes}m {time.seconds}s
        </p>

        {/* Mapa estelar */}
        <div className="mb-8 flex flex-col items-center max-w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-2">Era assim que o céu estava no nosso dia especial 🌌</h2>
          <p className="text-base sm:text-lg md:text-xl p-2 max-w-3xl">
            Uma pequena recordação de como o céu estava exatamente na data, horário e local do nosso momento mais especial:
          </p>
          <img
            src={starMapImg}
            alt="Mapa estelar"
            className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg transition-transform duration-300 ease-in-out md:hover:scale-150 cursor-zoom-in"
          />
        </div>

        {/* Galeria de fotos */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4">Nossas Memórias 🌌</h2>
        <p className="p-2 text-base sm:text-lg md:text-xl max-w-3xl">
          Cada momento que passei com você foi único, aqui estão as fotos de alguns dos nossos momentos, mas com certeza teremos muitos mais durante nossa vida juntos:
        </p>

        {/* circular gallery centralizada, com touch suave */}
        <div className="flex justify-center items-center w-full mt-6">
          
            
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{ width: 400, height: 400 }}
            cardsData={images}
          />
        </div>
      </div>
    </div>
  );
}