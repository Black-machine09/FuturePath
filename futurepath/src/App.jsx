
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { CadastroUsuario } from "./pages/CadastroUsuario";
import { ListaOportunidades } from "./pages/ListaOportunidades";
import { CadastroOportunidade } from "./pages/CadastroOportunidade";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">FuturePath</h1>
            <nav className="space-x-4">
              <Link to="/" className="hover:underline">Início</Link>
              <Link to="/cadastro-usuario" className="hover:underline">Cadastrar Usuário</Link>
              <Link to="/oportunidades" className="hover:underline">Ver Oportunidades</Link>
              <Link to="/nova-oportunidade" className="hover:underline">Nova Oportunidade</Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            <Route path="/oportunidades" element={<ListaOportunidades />} />
            <Route path="/nova-oportunidade" element={<CadastroOportunidade />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
