import { useEffect, useState } from "react";
import { useAumigo } from "../hooks/api/useApi";
import "./listaAmizade.css";

export function ListaAmizade() {
  const [email, setEmail] = useState("");
  const [amizades, setAmizades] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [jaSaoAmigos, setJaSaoAmigos] = useState({});
  const [atualizar, setAtualizar] = useState(false);
  const useApi = useAumigo();

  useEffect(() => {
    async function getAmizades() {
      const listaAmizade = await useApi.listarAmizades();
      setAmizades(listaAmizade);
      verificarSeUsuarioJaEAmigo();
    }
    getAmizades();
  }, [atualizar]);

  async function encontrarUsuario(event) {
    event.preventDefault();
    const user = await useApi.encontrarUsuarioPorEmail(email);
    setUsuario(user);
    setJaSaoAmigos(verificarSeUsuarioJaEAmigo());
  }

  function verificarSeUsuarioJaEAmigo() {
    return amizades.some((amizade) => amizade.id === usuario.id);
  }

  async function adicionarAmigo(id) {
    await useApi.adicionarAmigo(usuario?.id ? usuario.id : id);
    setUsuario("");
    setAtualizar(!atualizar);
  }

  return (
    <div className="listaAmizade">
      <form className="form-container-login" onSubmit={encontrarUsuario}>
        <input
          className="input-username"
          placeholder="Procurar Usuários"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="button">Encontrar</button>
      </form>

      {usuario?.nome ? (
        <div className="amigos">
          <img
            className="imagemPerfil"
            src={usuario.imagem}
            alt="foto de perfil"
          />
          <p>{usuario.nome}</p>
          <button onClick={() => adicionarAmigo()}>
            {jaSaoAmigos ? "Remover" : "Adicionar"}
          </button>
        </div>
      ) : null}

      <div className="listaAmigosContainer">
        <p className="tituloAmizade">Lista de Amigos</p>
        <div className="listaAmigos">
          {amizades.map((amizade, index) => (
            <div key={index}>
              <div className="amigos">
                <img
                  className="imagemPerfil"
                  src={amizade.imagem}
                  alt="foto de perfil"
                />
                <p>{amizade.nome}</p>
                <button onClick={() => adicionarAmigo(amizade.id)}>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useAumigo } from "../hooks/api/useApi";
// import "./listaAmizade.css";

// export function ListaAmizade() {
//   const [palavra, setPalavra] = useState("");
//   const [amizades, setAmizades] = useState([]);
//   const [lista, setLista] = useState([]);
//   const [jaSaoAmigos] = useState(false);
//   const [atualizar, setAtualizar] = useState(false);
//   const useApi = useAumigo();

//   useEffect(() => {
//     async function getAmizades() {
//       const listaAmizade = await useApi.listarAmizades();
//       setAmizades(listaAmizade);
//     }
//     getAmizades();
//   }, [atualizar]);

//   async function encontrarUsuario(event) {
//     event.preventDefault();
//     const resultado = await useApi.encontrarUsuarioPorNomeOuEmail(palavra);
//     setLista(resultado);

//     // setJaSaoAmigos(verificarSeUsuarioJaEAmigo());
//   }

//   // function verificarSeUsuarioJaEAmigo() {
//   //   return amizades.some((amizade) => amizade.id === usuario.id);
//   // }

//   async function adicionarAmigo(id) {
//     // await useApi.adicionarAmigo(usuario?.id ? usuario.id : id);
//     setLista([]);
//     setAtualizar(!atualizar);
//   }

//   return (
//     <div className="listaAmizade">
//       <form className="form-container-login" onSubmit={encontrarUsuario}>
//         <input
//           className="input-username"
//           placeholder="Procurar Usuários"
//           type="text"
//           value={palavra}
//           onChange={(event) => setPalavra(event.target.value)}
//         />
//         <button className="button">Encontrar</button>
//       </form>

//       {lista.map((pessoa) => (
//         <div className="amigos">
//           <img
//             className="imagemPerfil"
//             src={pessoa.imagem}
//             alt="foto de perfil"
//           />
//           <p>{pessoa.nome}</p>
//           <button onClick={() => adicionarAmigo()}>
//             {jaSaoAmigos ? "Remover" : "Adicionar"}
//           </button>
//         </div>
//       ))}

//       <div className="listaAmigosContainer">
//         <p className="tituloAmizade">Lista de Amigos</p>
//         <div className="listaAmigos">
//           {amizades.map((amizade, index) => (
//             <div key={index}>
//               <div className="amigos">
//                 <img
//                   className="imagemPerfil"
//                   src={amizade.imagem}
//                   alt="foto de perfil"
//                 />
//                 <p>{amizade.nome}</p>
//                 <button onClick={() => adicionarAmigo(amizade.id)}>
//                   Remover
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
