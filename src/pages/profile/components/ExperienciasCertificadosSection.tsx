import React from "react";
import ExperienciaItem from "./ExperienciaItem";
import CertificadoItem from "./CertificadoItem";
import type { Perfil, BaseExperiencia, ExperienciaProfissional, CertificadoAcademico } from "../PerfilPage"; 

interface ExperienciasCertificadosSectionProps {
  perfil: Perfil;
  setPerfil: React.Dispatch<React.SetStateAction<Perfil>>;
}

export default function ExperienciasCertificadosSection({
  perfil,
  setPerfil,
}: ExperienciasCertificadosSectionProps) {
  
  const handleExpChange = <K extends keyof BaseExperiencia>(
    index: number,
    field: K,
    value: BaseExperiencia[K]
  ) => {
    const novasExp = [...perfil.experiencias];

    novasExp[index] = {
      ...novasExp[index],
      [field]: value,
    };

    setPerfil({ ...perfil, experiencias: novasExp });
  };

  const handleAddExperiencia = () => {
    setPerfil({
      ...perfil,
      experiencias: [
        ...perfil.experiencias,
        {
          nome_experiencia: "",
          tipo_experiencia: "EXPERIENCIA",
          descricao_experiencia: "",
          periodo_inicio: "",
          periodo_fim: "",
          em_curso: false,
          hashtags: "",
          nome_instituicao: "",
          chave_instituicao: Date.now().toString(),
        } as ExperienciaProfissional,
      ],
    });
  };

  const handleAddCertificado = () => {
    setPerfil({
      ...perfil,
      experiencias: [
        ...perfil.experiencias,
        {
          nome_experiencia: "",
          tipo_experiencia: "CERTIFICADO",
          descricao_experiencia: "",
          periodo_inicio: "",
          periodo_fim: "",
          em_curso: false, 
          hashtags: "",
          nome_instituicao: "",
          chave_instituicao: Date.now().toString(),
        } as CertificadoAcademico,
      ],
    });
  };

  const handleRemoveExp = (index: number) => {
    const novasExp = perfil.experiencias.filter((_, i) => i !== index);
    setPerfil({ ...perfil, experiencias: novasExp });
  };

  // Filtrar experiências e certificados
  const experiencias = perfil.experiencias.filter(
    (exp): exp is ExperienciaProfissional => exp.tipo_experiencia === "EXPERIENCIA"
  );
  
  const certificados = perfil.experiencias.filter(
    (exp): exp is CertificadoAcademico => exp.tipo_experiencia === "CERTIFICADO"
  );

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Experiências e Certificados</h3>
      
      {/* Seção de Experiências */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2">Experiências</h4>
        
        {experiencias.map((exp) => {
          // Encontrar o índice real no array original
          const originalIndex = perfil.experiencias.findIndex(
            item => item.chave_instituicao === exp.chave_instituicao
          );
          
          return (
            <ExperienciaItem
              key={exp.chave_instituicao}
              experiencia={exp}
              index={originalIndex}
              onExpChange={handleExpChange}
              onRemove={handleRemoveExp}
            />
          );
        })}
        
        <button 
          className="btn btn-outline btn-sm mt-2" 
          onClick={handleAddExperiencia}
        >
          ➕ Adicionar Experiência
        </button>
      </div>

      {/* Seção de Certificados */}
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Certificados</h4>
        
        {certificados.map((cert) => {
          // Encontrar o índice real no array original
          const originalIndex = perfil.experiencias.findIndex(
            item => item.chave_instituicao === cert.chave_instituicao
          );
          
          return (
            <CertificadoItem
              key={cert.chave_instituicao}
              certificado={cert}
              index={originalIndex}
              onExpChange={handleExpChange}
              onRemove={handleRemoveExp}
            />
          );
        })}
        
        <button 
          className="btn btn-outline btn-sm mt-2" 
          onClick={handleAddCertificado}
        >
          ➕ Adicionar Certificado
        </button>
      </div>
    </div>
  );
}