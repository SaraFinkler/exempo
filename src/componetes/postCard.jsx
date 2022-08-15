import { useEffect, useState } from "react";
import { useAumigo } from "../hooks/api/useApi";

import pontinhos from "../assets/imagens/pontinhos.png";
import coracao from "../assets/imagens/coracao.png";
import coracaoLike from "../assets/imagens/coracao-like.png";
import enviar from "../assets/imagens/enviar.png";

import "./postCard.css";

export function PostCard({ post }) {
  const [curtir, setCurtir] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [postAtualizado, setPostAtualizado] = useState({});

  const useApi = useAumigo();

  async function handleSubmit(event, id) {
    event.preventDefault();
    await useApi.adicionarComentario(id, mensagem);
    setMensagem("");
  }

  async function handleCurtir(id) {
    await useApi.curtirPostagem(id);
    setCurtir(!curtir);
  }

  useEffect(() => {
    async function atualizarCurtidas() {
      const status = await useApi.verificarPostagemCurtida(post.id);
      const novoPost = await useApi.listarPostagens();
      const teste = novoPost.content.find((p) => p.id === post.id);
      setPostAtualizado({ ...teste, estaCurtido: status });
    }
    atualizarCurtidas();
  }, [curtir]);

  return (
    <div className="postCard">
      <div className="postHeader">
        <div className="perfilWrapper">
          <img
            className="imagemPerfil"
            src={postAtualizado?.usuarioFoto}
            alt="foto de perfil"
          />
          <div className="postInfo">
            <p>{postAtualizado?.usuarioNome}</p>
            <p>{postAtualizado?.lugar}</p>
          </div>
        </div>
        <img className="pontinhos" src={pontinhos} alt="mais" />
      </div>
      <img
        className="imagemPost"
        src={postAtualizado?.fotoPostagem}
        alt="imagem do post"
      />
      <div className="postInteracao">
        <button className="botaoCurtir">
          <img
            className="curtir"
            onClick={() => handleCurtir(postAtualizado?.id)}
            src={postAtualizado?.estaCurtido ? coracaoLike : coracao}
            alt="curtir"
          />
        </button>
        <p>{postAtualizado?.curtidas}</p>
      </div>
      <div className="postDescricao">
        <p>{postAtualizado?.descricao}</p>
      </div>

      <div className="mensagensContainer">
        {post.comentarios.map((comentario, index) => (
          <div key={index} className="mensagens">
            <img
              className="imagemPerfil"
              src={comentario.usuarioFoto}
              alt="foto de perfil"
            />
            <p className="mensagem">{comentario.descricao}</p>
          </div>
        ))}
      </div>

      <div className="postComentario">
        <form onSubmit={(event) => handleSubmit(event)}>
          <textarea
            type="textarea"
            placeholder="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
        </form>
        <button className="botaoEnviar">
          <img
            className="enviar"
            src={enviar}
            alt="enviar"
            onClick={(event) => handleSubmit(event, postAtualizado?.id)}
          />
        </button>
      </div>
    </div>
  );
}
