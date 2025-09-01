import { Logo } from "@/assets";
import { useState } from "react";
import { auth } from "@/services/firebaseconnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas antes do Firebase
    if (!email || !senha) {
      toast.warning("⚠️ Preencha todos os campos!");
      return;
    }

    if (senha.length < 6) {
      toast.warning("⚠️ A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      toast.success("✅ Login realizado com sucesso!");
      navigate("/home", { replace: true });
    } catch (error: any) {
      // Tratamento de erros do Firebase
      let errorMsg = "❌ Erro ao fazer login.";

      if (error.code === "auth/user-not-found") {
        errorMsg = "❌ Usuário não encontrado!";
      } else if (error.code === "auth/wrong-password") {
        errorMsg = "❌ Senha incorreta!";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "⚠️ E-mail inválido!";
      } else if (error.code === "auth/too-many-requests") {
        errorMsg = "⚠️ Muitas tentativas, tente novamente mais tarde!";
      }

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-24 mb-6 border rounded-2xl border-gray-500"
        />

        <h1 className="text-2xl font-bold text-gray-800 mb-6">GeneAll</h1>

        <form onSubmit={handleLogin} className="flex flex-col w-full gap-4">
          <input
            type="email"
            placeholder="Digite o seu E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 cursor-pointer text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
