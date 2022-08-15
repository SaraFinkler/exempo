import { useState } from "react";
import olhoFechado from "../assets/imagens/olho-fechado.png";
import olhoAberto from "../assets/imagens/olho-aberto.png";

import "./inputPassword.css";

export function InputPassword({
  className,
  nome,
  valor,
  onChange,
  placeholder,
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const visualizarSenha = (event) => {
    event.preventDefault();
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className="inputPassword">
      <input
        className={className}
        name={nome}
        type={mostrarSenha ? "text" : "password"}
        placeholder={placeholder || "Senha"}
        value={valor}
        onChange={onChange}
      />
      <button>
        <img
          className="image"
          onClick={(event) => visualizarSenha(event)}
          src={mostrarSenha ? olhoAberto : olhoFechado}
          alt="icone de olho para mostrar ou ocultar senha"
        />
      </button>
    </div>
  );
}
