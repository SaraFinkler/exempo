import { Routes, Route } from "react-router-dom";
import { FeedPrincipal } from "./telas/feedPrincipal";
import { Login } from "./telas/login";
import { Cadastro } from "./telas/cadastro";
import { Perfil } from "./telas/perfil";
import { CriarPost, ListaAmizade } from "./componetes";
import { EditarPerfil } from "./componetes/editarPerfil";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/feed" element={<FeedPrincipal />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/amizade" element={<ListaAmizade />} />
      <Route path="/criar" element={<CriarPost />} />
      <Route path="/editar" element={<EditarPerfil />} />
    </Routes>
  );
}

export default App;
