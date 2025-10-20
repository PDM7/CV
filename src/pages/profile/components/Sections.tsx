import React, { useState, useRef } from "react";
import ExperienciaGenericaItem from "./ExperienciaGenericaItem";
import type {
  Experiencia,
  NovaExperiencia,
  BaseExperiencia,
} from "../../../types/profile";

import { useUser } from "../../../contexts/UserContext";

export default function ExperienciasCertificadosSection() {
  const { perfil, setPerfil } = useUser();
  const [newCustomSectionName, setNewCustomSectionName] = useState("");
  const [showNewCustomSectionInput, setShowNewCustomSectionInput] =
    useState(false);

  const tempIdCounter = useRef(0);

  const handleExpChange = <K extends keyof BaseExperiencia>(
    id: number | string,
    field: K,
    value: BaseExperiencia[K]
  ) => {
    const novasExp = perfil.experiencias.map((exp) => {
      const expId = "chave" in exp ? exp.chave : exp.tempId;
      if (expId === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setPerfil({ ...perfil, experiencias: novasExp });
  };

  const handleAddExperiencia = (tipo: string, nomePadrao: string) => {
    tempIdCounter.current += 1;
    const novaExp: NovaExperiencia = {
      tempId: `temp-${tempIdCounter.current}`,
      chave_perfil: perfil.chave,
      nome_experiencia: nomePadrao,
      tipo_experiencia: tipo,
      descricao_experiencia: "",
      periodo_inicio: "",
      periodo_fim: "",
      em_curso: false,
      hashtags: "",
      nome_instituicao: "",
      chave_instituicao: nomePadrao.toLowerCase().trim().replace(/\s+/g, "-"),
    };

    setPerfil({
      ...perfil,
      experiencias: [...perfil.experiencias, novaExp],
    });
  };

  const handleCreateCustomSection = () => {
    const nomeTrim = newCustomSectionName.trim();
    if (!nomeTrim) {
      alert("Por favor, insira um nome para a nova seção personalizada.");
      return;
    }

    const tipoPersonalizado = nomeTrim.replace(/\s+/g, "_");

    const existe = perfil.experiencias.some(
      (exp) => exp.tipo_experiencia === tipoPersonalizado
    );
    if (existe) {
      alert("Já existe uma seção com esse nome.");
      return;
    }

    handleAddExperiencia(tipoPersonalizado, nomeTrim);
    setNewCustomSectionName("");
    setShowNewCustomSectionInput(false);
  };

  const handleRemoveExp = (idToRemove: number | string) => {
    const novasExp = perfil.experiencias.filter(
      (exp) =>
        ("chave" in exp && exp.chave !== idToRemove) ||
        ("tempId" in exp && exp.tempId !== idToRemove)
    );
    setPerfil({ ...perfil, experiencias: novasExp });
  };

  const experienciasAgrupadas = perfil.experiencias.reduce(
    (acc: { [key: string]: (Experiencia | NovaExperiencia)[] }, exp) => {
      const tipo = exp.tipo_experiencia || "Outros";
      if (!acc[tipo]) acc[tipo] = [];
      acc[tipo].push(exp);
      return acc;
    },
    {}
  );

  const renderExperienceSection = (
    title: string,
    type: string,
    experiences: (Experiencia | NovaExperiencia)[]
  ) => (
    <div className="mb-6 p-4 border rounded-lg bg-base-100 shadow-sm">
      <h4 className="text-lg font-medium mb-3">{title}</h4>
      <div className="space-y-4">
        {experiences.map((exp, index) => {
          const expId =
            "chave" in exp && exp.chave != null ? exp.chave : exp.tempId;
          return (
            <ExperienciaGenericaItem
              key={`section-${type}-${expId}-${index}`}
              experiencia={exp}
              index={expId}
              onExpChange={handleExpChange}
              onRemove={() => handleRemoveExp(expId)}
            />
          );
        })}
      </div>
      <button
        className="btn btn-outline btn-sm mt-4"
        onClick={() =>
          handleAddExperiencia(
            type,
            `${
              type === "CERTIFICADO"
                ? "Novo certificado"
                : type === "EXPERIENCIA"
                ? "Nova experiência"
                : type.replace(/_/g, " ")
            }`
          )
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
        .filter(([type]) => type !== "EXPERIENCIA" && type !== "CERTIFICADO")
        .map(([type, experiences], index) => {
          const firstExp = experiences[0];
          const expId =
            "chave" in firstExp && firstExp.chave != null
              ? firstExp.chave
              : firstExp.tempId;
          return (
            <React.Fragment key={"section-" + type + "-" + expId}>
              {renderExperienceSection(
                type.replace(/_/g, " "),
                type,
                experiences
              )}
              {index <
                Object.entries(experienciasAgrupadas).filter(
                  ([t]) => t !== "EXPERIENCIA" && t !== "CERTIFICADO"
                ).length -
                  1 && <hr className="my-6" />}
            </React.Fragment>
          );
        })}

      {renderCustomSectionCreator()}
    </div>
  );
}
