import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../componetes";
import { useAumigo } from "../hooks/api/useApi";
import "./cadastro.css";

export function Cadastro() {
  const [souONG, setSouONG] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [apelido, setApelido] = useState("");
  const [data, setData] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState("");
  const [animais, setAnimais] = useState("");
  const [endereco, setEndereco] = useState("");
  const [regiao, setRegiao] = useState("");
  const useApi = useAumigo();
  const navegar = useNavigate();

  async function handleLoginSubmit(event) {
    event.preventDefault();
    const tipo = souONG ? "ONG" : "USUARIO";
    const permissoes = souONG ? ["ONG", "USUARIO"] : ["USUARIO"];
    await useApi.cadastro(
      tipo,
      nome,
      email,
      senha,
      apelido,
      data,
      imagem,
      animais,
      regiao,
      endereco,
      permissoes
    );
    navegar("/feed");
  }

  return (
    <div className="container-login">
      <button onClick={() => navegar("/")}>Voltar</button>

      <div className="form-login">
        <form className="form-container-login" onSubmit={handleLoginSubmit}>
          <p>Sou uma ONG</p>
          <div className="ong">
            <label>
              Sim
              <input
                type="radio"
                checked={souONG}
                onChange={() => setSouONG(true)}
              />
            </label>
            <label>
              Não
              <input
                type="radio"
                checked={!souONG}
                onChange={() => setSouONG(false)}
              />
            </label>
          </div>
          <label>
            Nome Completo:
            <input
              className="input-username"
              placeholder="Nome Completo"
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </label>

          <label>
            Email:
            <input
              className="input-username"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            Apelido:
            <input
              className="input-username"
              placeholder="Apelido"
              type="text"
              value={apelido}
              onChange={(event) => setApelido(event.target.value)}
            />
          </label>

          <label>
            {souONG ? "Data de Criação:" : "Data de Aniversário:"}
            <input
              className="input-username"
              placeholder={souONG ? "Data de Criação" : "Data de Aniversário"}
              type="date"
              value={data}
              onChange={(event) => setData(event.target.value)}
            />
          </label>

          <label>
            Senha:
            <InputPassword
              className="input-password"
              valor={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </label>

          <label>
            URL da Imagem:
            <input
              className="input-username"
              placeholder="Url Imagem"
              type="url"
              value={imagem}
              onChange={(event) => setImagem(event.target.value)}
            />
          </label>

          {souONG ? (
            <>
              <label>
                Número Estimado de Animais:
                <input
                  className="input-username"
                  placeholder="Número Estimado de Animais"
                  type="number"
                  value={animais}
                  onChange={(event) => setAnimais(event.target.value)}
                />
              </label>

              <label>
                Endereço:
                <input
                  className="input-username"
                  placeholder="Endereço"
                  type="text"
                  value={endereco}
                  onChange={(event) => setEndereco(event.target.value)}
                />
              </label>

              <label>
                Região de Atuação:
                <input
                  className="input-username"
                  placeholder="Região de Atuação"
                  type="text"
                  value={regiao}
                  onChange={(event) => setRegiao(event.target.value)}
                />
              </label>
            </>
          ) : null}
          <button className="button">Cadastro</button>
        </form>
      </div>
    </div>
  );
}
