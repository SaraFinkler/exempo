import { useEffect, useState } from "react";
import { useAumigo } from "../hooks/api/useApi";
import { PostCard } from "./postCard";
import { useNavigate } from "react-router-dom";

import "./post.css";

export function Post() {
  const [postMessage, setPostMessage] = useState([]);
  const [tamanho, setTamanho] = useState(5);
  const [lista, setLista] = useState(0);
  const useApi = useAumigo();
  const navegar = useNavigate();

  useEffect(() => {
    async function getFeed() {
      const listaPostagem = await useApi.listarPostagens(100);
      setLista(listaPostagem.content);
      const postagems = await useApi.listarPostagens(tamanho);
      const postsAtualizados = await Promise.all(
        postagems.content.map(async (post) => {
          const comentarios = await useApi.listarComentariosPorPostId(post.id);
          return {
            ...post,
            comentarios: comentarios,
          };
        })
      );

      setPostMessage(postsAtualizados);
    }
    getFeed();
  }, [tamanho]);

  function handleProximaPagina() {
    setTamanho((tamanho) => tamanho + 5);
  }

  return (
    <div className="feedWrapper">
      <>
        <button onClick={() => navegar("/criar")}>Criar Post</button>
        {postMessage.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </>
      {lista.length > tamanho ? (
        <button onClick={() => handleProximaPagina()}>Carregar mais</button>
      ) : null}
    </div>
  );
}
