import { Upload } from "lucide-react";



import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState, type ChangeEvent } from "react";
import type { Perfil } from "../../../types/profile";
import { emptyData } from "../../../default.data";



interface IProps {
    // onForm: (e: React.FormEvent) => void;
    className?: string;
    next: (perfil: Perfil) => void;
}

interface StartData {
    nome: string;
}

function dadosVazios(): StartData {
    return { nome: "" };
}



export function Upload_Inicio_Componets({ className, next }: IProps) {
    const [dadosInicio, setDadosInicio] = useState<StartData>(dadosVazios);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<"novo" | "continuar" | "">("");

    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const nav = useNavigate();
    let code = 0;



    const [buttonStutus, setButtonStutus] = useState({
        disabled: true,
        text: "Clique para selecionar o arquivo",
        code: 0
    });

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


    async function continuarProgresso(arquivo: File) {
        try {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    if(buttonStutus.code == 3) {
                        nav("/home");
                    };

                    const jsonData = JSON.parse(event.target?.result as string);                
                    if (!validarPerfil(jsonData)) {
                        setButtonStutus({
                            disabled: true,
                            text: "O arquivo inválido .Json pode estar corrompido",
                            code: 1
                        });
                    }

                    localStorage.setItem("profile", JSON.stringify(jsonData));
                    next(jsonData);

                    setButtonStutus({
                        disabled: false,
                        text: "Clique para continuar",
                        code: 3
                    });
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

    function validaJson(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (file && file.type !== "application/json") {
            setButtonStutus({
                disabled: true,
                text: "Arquivo inválido, selecione um arquivo .json",
                code: 1
            });

            return;
        }else if (file) {
            setButtonStutus({
                disabled: true,
                text: `${file.name} - Selecionado`,
                code: 2
            });
            
            continuarProgresso(file);
        }



        // const novoPerfil = { ...emptyData, ...{ nome: form.nome.value } };
        

        //     continuarProgresso(file);
        
    }


    function handleFileButtonClick() {
        fileInputRef.current?.click();

        setButtonStutus({
            disabled: true,
            text: "Selecionando arquivo...",
            code: 0
        });

    }

    return (
        <div
            className={[styles.page, className].join(" ")}
            style={{
                // backgroundImage: "url(/home/section2/fundo.png)"
            }}
        >
            <h3 className={styles.title}>
                {buttonStutus.code != 3 && <span className={styles.subtitle}> Selecione o arquivo .json salvo anteriormente para continuar </span>}
                {buttonStutus.code == 3 && <span className={styles.subtitle}> Arquivo carregado com sucesso! </span>}
            </h3>

            <input
                type="file"
                ref={fileInputRef}
                // accept=".json"
                onChange={validaJson}
                className={styles.hiddenInput}
            />

            <div className={[styles.buttonGroup, buttonStutus.code == 3 && styles.fullButton].join(" ")}>
                {buttonStutus.code != 3 && <button
                    type="button"
                    onClick={handleFileButtonClick}
                    className={[styles.loadFileButton, buttonStutus.code == 1 && styles.errorButton].join(" ")}
                    disabled={carregando}
                >
                    <Upload className="" />
                    {buttonStutus.text}
                    
                </button>
                }

                {buttonStutus.code != 3 && <button
                    type="submit"
                    className={styles.sendButton}
                    disabled={buttonStutus.code != 2}
                >Continuar</button>}

                {buttonStutus.code == 3 && <button
                    type="submit"
                    className={[styles.sendButton, styles.fullButton].join(" ")}
                    onClick={() => nav("/home")}
                >{buttonStutus.text}</button>}

            </div>

            <p className="text-xs text-gray-500 mt-3">
                Procure pelo arquivo .json que você salvou anteriormente
            </p>

            
        </div>
    )


}

