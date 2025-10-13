import type { BaseExperiencia, CertificadoAcademico } from "../PerfilPage";

interface CertificadoItemProps {
  certificado: CertificadoAcademico;
  index: number;
    onExpChange: <K extends keyof BaseExperiencia>(
      index: number,
      field: K,
      value: BaseExperiencia[K]
    ) => void;
  onRemove: (index: number) => void;
}

export default function CertificadoItem({
  certificado,
  index,
  onExpChange,
  onRemove,
}: CertificadoItemProps) {
  return (
    <div className="border p-4 rounded-xl mb-4 bg-base-100">
      <h4 className="text-lg font-semibold mb-2">Certificado</h4>
      <div className="grid grid-cols-2 gap-2">
        <input
          className="input input-bordered"
          placeholder="Nome do Certificado"
          value={certificado.nome_experiencia}
          onChange={(e) => onExpChange(index, "nome_experiencia", e.target.value)}
        />
        <input
          className="input input-bordered col-span-2"
          placeholder="Descrição"
          value={certificado.descricao_experiencia}
          onChange={(e) => onExpChange(index, "descricao_experiencia", e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered"
          value={certificado.periodo_inicio}
          onChange={(e) => onExpChange(index, "periodo_inicio", e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered"
          value={certificado.periodo_fim}
          onChange={(e) => onExpChange(index, "periodo_fim", e.target.value)}
        />
        <input
          className="input input-bordered col-span-2"
          placeholder="Hashtags (separadas por espaço)"
          value={certificado.hashtags}
          onChange={(e) => onExpChange(index, "hashtags", e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Instituição"
          value={certificado.nome_instituicao}
          onChange={(e) => onExpChange(index, "nome_instituicao", e.target.value)}
        />
        <input
          className="input input-bordered"
          placeholder="Chave Instituição"
          value={certificado.chave_instituicao}
          onChange={(e) => onExpChange(index, "chave_instituicao", e.target.value)}
        />
      </div>
      <div className="text-right mt-3">
        <button className="btn btn-error btn-xs" onClick={() => onRemove(index)}>
          Remover Certificado
        </button>
      </div>
    </div>
  );
}

