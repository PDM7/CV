import { Upload } from "lucide-react";



import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState, type ChangeEvent } from "react";
import type { Perfil } from "../../../types/profile";



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



    const [buttonStutus, setButtonStutus] = useState({
        disabled: true,
        text: "Clique para selecionar o arquivo"
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

    // não é usado - gustavo 12/11/2025
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
        <div
            className={[styles.page, className].join(" ")}
            style={{
                // backgroundImage: "url(/home/section2/fundo.png)"
            }}
        >
            <h3 className={styles.title}>
                Carregar Progresso Salvo
            </h3>

            <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleFileSelect}
                className={styles.hiddenInput}
            />

            <button
                type="button"
                onClick={handleFileButtonClick}
                className={styles.loadFileButton}
                disabled={carregando}
            >
                <Upload className="" />
                {buttonStutus.text}
            </button>

            <p className="text-xs text-gray-500 mt-3">
                Procure pelo arquivo .json que você salvou anteriormente
            </p>
        </div>
    )


}

