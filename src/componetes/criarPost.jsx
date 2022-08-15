import { useState } from "react";
import { useAumigo } from "../hooks/api/useApi";
import { useNavigate } from "react-router-dom";

import "./criarPost.css";

export function CriarPost() {
  const [lugar, setLugar] = useState("");
  const [fotoPostagem, setFotoPostagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [checked, setChecked] = useState(false);
  const navegar = useNavigate();

  const useApi = useAumigo();

  async function handleLoginSubmit(event) {
    event.preventDefault();
    await useApi.adicionarPostagem(lugar, fotoPostagem, descricao, checked);
    navegar("/feed");
  }

  return (
    <>
      <button onClick={() => navegar("/feed")}>Voltar</button>

      <form className="form-container-login" onSubmit={handleLoginSubmit}>
        <input
          className="input-username"
          placeholder="Lugar"
          type="text"
          value={lugar}
          onChange={(event) => setLugar(event.target.value)}
        />
        <input
          className="input-username"
          placeholder="Link imagem"
          type="text"
          value={fotoPostagem}
          onChange={(event) => setFotoPostagem(event.target.value)}
        />
        <input
          className="input-username"
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <div className="ong">
          <label>
            Publico
            <input
              type="radio"
              checked={!checked}
              onChange={() => setChecked(!checked)}
            />
          </label>
          <label>
            Privado
            <input
              type="radio"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </label>
        </div>
        <button className="button">Criar Post</button>
      </form>
    </>
  );
}
