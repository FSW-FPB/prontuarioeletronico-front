"use client";
import { useEffect, useState } from "react";
import { logarPaciente } from "@/hooks/useAuth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { setToken } = useAuth(); // Acesso ao contexto
  const [tipoUsuario, setTipoUsuario] = useState<string>("1"); // Tipo como string
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const loginData = { email, senha, tipoUsuario };
    const response = await logarPaciente(loginData);

    console.log(response); // Verificando a resposta

    if (response.success && response.tokenData) {
      setToken(response.tokenData.token);
      console.log(response.tokenData);
      router.push("/clientpage"); // Navega para a página do cliente
    } else {
      setError(response.error || "Erro desconhecido");
      console.log(response.error || "Erro desconhecido");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center h-100 px-5"
      style={{ width: "100%" }}
    >
      <form
        id="login-form"
        method="POST"
        className="w-75"
        onSubmit={handleLogin}
      >
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
            onChange={(e) => setTipoUsuario(e.target.value)} // A mudança de valor é tratada diretamente aqui
          >
            <option value="1">Paciente</option>
            <option value="2">Administrador</option>
            <option value="3">Médico</option>
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
        {error && <div className="text-danger">{error}</div>}
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
