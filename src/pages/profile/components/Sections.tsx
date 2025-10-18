import React, { useState } from "react";
import ExperienciaGenericaItem from "./ExperienciaGenericaItem";
import type { BaseExperiencia } from "../../../types/user";
import { useUser } from "../../../contexts/UserContext";

export default function ExperienciasCertificadosSection() {
  const { perfil, setPerfil } = useUser();
  const [newCustomSectionName, setNewCustomSectionName] = useState("");
  const [showNewCustomSectionInput, setShowNewCustomSectionInput] =
    useState(false);

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

  const handleAddExperiencia = (tipo: string, nomePadrao: string) => {
    setPerfil({
      ...perfil,
      experiencias: [
        ...perfil.experiencias,
        {
          chave: `${tipo}-${Date.now()}`,
          nome_experiencia: nomePadrao,
          tipo_experiencia: tipo,
          descricao_experiencia: "",
          periodo_inicio: "",
          periodo_fim: "",
          em_curso: false,
          hashtags: "",
          nome_instituicao: "",
          chave_instituicao: Date.now().toString(),
          campos_personalizados: [],
        } as BaseExperiencia,
      ],
    });
  };

  const handleCreateCustomSection = () => {
    if (newCustomSectionName.trim() === "") {
      alert("Por favor, insira um nome para a nova seção personalizada.");
      return;
    }

    const customIndex =
      perfil.experiencias.filter((exp) =>
        exp.tipo_experiencia.startsWith("PERSONALIZADO_")
      ).length + 1;
    const tipoPersonalizado = `PERSONALIZADO_${customIndex}`;

    handleAddExperiencia(tipoPersonalizado, newCustomSectionName.trim());
    setNewCustomSectionName("");
    setShowNewCustomSectionInput(false);
  };

  const handleRemoveExp = (idToRemove: string) => {
    const novasExp = perfil.experiencias.filter((exp) => exp.chave !== idToRemove);
    setPerfil({ ...perfil, experiencias: novasExp });
  };

  const experienciasAgrupadas = perfil.experiencias.reduce(
    (acc: { [key: string]: BaseExperiencia[] }, exp) => {
      const tipo = exp.tipo_experiencia || "Outros";
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(exp);
      return acc;
    },
    {}
  );


  const renderExperienceSection = (
    title: string,
    type: string,
    experiences: BaseExperiencia[]
  ) => (
    <div className="mb-6 p-4 border rounded-lg bg-base-100 shadow-sm">
      <h4 className="text-lg font-medium mb-3">{title}</h4>
      <div className="space-y-4">
        {experiences.map((exp) => {
          const originalIndex = perfil.experiencias.findIndex(
            (item) => item.chave === exp.chave
          );
          return (
            <ExperienciaGenericaItem
              key={exp.chave}
              experiencia={exp}
              index={originalIndex}
              onExpChange={handleExpChange}
              onRemove={() => handleRemoveExp(exp.chave)}
            />
          );
        })}
      </div>
      <button
        className="btn btn-outline btn-sm mt-4"
        onClick={() =>
          handleAddExperiencia(type, `${type == "CERTIFICADO" ? "Novo certificado" : "Nova experiência"}`)
        }
      >
        ➕ Adicionar {title.replace(/s$/, "")}
      </button>
    </div>
  );

  const renderCustomSectionCreator = () => (
    <div className="mb-6 p-4 border rounded-lg bg-base-100 shadow-sm">
      <h4 className="text-lg font-medium mb-3">
        Criar Nova Seção Personalizada
      </h4>
      {!showNewCustomSectionInput ? (
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setShowNewCustomSectionInput(true)}
        >
          ➕ Criar Nova Seção
        </button>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered flex-grow"
            placeholder="Nome da nova seção (ex: Habilidades, Projetos)"
            value={newCustomSectionName}
            onChange={(e) => setNewCustomSectionName(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleCreateCustomSection}
          >
            Criar
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowNewCustomSectionInput(false)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">
        Gerenciar Experiências e Seções
      </h3>

      {renderExperienceSection(
        "Experiências Profissionais",
        "EXPERIENCIA",
        experienciasAgrupadas["EXPERIENCIA"] || []
      )}

     
      <hr className="my-6" />
      {renderExperienceSection(
        "Formações Acadêmicas",
        "CERTIFICADO",
        experienciasAgrupadas["CERTIFICADO"] || []
      )}
      <hr className="my-6" />

      {Object.entries(experienciasAgrupadas)
        .filter(([type]) => type.startsWith("PERSONALIZADO_"))
        .map(([type, experiences], index) => (
          <React.Fragment key={type + '-' + index}>
            {renderExperienceSection(
              experiences[0]?.nome_experiencia ||
                type.replace(/PERSONALIZADO_/, "").replace(/_/g, " "),
              type,
              experiences
            )}
            {index <
              Object.entries(experienciasAgrupadas).filter(([t]) =>
                t.startsWith("PERSONALIZADO_")
              ).length -
                1 && <hr className="my-6" />}
          </React.Fragment>
        ))}

      {Object.keys(experienciasAgrupadas).filter(([type]) =>
        type.startsWith("PERSONALIZADO_")
      ).length > 0 && <hr className="my-6" />}

      {renderCustomSectionCreator()}
    </div>
  );
}
