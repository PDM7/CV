import { Upload, User, ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Perfil } from "../../types/profile";
import { useWindowSize } from "@react-hook/window-size";

interface StartData {
  nome: string;
}

function dadosVazios(): StartData {
  return { nome: "" };
}

import styles from "./styles.module.css";
import { Novo_Inicio_Componets } from "../../components/inicio/novo";
import ReactConfetti from "react-confetti";
import { Upload_Inicio_Componets } from "../../components/inicio/upload";



export function TelaInicio() {
  const [ width, height ] = useWindowSize();
  const [sucessNext, setSucessNext] = useState(false);
  const [perfil, setPerfil] = useState<Perfil | null>(null);


  
  const [dadosInicio, setDadosInicio] = useState<StartData>(dadosVazios);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<
    "novo" | "continuar" | ""
  >("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  //Verifica se existe sessão ativa e valida
  // useEffect(() => {
  //   const profileStr = localStorage.getItem("profile");
  //   if (!profileStr) return;

  //   try {
  //     // const profile = JSON.parse(profileStr);

  //     // if (!validarPerfil(profile)) throw new Error("Formato inválido");

  //     // alert("Você já está logado! Redirecionando...");
  //     // nav("/");
  //   } catch {
  //     console.warn("Perfil inválido no localStorage. Limpando...");
  //     localStorage.removeItem("profile");
  //   }
  // }, [nav]);

  // function onChange(event: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   setDadosInicio((prev) => ({ ...prev, [name]: value }));
  //   if (erro) setErro(null);
  // }
  




  return (
    <div
      className={`${[styles.page].join(" ")} min-h-100 p-2 stext-center justify-center`}
      style={{
        // backgroundImage: "url(/home/section2/fundo.png)"
      }}
    >
      {sucessNext && ( <ReactConfetti
        width={width}
        height={height}
        initialVelocityY={{ min: 20, max: 10}}
      />)}

      {sucessNext && <h1 id={styles.title}>
        Seja bem-vindo, <span> { perfil?.nome } 🎉</span>
      </h1>}

      {!sucessNext && <h1 id={styles.title}>
        Como deseja <span>começar?</span>
      </h1>}

      <p id={styles.description}>Escolha como deseja iniciar seu currículo. Você pode começar do zero ou continuar de onde parou para manter seu progresso sempre organizado.
      </p>
      <div className={`${styles.selectStart} grid grid-cols-1 md:grid-cols-2 space-x-2 gap-2`}>

        <button
          onClick={() => opcaoSelecionada == "novo" ? setOpcaoSelecionada("") : setOpcaoSelecionada("novo")}
          className={`${styles.selectButton} ${opcaoSelecionada == "novo" ? styles.selectButton_Select : ""}`}
        > <User /> Começar do Zero
        </button>

        <button
          type="button"
          onClick={() => opcaoSelecionada == "continuar" ? setOpcaoSelecionada("") : setOpcaoSelecionada("continuar")}
          className={`${styles.selectButton} ${opcaoSelecionada == "continuar" ? styles.selectButton_Select : ""}`}
        > <Upload /> Continuar
        </button>

        {
          opcaoSelecionada === "novo" && 
          <Novo_Inicio_Componets 
            className={styles.form}
            next={(e) => {
              setSucessNext(true);
              setPerfil(e);
            }}
          />
        }

        {
          opcaoSelecionada === "continuar" && 
          <Upload_Inicio_Componets
            className={styles.form}
            next={(e) => {
              setSucessNext(true);
              setPerfil(e);
            }}
          />
        }

          
      </div>

    </div>
  )
}




{/* <div className="w-full flex items-center justify-center p-8">

        <div className="w-full max-w-md space-y-8"> */}






{/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
                       className="w-4 h-4 mr-2 inline" />
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
          
          </div> */}

{/* </div>

      </div> */}





// export default TelaInicio;
