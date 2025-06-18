import React, { useState } from "react";

export function CadastroUsuario() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    arquivo: null,
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);

    try {
      const res = await fetch("http://localhost:5000/cadastrar_usuario", {
        method: "POST",
        body: data,
      });
      if (res.ok) setMensagem("✅ Usuário cadastrado com sucesso!");
      else setMensagem("❌ Erro ao cadastrar usuário.");
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
        <h2 className="text-3xl font-bold text-center text-green-700">
          Cadastro de Usuário
        </h2>

        <div className="space-y-4">
          {["nome", "email", "telefone", "cidade", "estado"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          ))}
          <input
            type="file"
            name="arquivo"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded bg-gray-50"
            required
          />
        </div>

      <button
  type="submit"
  className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition"
>
  Cadastrar Usuário
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
