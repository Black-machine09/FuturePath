import React, { useEffect, useState } from "react";

export function ListaOportunidades() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/oportunidades")
      .then((res) => res.json())
      .then((data) => setLista(data))
      .catch((err) => console.error("Erro ao buscar oportunidades:", err));
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Oportunidades Disponíveis
      </h2>

      {lista.length === 0 ? (
        <p className="text-center text-white">
          Nenhuma oportunidade encontrada.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((op, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                {op.titulo}
              </h3>
              <p className="text-gray-700 mb-2">{op.descricao}</p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Local:</span> {op.local}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
