import type {
  BaseExperiencia,
  Experiencia as ExpT,
  NovaExperiencia,
} from "../../../types/profile";

interface ExperienciaProps {
  experiencia: ExpT | NovaExperiencia;
  index: number | string;
  onChange: <K extends keyof BaseExperiencia>(
    index: number | string,
    field: K,
    value: BaseExperiencia[K]
  ) => void;
  onRemove: (id: number | string) => void;
}

export default function Experiencia({
  experiencia,
  index,
  onChange,
  onRemove,
}: ExperienciaProps) {
 return (
  <div className="bg-base-200 rounded-xl p-4 shadow-sm border">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Nome da Experiência */}
      <label className="block mb-1 text-sm font-medium">
        Nome da experiência
        <input
          className="input input-bordered w-full"
          placeholder="Nome da Experiência"
          value={experiencia.nome_experiencia || ""}
          onChange={(e) => onChange(index, "nome_experiencia", e.target.value)}
        />
      </label>

      {/* Instituição */}
      <label className="block mb-1 text-sm font-medium">
        Instituição
        <input
          className="input input-bordered w-full"
          placeholder="Instituição"
          value={experiencia.nome_instituicao || ""}
          onChange={(e) => onChange(index, "nome_instituicao", e.target.value)}
        />
      </label>

      {/* Resumo / Descrição */}
      <label className="block mb-1 text-sm font-medium col-span-1 md:col-span-2">
        Resumo
        <textarea
          className="input input-bordered w-full h-20 resize-none"
          placeholder="Descrição"
          value={experiencia.descricao_experiencia || ""}
          onChange={(e) =>
            onChange(index, "descricao_experiencia", e.target.value)
          }
        />
      </label>

      {/* Data de Início */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Data de Início
          <input
            type="date"
            className="input input-bordered w-full"
            value={experiencia.periodo_inicio || ""}
            onChange={(e) =>
              onChange(index, "periodo_inicio", e.target.value)
            }
          />
        </label>

        <div className="mt-1 flex items-center">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={experiencia.em_curso || false}
            onChange={(e) => onChange(index, "em_curso", e.target.checked)}
            id={`emCurso-${index}`}
          />
          <label
            htmlFor={`emCurso-${index}`}
            className="ml-2 text-sm text-gray-500"
          >
            Em curso
          </label>
        </div>
      </div>

      {/* Data de Fim */}
      <label className="block mb-1 text-sm font-medium">
        Data de Fim
        <input
          type="date"
          className="input input-bordered w-full"
          value={experiencia.periodo_fim || ""}
          onChange={(e) => onChange(index, "periodo_fim", e.target.value)}
          disabled={experiencia.em_curso}
        />
      </label>

      {/* Hashtags */}
      <label className="block mb-1 text-sm font-medium col-span-1 md:col-span-2">
        Hashtags
        <input
          className="input input-bordered w-full"
          placeholder="Hashtags"
          value={experiencia.hashtags || ""}
          onChange={(e) => onChange(index, "hashtags", e.target.value)}
        />
      </label>

   

      {/* Chave Instituição (oculto) */}
      <input
        type="hidden"
        value={experiencia.chave_instituicao || ""}
        onChange={(e) => onChange(index, "chave_instituicao", e.target.value)}
      />
    </div>

    <div className="text-right mt-3">
      <button
        className="btn btn-error btn-xs"
        onClick={() => onRemove(index)}
      >
        Remover Entrada
      </button>
    </div>
  </div>
);

}
