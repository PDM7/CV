import { useState, useRef } from "react";
import Experiencia from "./Experiencia";
import type { NovaExperiencia, BaseExperiencia } from "../../../types/perfil";
import { useUser } from "../../../contexts/UserContext";

export default function ExperienciasCertificadosSection() {
  const { perfil, setPerfil } = useUser();

  const [gruposPadrao] = useState([
    "Formação Acadêmica",
    "Experiência Profissional",
    "Estágio",
    "Certificados",
    "Idiomas",
    "Hackatons",
  ]);

  const tempIdCounter = useRef(0);

  if (!perfil) return null;  

  const handleExpChange = <K extends keyof BaseExperiencia>(
    id: number | string,
    field: K,
    value: BaseExperiencia[K]
  ) => {
    setPerfil((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experiencias: prev.experiencias.map((exp) => {
          const expId = "chave" in exp ? exp.chave : exp.tempId;
          return expId === id ? { ...exp, [field]: value } : exp;
        }),
      };
    });
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

    setPerfil((prev) => {
      if (!prev) return prev;
      return { ...prev, experiencias: [...prev.experiencias, novaExp] };
    });
  };

  const handleRemoveExp = (idToRemove: number | string) => {
    setPerfil((prev) => {
      if (!prev) return prev;
      const novasExp = prev.experiencias.filter(
        (exp) =>
          ("chave" in exp && exp.chave !== idToRemove) ||
          ("tempId" in exp && exp.tempId !== idToRemove)
      );
      return { ...prev, experiencias: novasExp };
    });
  };

  const experiencia_array = perfil.experiencias ?? [];

  const experiencias = [
    ...gruposPadrao,
    ...experiencia_array
      .map((xp) => xp.tipo_experiencia)
      .filter((tipo) => !gruposPadrao.includes(tipo)),
  ].map((grupo) => {
    const nomeGrupo = grupo.replace(/_/g, " ");
    return {
      grupo: nomeGrupo,
      lista: experiencia_array.filter(
        (xp) => xp.tipo_experiencia === grupo
      ),
    };
  });

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Gerenciar Experiências</h3>

      {experiencias.map((secao) => (
        <div
          key={secao.grupo}
          className="mb-6 p-4 border rounded-lg bg-base-100 shadow-sm"
        >
          <h4 className="text-lg font-medium mb-3">{secao.grupo}</h4>

          {secao.lista.map((exp) => {
            const expId = "chave" in exp ? exp.chave : exp.tempId;

            return (
              <Experiencia
                key={expId}
                index={expId}
                experiencia={exp}
                onChange={handleExpChange}
                onRemove={handleRemoveExp}
              />
            );
          })}

          <button
            className="btn btn-outline btn-sm mt-4"
            onClick={() =>
              handleAddExperiencia(secao.grupo, `Nova ${secao.grupo}`)
            }
          >
            ➕ Adicionar {secao.grupo}
          </button>
        </div>
      ))}
    </div>
  );
}
