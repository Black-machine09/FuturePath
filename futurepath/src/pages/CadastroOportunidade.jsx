import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CadastroOportunidade() {
  const [form, setForm] = useState({ titulo: '', descricao: '', local: '' });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/cadastrar_oportunidade", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMensagem("✅ Oportunidade cadastrada com sucesso!");
        setForm({ titulo: '', descricao: '', local: '' });
        setTimeout(() => navigate("/oportunidades"), 1000); 
      } else {
        setMensagem("❌ Erro ao cadastrar oportunidade.");
      }
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 min-h-screen flex items-center justify-center p-6">

      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          Nova Oportunidade
        </h2>

        <div className="space-y-4">
          {['titulo', 'descricao', 'local'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          ))}
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition"
        >
          Cadastrar Oportunidade
        </button>

        {mensagem && (
          <p className="text-center mt-4 text-lg font-medium text-green-700">
            {mensagem}
          </p>
        )}
      </form>
    </div>
  );
}
