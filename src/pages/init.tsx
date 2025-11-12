import { Upload, User, FileText, ArrowRight, FileUser } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { emptyData } from "../default.data";
import type { Perfil } from "../types/profile";

interface StartData {
  nome: string;
}

function dadosVazios(): StartData {
  return { nome: "" };
}

const TelaInicio: React.FC = () => {
  const [dadosInicio, setDadosInicio] = useState<StartData>(dadosVazios);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<
    "novo" | "continuar"
  >("novo");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  function validarPerfil(data: Perfil): boolean {
    return (
      data &&
      typeof data === "object" &&
      "chave" in data &&
      "nome" in data &&
      "telefone" in data &&
      "foto" in data &&
      "resumo" in data &&
      "campos" in data &&
      "experiencias" in data &&
      Array.isArray(data.campos) &&
      Array.isArray(data.experiencias)
    );
  }

  //Verifica se existe sessão ativa e valida
  useEffect(() => {
    const profileStr = localStorage.getItem("profile");
    if (!profileStr) return;

    try {
      const profile = JSON.parse(profileStr);

      if (!validarPerfil(profile)) throw new Error("Formato inválido");

      alert("Você já está logado! Redirecionando...");
      nav("/");
    } catch {
      console.warn("Perfil inválido no localStorage. Limpando...");
      localStorage.removeItem("profile");
    }
  }, [nav]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDadosInicio((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro(null);
  }

  async function comecarDoZero(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const novoPerfil = { ...emptyData, nome: dadosInicio.nome };

      if(localStorage.getItem("profile") !== null) localStorage.removeItem("profile");
      
      localStorage.setItem("profile", JSON.stringify(novoPerfil));
      alert(`Bem-vindo, ${dadosInicio.nome}! Iniciando nova sessão...`);
      nav("/");
    } catch (e) {
      console.error(e);
      setErro("Erro ao iniciar nova sessão.");
    } finally {
      setCarregando(false);
    }
  }

  async function continuarProgresso(arquivo: File) {
    setCarregando(true);

    try {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);

          if (!validarPerfil(jsonData)) throw new Error("Formato inválido");

          localStorage.setItem("profile", JSON.stringify(jsonData));
          alert("Progresso carregado com sucesso! Carregando...");
          nav("/");
        } catch (e) {
          console.error(e);
          setErro("Arquivo JSON inválido ou corrompido.");
        } finally {
          setCarregando(false);
        }
      };

      reader.onerror = () => {
        setErro("Erro ao ler o arquivo.");
        setCarregando(false);
      };

      reader.readAsText(arquivo);
    } catch (e) {
      console.error(e);
      setErro("Erro ao processar arquivo.");
      setCarregando(false);
    }
  }

  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/json") {
        setErro("Por favor, selecione um arquivo JSON.");
        return;
      }
      continuarProgresso(file);
    }
  }

  function handleFileButtonClick() {
    fileInputRef.current?.click();
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Coluna direita - Formulário */}
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="lg:hidden flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FileUser className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Vamos Começar
            </h1>
            <p className="text-gray-500 text-lg">Escolha como deseja iniciar</p>
          </div>

          {/* Seleção de Opção */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setOpcaoSelecionada("novo")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  opcaoSelecionada === "novo"
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <User
                  className={`w-6 h-6 mx-auto mb-2 ${
                    opcaoSelecionada === "novo"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`font-medium ${
                    opcaoSelecionada === "novo"
                      ? "text-indigo-700"
                      : "text-gray-600"
                  }`}
                >
                  Começar do Zero
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOpcaoSelecionada("continuar")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  opcaoSelecionada === "continuar"
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Upload
                  className={`w-6 h-6 mx-auto mb-2 ${
                    opcaoSelecionada === "continuar"
                      ? "text-indigo-600"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`font-medium ${
                    opcaoSelecionada === "continuar"
                      ? "text-indigo-700"
                      : "text-gray-600"
                  }`}
                >
                  Continuar
                </span>
              </button>
            </div>

            {/* Conteúdo Dinâmico */}
            {opcaoSelecionada === "novo" ? (
              <form onSubmit={comecarDoZero} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Qual é o seu nome?
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      value={dadosInicio.nome}
                      onChange={onChange}
                      placeholder="Digite seu nome"
                      className="w-full px-4 py-3 pl-11 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-br from-indigo-600 to-blue-950 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-950 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  disabled={carregando || !dadosInicio.nome.trim()}
                >
                  {carregando ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Iniciando...</span>
                    </div>
                  ) : (
                    <>
                      Começar Agora
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Carregar Progresso Salvo
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Selecione o arquivo JSON com seu progresso anterior
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={handleFileButtonClick}
                    className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm disabled:opacity-50 cursor-pointer"
                    disabled={carregando}
                  >
                    {carregando ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Carregando...</span>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2 inline" />
                        Selecionar Arquivo JSON
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 mt-3">
                    Procure pelo arquivo .json que você salvou anteriormente
                  </p>
                </div>
              </div>
            )}

            {erro && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
                <span className="text-red-700 text-sm">{erro}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaInicio;
