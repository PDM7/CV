import type { Campo } from "../../../types/user";
import { useUser } from "../../../contexts/UserContext";


export default function CamposSection() {
  const { perfil, setPerfil } = useUser();

  const handleCampoChange = (index: number, field: keyof Campo, value: string) => {
    const novosCampos = [...perfil.campos];
    novosCampos[index] = { ...novosCampos[index], [field]: value };
    setPerfil({ ...perfil, campos: novosCampos });
  };

  const handleAddCampo = () => {
    setPerfil({
      ...perfil,
      campos: [...perfil.campos, { nome_campo: "", tipo_campo: "TEXTO", valor_campo: "" }],
    });
  };

  const handleRemoveCampo = (index: number) => {
    const novosCampos = perfil.campos.filter((_, i) => i !== index);
    setPerfil({ ...perfil, campos: novosCampos });
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Campos Personalizados</h3>
      {perfil.campos.map((campo, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            className="input input-bordered w-1/4"
            placeholder="Nome"
            value={campo.nome_campo}
            onChange={(e) => handleCampoChange(index, "nome_campo", e.target.value)}
          />
          <select
            className="select select-bordered w-1/4"
            value={campo.tipo_campo}
            onChange={(e) => handleCampoChange(index, "tipo_campo", e.target.value)}
          >
            <option value="TEXTO">TEXTO</option>
            <option value="NUMERO">NUMERO</option>
            <option value="DATA">DATA</option>
            <option value="URL">URL</option>
          </select>
          <input
            className="input input-bordered w-1/2"
            placeholder="Valor"
            value={campo.valor_campo}
            onChange={(e) => handleCampoChange(index, "valor_campo", e.target.value)}
          />
          <button className="btn btn-error btn-sm" onClick={() => handleRemoveCampo(index)}>
            ❌
          </button>
        </div>
      ))}
      <button className="btn btn-outline btn-sm mt-2" onClick={handleAddCampo}>
        ➕ Adicionar Campo
      </button>
    </div>
  );
}

