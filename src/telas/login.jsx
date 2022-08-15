import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputPassword } from "../componetes";
import { useAumigo } from "../hooks/api/useApi";
import "./login.css";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const useApi = useAumigo();
  const navegar = useNavigate();

  function handleUsernameChange(event) {
    const username = event.target.value;
    setUsername(username);
  }

  function handlePasswordChange(event) {
    const password = event.target.value;
    setPassword(password);
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    await useApi.login(username, password);
    navegar("/feed");
  }

  return (
    <div className="container-login">
      <div className="form-login">
        <form className="form-container-login" onSubmit={handleLoginSubmit}>
          <input
            className="input-username"
            name="username"
            placeholder="Usuário"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <InputPassword
            className="input-password"
            nome="password"
            valor={password}
            onChange={handlePasswordChange}
          />
          <button className="button">Entrar</button>
        </form>
        <button className="button" onClick={() => navegar("/cadastro")}>
          Cadastro
        </button>
      </div>
    </div>
  );
}
