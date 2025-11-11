import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface LoginData {
  login: string;
  senha: string;
}

function loginVazio(): LoginData {
  return { login: "", senha: "" };
}

const TelaLogin: React.FC = () => {
  const {login} = useUser();
  const [dadosLogin, setDadosLogin] = useState<LoginData>(loginVazio);

  const nav = useNavigate();
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDadosLogin((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro(null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setCarregando(true);

    try {
      await login(dadosLogin.login, dadosLogin.senha);
    } catch (e) {
      console.error(e);
      setErro("Usuário ou senha incorretos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Coluna esquerda - Visível apenas em desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-950 text-white p-12">
        <div className="flex flex-col justify-center w-full max-w-sm mx-auto space-y-12">
          {/* Mensagem de boas-vindas simples */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Bem vindo de volta!</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              Acesse sua conta ou crie uma nova
            </p>
          </div>

          {/* Redes sociais */}
          <div className="space-y-4">
            <p className="text-indigo-200 text-center font-medium">
              Entrar com redes sociais
            </p>
            <div className="flex justify-center gap-4">
              {/* Google */}
              <button className="w-12 h-12 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition">
                <svg className="w-6 h-6" viewBox="0 0 533.5 544.3">
                  <path
                    fill="#4285F4"
                    d="M533.5 278.4c0-18.8-1.7-37-5-54.7H272v103.4h146.9c-6.3 34-25.4 62.8-54 82v68.1h87.1c50.9-46.9 80.5-116 80.5-198.8z"
                  />
                  <path
                    fill="#34A853"
                    d="M272 544.3c73.6 0 135.4-24.5 180.6-66.5l-87.1-68.1c-24.2 16.2-55.2 25.7-93.5 25.7-71.9 0-132.9-48.6-154.8-114.1H26.4v71.8c45.3 90.1 137.2 151.2 245.6 151.2z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M117.2 321.2c-5.7-16.7-8.9-34.5-8.9-52.7s3.2-36 8.9-52.7V144h-90.8C9.9 189.1 0 229.2 0 268.5s9.9 79.4 26.4 124.5l90.8-71.8z"
                  />
                  <path
                    fill="#EA4335"
                    d="M272 107.3c39.9-.6 77 13.7 105.7 39.5l79.3-79.3C407.4 24.5 345.6 0 272 0 163.6 0 71.7 61.1 26.4 144l90.8 71.8c21.9-65.5 82.9-114.1 154.8-114.5z"
                  />
                </svg>
              </button>

              {/* Facebook */}
              <button className="w-12 h-12 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition">
                <svg className="w-6 h-6" viewBox="0 0 320 512">
                  <path
                    fill="white"
                    d="M279.14 288l14.22-92.66h-88.91V132.33c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.45 0 225.36 0C141.09 0 89.09 54.42 89.09 154.02v68.32H0v92.66h89.09V512h107.75V288z"
                  />
                </svg>
              </button>

              {/* Apple */}
              <button className="w-12 h-12 flex items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition">
                <svg className="w-6 h-6" viewBox="0 0 384 512">
                  <path
                    fill="white"
                    d="M318.7 268.7c-.3-53.5 43.6-79.3 45.6-80.7-25-36.4-63.9-41.4-77.7-41.9-33.1-3.3-64.5 19.6-81.1 19.6-16.7 0-42.6-19.1-70.1-18.6-36 0-69.3 21-87.7 53.4-37.6 64.9-9.6 160.6 26.9 213.3 17.8 27.8 38.9 59 66.7 57.8 26.7-1.2 36.8-17.3 69-17.3 32.2 0 41.6 17.3 69.6 16.7 28-0.5 45.7-28.2 63.4-56 19.9-30.8 28-60.6 28.5-62.2-0.6-.3-54.8-21-55.3-83.7zM260.1 79.3c15.5-18.8 25.9-44.8 23-70.3-22.3 0-49.2 14.9-65.2 33.7-14.3 16-26.7 41.6-23.3 65.8 24.7 1.9 49.9-12.6 65.5-29.2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Criar conta */}
          <button onClick={()=>nav("/cadastrar")} className="w-full py-3 text-white font-semibold bg-white/20 hover:bg-white/30 rounded-md transition cursor-pointer">
            Criar nova conta
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Entrar</h1>
            <p className="text-gray-500 text-lg">
              Entre em sua conta para continuar
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="space-y-1">
              <label
                htmlFor="login"
                className="block text-sm font-medium text-gray-700"
              >
                Login
              </label>
              <input
                id="login"
                type="text"
                name="login"
                value={dadosLogin.login}
                onChange={onChange}
                placeholder="Digite seu login"
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                required
              />
            </div>

            <div className="space-y-1 relative">
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  value={dadosLogin.senha}
                  onChange={onChange}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 pr-12 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  {mostrarSenha ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-600">Lembrar de mim</span>
              </label>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Esqueceu a senha?
              </a>
            </div>

            {erro && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <span className="text-red-700 text-sm">{erro}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-br from-indigo-600 to-blue-950 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-950 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={carregando}
            >
              {carregando ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                "Entrar na conta"
              )}
            </button>
          </form>

          {/* Seção mobile - Visível apenas em telas pequenas */}
          <div className="lg:hidden space-y-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center space-y-4">
              <p className="text-gray-600 font-medium">
                Entrar com redes sociais
              </p>
              <div className="flex justify-center gap-4">
                {/* Google */}
                <button className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 transition">
                  <svg className="w-6 h-6" viewBox="0 0 533.5 544.3">
                    <path
                      fill="#4285F4"
                      d="M533.5 278.4c0-18.8-1.7-37-5-54.7H272v103.4h146.9c-6.3 34-25.4 62.8-54 82v68.1h87.1c50.9-46.9 80.5-116 80.5-198.8z"
                    />
                    <path
                      fill="#34A853"
                      d="M272 544.3c73.6 0 135.4-24.5 180.6-66.5l-87.1-68.1c-24.2 16.2-55.2 25.7-93.5 25.7-71.9 0-132.9-48.6-154.8-114.1H26.4v71.8c45.3 90.1 137.2 151.2 245.6 151.2z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M117.2 321.2c-5.7-16.7-8.9-34.5-8.9-52.7s3.2-36 8.9-52.7V144h-90.8C9.9 189.1 0 229.2 0 268.5s9.9 79.4 26.4 124.5l90.8-71.8z"
                    />
                    <path
                      fill="#EA4335"
                      d="M272 107.3c39.9-.6 77 13.7 105.7 39.5l79.3-79.3C407.4 24.5 345.6 0 272 0 163.6 0 71.7 61.1 26.4 144l90.8 71.8c21.9-65.5 82.9-114.1 154.8-114.5z"
                    />
                  </svg>
                </button>

                {/* Facebook */}
                <button className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 transition">
                  <svg className="w-6 h-6" viewBox="0 0 320 512">
                    <path
                      fill="#1877F2"
                      d="M279.14 288l14.22-92.66h-88.91V132.33c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.45 0 225.36 0C141.09 0 89.09 54.42 89.09 154.02v68.32H0v92.66h89.09V512h107.75V288z"
                    />
                  </svg>
                </button>

                {/* Apple */}
                <button className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 transition">
                  <svg className="w-6 h-6" viewBox="0 0 384 512">
                    <path
                      fill="black"
                      d="M318.7 268.7c-.3-53.5 43.6-79.3 45.6-80.7-25-36.4-63.9-41.4-77.7-41.9-33.1-3.3-64.5 19.6-81.1 19.6-16.7 0-42.6-19.1-70.1-18.6-36 0-69.3 21-87.7 53.4-37.6 64.9-9.6 160.6 26.9 213.3 17.8 27.8 38.9 59 66.7 57.8 26.7-1.2 36.8-17.3 69-17.3 32.2 0 41.6 17.3 69.6 16.7 28-0.5 45.7-28.2 63.4-56 19.9-30.8 28-60.6 28.5-62.2-0.6-.3-54.8-21-55.3-83.7zM260.1 79.3c15.5-18.8 25.9-44.8 23-70.3-22.3 0-49.2 14.9-65.2 33.7-14.3 16-26.7 41.6-23.3 65.8 24.7 1.9 49.9-12.6 65.5-29.2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button onClick={()=>nav("/cadastrar")}  className="w-full py-3 bg-gradient-to-br from-indigo-600 to-blue-950 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-950 transition-all duration-200 shadow-md cursor-pointer">
              Criar nova conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaLogin;
