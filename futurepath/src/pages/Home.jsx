import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Bem-vindo ao FuturePath
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto">
          A plataforma que conecta jovens talentos com oportunidades reais de crescimento profissional.
        </p>
        <Link
          to="/oportunidades"
          className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Ver Oportunidades
        </Link>
      </div>
    </div>
  );
}
