// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  token: string | null;
  tipoUsuario: number | null;
  idUsuario: number | null;
  setToken: (token: string | null) => void;
  setTipoUsuario: (tipoUsuario: number | null) => void;
  setIdUsuario: (idUsuario: number | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<number | null>(null);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("token");
      const storedTipoUsuario = sessionStorage.getItem("tipo_usuario");
      const storedIdUsuario = sessionStorage.getItem("id_usuario");

      // Converte para número, caso o valor exista
      setToken(storedToken); // Atualiza o estado do token
      setTipoUsuario(storedTipoUsuario ? Number(storedTipoUsuario) : null); // Converte para número
      setIdUsuario(storedIdUsuario ? Number(storedIdUsuario) : null); // Converte para número
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    }
    if (tipoUsuario !== null) {
      sessionStorage.setItem("tipo_usuario", tipoUsuario.toString()); // Armazena como string
    }
    if (idUsuario !== null) {
      sessionStorage.setItem("id_usuario", idUsuario.toString()); // Armazena como string
    }
  }, [token, tipoUsuario, idUsuario]);

  return (
    <AuthContext.Provider
      value={{
        token,
        tipoUsuario,
        idUsuario,
        setToken,
        setTipoUsuario,
        setIdUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
