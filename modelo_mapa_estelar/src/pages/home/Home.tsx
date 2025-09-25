import React from "react";
import Particles from "react-tsparticles";
import starMapImg from "../../assets/fotos/ceu_estrelado_personalizacao_final.png"; 
import foto1 from "../../assets/fotos/casal_modelo_1.png";
import foto2 from "../../assets/fotos/casal_modelo_2.png";

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

export default function LoveStars() {
  const time = useRelationshipTimer("2024-06-20"); 

  const photos = [foto1,foto2,foto1,foto2,foto1,foto2];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Partículas estrelas */}
      <Particles
        id="tsparticles"
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 100 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: 1.5, random: true },
            move: { enable: true, speed: 0.2 },
          },
        }}
        className="absolute inset-0"
      />

      <div className="relative z-10 flex flex-col items-center px-4 py-6 md:px-12 md:py-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          O Universo testemunhou nosso momento 🌌
        </h1>
        <p className="text-lg sm:text-xl md:text-lg max-w-2xl">
          Já imaginou se o universo pudesse nos contar quanto tempo estamos juntos nessa vida? Estamos juntos há:
        </p>
        <p className="text-lg sm:text-xl md:text-2xl mb-4 mt-4 font-bold text-indigo-600">
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
            className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg transition-transform duration-300 ease-in-out md:hover:scale-110 cursor-zoom-in"
          />
        </div>

        {/* Galeria de fotos */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4">Nossas Memórias 🌌</h2>
        <p className="p-2 text-base sm:text-lg md:text-xl max-w-3xl">
          Cada momento que passei com você foi único, aqui estão as fotos de alguns dos nossos momentos, mas com certeza teremos muitos mais durante nossa vida juntos:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-items-center">
          {photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Foto ${idx + 1}`}
              className="w-52 sm:w-56 md:w-60 h-64 sm:h-72 md:h-80 object-cover rounded-xl shadow-lg transition duration-300 ease-in-out hover:opacity-80 hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
