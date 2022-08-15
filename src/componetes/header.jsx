import { useEffect, useState } from "react";
import { useAumigo } from "../hooks/api/useApi";
import { useNavigate } from "react-router-dom";

import "./header.css";

export function Header() {
  const [user, setUser] = useState({});
  const navegar = useNavigate();

  const useApi = useAumigo();

  useEffect(() => {
    async function getInfo() {
      const usuarioLogado = await useApi.infoUsuarioLogado();
      setUser(usuarioLogado);
    }
    getInfo();
  }, []);
  return (
    <div className="header">
      <div className="containerHeader">
        <button className="usuarioHeader" onClick={() => navegar("/perfil")}>
          <img className="fotoHeader" src={user.imagem} alt="foto de perfil" />
          <p>{user.apelido}</p>
        </button>
        <h1>AumigoEstouAqui</h1>
        <button onClick={() => navegar("/")}>Sair</button>
      </div>
    </div>
  );
}
