import { useState } from "react";
import { useAumigo } from "../hooks/api/useApi";
import { useNavigate } from "react-router-dom";

import "./editarPerfil.css";

export function EditarPerfil() {
  const [nome, setNome] = useState("");
  const [fotoPostagem, setFotoPostagem] = useState("");
  const [apelido, setApelido] = useState("");
  const navegar = useNavigate();

  const useApi = useAumigo();

  async function handleLoginSubmit(event) {
    event.preventDefault();
    await useApi.editarPerfil(nome, apelido, fotoPostagem);
    navegar("/perfil");
  }

  return (
    <>
      <button onClick={() => navegar("/feed")}>Voltar</button>
      <form className="form-container-login" onSubmit={handleLoginSubmit}>
        <input
          className="input-username"
          placeholder="Nome"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <input
          className="input-username"
          placeholder="Apelido"
          type="text"
          value={apelido}
          onChange={(event) => setApelido(event.target.value)}
        />
        <input
          className="input-username"
          placeholder="Link imagem"
          type="text"
          value={fotoPostagem}
          onChange={(event) => setFotoPostagem(event.target.value)}
        />

        <button className="button">Salvar</button>
      </form>
    </>
  );
}
