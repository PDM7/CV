
import { User } from "lucide-react";
import styles from "./styles.module.css";
import { useState } from "react";
import { emptyData } from "../../../default.data";
import { useNavigate } from "react-router-dom";
import { nextTick } from "process";
import type { Perfil } from "../../../types/profile";


interface IProps {
    // onForm: (e: React.FormEvent) => void;
    className?: string;
    next: (perfil: Perfil) => void;
}

export function Novo_Inicio_Componets({ className, next }: IProps) {
    const nav = useNavigate();


    const [buttonStutus, setButtonStutus] = useState({
        disabled: true,
        text: "Preencher seu nome"
    });

    async function send(event: React.FormEvent) {
        try {
            event.preventDefault();

            if(buttonStutus.text == "Clique para continuar") {
                nav("/");
            };
            
            setButtonStutus({
                disabled: true,
                text: "Iniciando..."
            });

            const form = event.target as HTMLFormElement;
            const novoPerfil = { ...emptyData, ...{ nome: form.nome.value } };
            
            if (localStorage.getItem("profile") !== null) {
                localStorage.removeItem("profile");
            }
            
            localStorage.setItem("profile", JSON.stringify(novoPerfil));

            next(novoPerfil);

            setButtonStutus({
                disabled: false,
                text: "Clique para continuar"
            });
            
        } catch (e) {
        // console.error(e);
        // setErro("Erro ao iniciar nova sessão.");
        } finally {
        // setCarregando(false);
        }
    }

    return (
        <form 
            onSubmit={send} 
            className={[styles.form, className].join(" ")}
        >

            <div className={styles.inputGroup}>

                <label> Qual é o seu nome? </label>

                <div className={styles.inputBox}>
                    <User/>

                    <input
                        className={[styles.input].join(" ")}
                        id="nome"
                        type="text"
                        name="nome"
                        // value={dadosInicio.nome}
                        onChange={(e) => {
                            if(e.target.value.trim().length > 0) {
                                setButtonStutus({
                                    disabled: false,
                                    text: "Começar Agora"
                                });
                            }else {
                                setButtonStutus({
                                    disabled: true,
                                    text: "Preencher seu nome"
                                });
                            }
                        }}
                        placeholder="Digite seu nome"
                        required
                    />  
                </div>

            </div>

            <button
                type="submit"
                className={styles.sendButton}
                disabled={buttonStutus.disabled}
            > 
                {buttonStutus.text}
            {/* {carregando ? (
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
            */}
            </button>
        </form>
    )
}