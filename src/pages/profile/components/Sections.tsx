import { useRef } from "react";
import Experiencia from "./Experiencia";
import SecoesCustom from "./SecoesCustom";
import type { NovaExperiencia, BaseExperiencia } from "../../../types/profile";
import { useUser } from "../../../contexts/UserContext";

export default function ExperienciasSection({
  incluir,
  excluir,
  gruposPadrao = [],
  permitirCustomizacao = false,
}: {
  incluir?: string[];
  excluir?: string[];
  gruposPadrao?: string[];
  permitirCustomizacao?: boolean;
}) {
  const { perfil, setPerfil } = useUser();
  const tempIdCounter = useRef(0);

  const handleExpChange = <K extends keyof BaseExperiencia>(
    id: number | string,
    field: K,
    value: BaseExperiencia[K]
  ) => {
    setPerfil((prev) => ({
      ...prev,
      experiencias: prev.experiencias.map((exp) => {
        const expId = "chave" in exp ? exp.chave : exp.tempId;
        return expId === id ? { ...exp, [field]: value } : exp;
      }),
    }));
  };

  const handleAddExperiencia = (tipo: string, nomePadrao: string) => {
    tempIdCounter.current++;
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
    setPerfil((p) => ({ ...p, experiencias: [...p.experiencias, novaExp] }));
  };

  const handleRemoveExp = (id: number | string) =>
    setPerfil((p) => ({
      ...p,
      experiencias: p.experiencias.filter((exp) => {
        const expId = "chave" in exp ? exp.chave : exp.tempId;
        return expId !== id;
      }),
    }));

  const todosGrupos = Array.from(
    new Set([
      ...gruposPadrao,
      ...perfil.experiencias.map((xp) => xp.tipo_experiencia),
    ])
  );

  const grupos = incluir
    ? todosGrupos.filter((g) => incluir.includes(g))
    : excluir
    ? todosGrupos.filter((g) => !excluir.includes(g))
    : todosGrupos;


  return (
    <div className="mb-6 space-y-6">
      {grupos.map((grupo) => {
        const lista = perfil.experiencias.filter(
          (xp) => xp.tipo_experiencia === grupo
        );

        return (
          <div key={grupo} className="p-4 rounded-lg bg-base-100 shadow-md">
            <h4 className="text-lg font-medium mb-4 border-b pb-2">
              {grupo.replace(/_/g, " ")}
            </h4>

            <div className="space-y-4">
              {lista.length > 0 ? (
                lista.map((exp) => {
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
                })
              ) : (
                <div className="p-4 bg-base-200 border border-dashed rounded-lg text-center text-gray-500">
                  Nenhum "{grupo.replace(/_/g, " ")}" encontrado.
                </div>
              )}
            </div>

            <button
              className="btn btn-outline btn-sm mt-4"
              onClick={() =>
                handleAddExperiencia(grupo, `Nova ${grupo.replace(/_/g, " ")}`)
              }
            >
              ➕ Adicionar {grupo.replace(/_/g, " ")}
            </button>
          </div>
        );
      })}

      {permitirCustomizacao && (
        <SecoesCustom
          onCriarNovaSecao={(tipoPersonalizado) =>
            handleAddExperiencia(
              tipoPersonalizado,
              `Nova ${tipoPersonalizado.replace(/_/g, " ")}`
            )
          }
          onAddExperiencia={handleAddExperiencia}
          gruposExistentes={gruposPadrao}
        />
      )}
    </div>
  );
}
