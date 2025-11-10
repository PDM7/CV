import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface CadastroData {
  nome: string;
  login: string;
  senha: string;
  confirmarSenha: string;
}

function cadastroVazio(): CadastroData {
  return {
    nome: "",
    login: "",
    senha: "",
    confirmarSenha: ""
  };
}

const TelaCadastro: React.FC = () => {
  const [dadosCadastro, setDadosCadastro] = useState<CadastroData>(cadastroVazio);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const nav = useNavigate();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDadosCadastro((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro(null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setCarregando(true);

    try {
      // Validações
      if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
        setErro("As senhas não coincidem.");
        return;
      }

      if (dadosCadastro.senha.length < 6) {
        setErro("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      // Simulação de cadastro bem-sucedido
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Cadastro realizado:", dadosCadastro);
      nav("/");
      
    } catch (e) {
      console.error(e);
      setErro("Erro ao criar conta. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Coluna esquerda - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cadastrar</h1>
            <p className="text-gray-500 text-lg">
              Crie sua conta em poucos passos
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="space-y-1">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700"
              >
                Nome Completo
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                value={dadosCadastro.nome}
                onChange={onChange}
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                required
              />
            </div>

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
                value={dadosCadastro.login}
                onChange={onChange}
                placeholder="Escolha um nome de usuário"
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
                  value={dadosCadastro.senha}
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
              <p className="text-xs text-gray-500 mt-1">
                Mínimo de 6 caracteres
              </p>
            </div>

            <div className="space-y-1 relative">
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  id="confirmarSenha"
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  name="confirmarSenha"
                  value={dadosCadastro.confirmarSenha}
                  onChange={onChange}
                  placeholder="Confirme sua senha"
                  className="w-full px-4 py-3 pr-12 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  {mostrarConfirmarSenha ? <Eye /> : <EyeClosed />}
                </button>
              </div>
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
                  <span>Criando conta...</span>
                </div>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          {/* Seção mobile - Visível apenas em telas pequenas */}
          <div className="lg:hidden space-y-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Já tem uma conta?
              </p>
              <button 
                onClick={() => nav("/login")}
                className="w-full py-3 bg-gradient-to-br from-indigo-600 to-blue-950 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-950 transition-all duration-200 shadow-md cursor-pointer"
              >
                Fazer login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna direita - Colorida (invertida) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-950 text-white p-12">
        <div className="flex flex-col justify-center w-full max-w-sm mx-auto space-y-12">
          {/* Mensagem de boas-vindas */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Junte-se a nós!</h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              Crie sua conta e dê um up no seu currículo
            </p>
          </div>

          {/* Benefícios */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-indigo-100">Fácil e rápido</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-indigo-100">Seguro e confiável</span>
            </div>
          </div>

          {/* Já tem conta */}
          <button 
            onClick={() => nav("/login")}
            className="w-full py-3 text-white font-semibold bg-white/20 hover:bg-white/30 rounded-md transition cursor-pointer"
          >
            Já tenho uma conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelaCadastro;