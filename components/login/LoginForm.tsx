import { useState } from "react";

// src/components/LoginForm.tsx
export default function LoginForm() {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div
      className="d-flex flex-column justify-content-center h-100 px-5"
      style={{ width: "100%" }}
    >
      <form id="login-form" method="POST" className="w-75">
        <div className="form-group">
          <label htmlFor="tipo-usuario" className="titulo-input">
            Tipo de Usuário
          </label>
          <select
            id="tipo-usuario"
            name="tipo-usuario"
            className="form-control"
            required
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="paciente" selected>
              Paciente
            </option>
            <option value="administrador">Administrador</option>
            <option value="medico">Médico</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="titulo-input">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Digite seu E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha" className="titulo-input">
            Senha
          </label>
          <input
            type="password"
            name="senha"
            id="senha"
            className="form-control"
            placeholder="Digite sua senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="btn-container text-center">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ backgroundColor: "#00858A" }}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
