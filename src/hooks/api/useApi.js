import { useHttp } from "../_base/useHttp";
import { useMemo } from "react";

export function useAumigo() {
  const http = useHttp("http://localhost:3000");

  async function login(username, password) {
    const response = await http.post(
      "/login",
      {},
      {
        auth: {
          username,
          password,
        },
      }
    );

    return response;
  }

  async function cadastro(
    tipo,
    nome,
    email,
    senha,
    apelido,
    data,
    imagem,
    numeroAnimais,
    atuacao,
    endereco,
    permissoes
  ) {
    return await http.post(`/usuarios`, {
      tipo,
      nome,
      email,
      senha,
      apelido,
      data,
      imagem,
      numeroAnimais,
      atuacao,
      endereco,
      permissoes,
    });
  }

  async function adicionarPostagem(lugar, fotoPostagem, descricao, privado) {
    return await http.post("/postagem", {
      lugar,
      fotoPostagem,
      descricao,
      privado,
    });
  }

  async function adicionarComentario(id, descricao) {
    return await http.post(`/comentario/${id}`, { descricao });
  }

  async function encontrarUsuarioPorId(id) {
    return await http.get(`/usuarios/${id}`);
  }

  async function editarPerfil(nome, apelido, imagem) {
    return await http.put(`/usuarios`, { nome, apelido, imagem });
  }

  async function curtirPostagem(id) {
    return await http.put(`/postagem/${id}/curtir`);
  }

  async function listarPostagens(tamanho) {
    return await http.get(`/postagem?size=${tamanho}`);
  }

  async function listarComentariosPorPostId(id) {
    return await http.get(`/comentario/${id}`);
  }

  async function listarAmizades() {
    return await http.get("/usuarios/amizades");
  }

  async function encontrarUsuarioPorEmail(email) {
    return await http.get(`/usuarios/me/${email}`);
  }

  async function adicionarAmigo(id) {
    return await http.put(`/usuarios/${id}/amigo`);
  }

  async function verificarPostagemCurtida(id) {
    return await http.get(`/postagem/curtidas/${id}`);
  }

  async function infoUsuarioLogado() {
    return await http.get(`/usuarios/me`);
  }

  async function encontrarUsuarioPorNomeOuEmail(palavra) {
    return await http.get(`/usuarios/encontrar/${palavra}`);
  }

  return useMemo(
    () => ({
      login,
      cadastro,
      adicionarPostagem,
      adicionarComentario,
      encontrarUsuarioPorId,
      editarPerfil,
      curtirPostagem,
      listarPostagens,
      listarComentariosPorPostId,
      listarAmizades,
      encontrarUsuarioPorEmail,
      adicionarAmigo,
      verificarPostagemCurtida,
      infoUsuarioLogado,
      encontrarUsuarioPorNomeOuEmail,
    }),
    []
  );
}
