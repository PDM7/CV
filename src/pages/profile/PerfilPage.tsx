import { useState } from "react";
import PerfilForm from "./components/PerfilForm";
import CurriculoView from "./components/CurriculoView";

export interface Campo {
  nome_campo: string;
  tipo_campo: string;
  valor_campo: string;
}

export interface BaseExperiencia {
  nome_experiencia: string;
  descricao_experiencia: string;
  periodo_inicio: string;
  periodo_fim?: string;
  em_curso: boolean;
  hashtags: string;
  nome_instituicao: string;
  chave_instituicao: string;
}

export interface ExperienciaProfissional extends BaseExperiencia {
  tipo_experiencia: "EXPERIENCIA";
}

export interface CertificadoAcademico extends BaseExperiencia {
  tipo_experiencia: "CERTIFICADO";
}

export type Experiencia = ExperienciaProfissional | CertificadoAcademico;

export interface Perfil {
  chave: number;
  nome: string;
  telefone: string;
  foto: string;
  resumo: string;
  campos: Campo[];
  experiencias: Experiencia[];
}

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil>({
    chave: 1,
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    foto: "https://via.placeholder.com/150",
    resumo: "Desenvolvedor Fullstack com experiência em React, Node.js e bancos de dados relacionais e não relacionais. Apaixonado por criar soluções escaláveis e eficientes.",
    campos: [
      { nome_campo: "Email", tipo_campo: "TEXTO", valor_campo: "joao.silva@example.com" },
      { nome_campo: "LinkedIn", tipo_campo: "TEXTO", valor_campo: "linkedin.com/in/joaosilva" },
      { nome_campo: "GitHub", tipo_campo: "TEXTO", valor_campo: "github.com/joaosilva" },
    ],
    experiencias: [
      {
        nome_experiencia: "Desenvolvedor Sênior",
        tipo_experiencia: "EXPERIENCIA",
        descricao_experiencia: "Desenvolvimento e manutenção de aplicações web utilizando React e Node.js.",
        periodo_inicio: "2020-01",
        periodo_fim: "",
        em_curso: true,
        hashtags: "react nodejs javascript typescript",
        nome_instituicao: "Tech Solutions Ltda.",
        chave_instituicao: "tech-solutions-1",
      },
      {
        nome_experiencia: "Desenvolvedor Pleno",
        tipo_experiencia: "EXPERIENCIA",
        descricao_experiencia: "Participação no desenvolvimento de novas funcionalidades e correção de bugs.",
        periodo_inicio: "2018-03",
        periodo_fim: "2019-12",
        em_curso: false,
        hashtags: "angular java springboot",
        nome_instituicao: "Web Innovators S.A.",
        chave_instituicao: "web-innovators-1",
      },
      {
        nome_experiencia: "Certificado AWS Cloud Practitioner",
        tipo_experiencia: "CERTIFICADO",
        descricao_experiencia: "Certificação fundamental em conceitos de nuvem AWS.",
        periodo_inicio: "2023-05",
        periodo_fim: "",
        em_curso: false,
        hashtags: "aws cloud certificacao",
        nome_instituicao: "Amazon Web Services",
        chave_instituicao: "aws-cert-1",
      },
    ],
  });

  const [mostrarCurriculo, setMostrarCurriculo] = useState(false);

  const handleSave = () => {
    alert("Perfil salvo:\n" + JSON.stringify(perfil, null, 2));
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <button 
          className="btn btn-secondary"
          onClick={() => setMostrarCurriculo(!mostrarCurriculo)}
        >
          {mostrarCurriculo ? "📝 Editar Perfil" : "👁️ Visualizar Currículo"}
        </button>
      </div>

      {mostrarCurriculo ? (
        <CurriculoView perfil={perfil} />
      ) : (
        <PerfilForm perfil={perfil} setPerfil={setPerfil} onSave={handleSave} />
      )}
    </div>
  );
}

