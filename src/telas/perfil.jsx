import { useEffect, useState } from "react";
import { useAumigo } from "../hooks/api/useApi";
import { useNavigate } from "react-router-dom";

import "./perfil.css";

export function Perfil() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navegar = useNavigate();
  const useApi = useAumigo();

  useEffect(() => {
    async function getInfo() {
      const usuarioLogado = await useApi.infoUsuarioLogado();
      setUser(usuarioLogado);
    }
    getInfo();
  }, [useApi]);

  useEffect(() => {
    async function getInfo() {
      const postagens = await useApi.listarPostagens(10);
      const postagensUsuario = postagens.content.filter(
        (postagem) => postagem.usuarioNome === user.nome
      );
      setPosts(postagensUsuario);
    }
    getInfo();
  }, [useApi]);

  return (
    <div className="perfilContainer">
      <button onClick={() => navegar("/feed")}>Voltar</button>
      <div className="perfil">
        <img className="foto" src={user.imagem} alt="foto de perfil" />
        <div className="info">
          <p>
            Nome: {user.nome} ({user.apelido})
          </p>
          <p>
            {user.tipo === "USUARIO"
              ? "Data de Aniversário:"
              : "Data de Fundação:"}{" "}
            {user.data}
          </p>
          <p>Email: {user.email}</p>
          <p>Endereço: {user.endereco}</p>
          <p>
            {user.tipo !== "USUARIO" ? "Quantidade de animais:" : ""}{" "}
            {user.numeroAnimais}
          </p>
          <button onClick={() => navegar("/editar")}>Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}
