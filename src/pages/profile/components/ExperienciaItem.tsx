import type { BaseExperiencia, ExperienciaProfissional } from "../PerfilPage";

interface ExperienciaItemProps {
  experiencia: ExperienciaProfissional;
  index: number;
  onExpChange: <K extends keyof BaseExperiencia>(
    index: number,
    field: K,
    value: BaseExperiencia[K]
  ) => void;
  onRemove: (index: number) => void;
}

export default function ExperienciaItem({
  experiencia,
  index,
  onExpChange,
  onRemove,
}: ExperienciaItemProps) {
  return (
    <div className="border p-4 rounded-xl mb-4 bg-base-100">
      <h4 className="text-lg font-semibold mb-2">Experiência Profissional</h4>
      <div className="grid grid-cols-2 gap-2">
        <input
          className="input input-bordered"
          placeholder="Nome da Experiência"
          value={experiencia.nome_experiencia}
          onChange={(e) => onExpChange(index, "nome_experiencia", e.target.value)}
        />
        <input
          className="input input-bordered col-span-2"
          placeholder="Descrição"
          value={experiencia.descricao_experiencia}
          onChange={(e) => onExpChange(index, "descricao_experiencia", e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered"
          value={experiencia.periodo_inicio}
          onChange={(e) => onExpChange(index, "periodo_inicio", e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered"
          value={experiencia.periodo_fim}
          onChange={(e) => onExpChange(index, "periodo_fim", e.target.value)}
          disabled={experiencia.em_curso}
        />
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={experiencia.em_curso}
            onChange={(e) => onExpChange(index, "em_curso", e.target.checked)}
          />
          <span>Em curso</span>
        </label>
        <input
          className="input input-bordered col-span-2"
          placeholder="Hashtags (separadas por espaço)"
          value={experiencia.hashtags}
          onChange={(e) => onExpChange(index, "hashtags", e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Instituição"
          value={experiencia.nome_instituicao}
          onChange={(e) => onExpChange(index, "nome_instituicao", e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Chave Instituição"
          value={experiencia.chave_instituicao}
          onChange={(e) => onExpChange(index, "chave_instituicao", e.target.value)}
        />
      </div>
      <div className="text-right mt-3">
        <button className="btn btn-error btn-xs" onClick={() => onRemove(index)}>
          Remover Experiência
        </button>
      </div>
    </div>
  );
}

