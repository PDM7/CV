import type { Campo, NovoCampo } from "../../../types/profile";
import { useRef } from "react";
import { useUser } from "../../../contexts/UserContext";


export default function CamposSection() {
  const tempIdCounter = useRef(0);
  const { perfil, setPerfil } = useUser();

    const handleCampoChange = (
    id: number | string,
    field: keyof (Campo | NovoCampo),
    value: string
  ) => {
    const novosCampos = perfil.campos.map((campo) => {
      const campoId = "chave" in campo ? campo.chave : campo.tempId;
      if (campoId === id) {
        return { ...campo, [field]: value };
      }
      return campo;
    });
    setPerfil({ ...perfil, campos: novosCampos });
  };


  const handleAddCampo = () => {
    tempIdCounter.current += 1;
    const novoCampo: NovoCampo = {
      tempId: `temp-${tempIdCounter.current}`,
      chave_perfil: perfil.chave,
      nome_campo: "",
      tipo_campo: "TEXTO",
      valor_campo: "",
    };
    setPerfil({
      ...perfil,
      campos: [...perfil.campos, novoCampo],
    });
  };

  const handleRemoveCampo = (idToRemove: number | string) => {
    const novosCampos = perfil.campos.filter(
      (campo) =>
        ("chave" in campo && campo.chave !== idToRemove) ||
        ("tempId" in campo && campo.tempId !== idToRemove)
    );
    setPerfil({ ...perfil, campos: novosCampos });
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Campos Personalizados</h3>
      {perfil.campos.map((campo) => {
        const campoId = "chave" in campo ? campo.chave : campo.tempId; return (
                <div key={campoId} className="flex gap-2 mb-2">
          <input
            className="input input-bordered w-1/4"
            placeholder="Nome"
            value={campo.nome_campo}
                        onChange={(e) =>
              handleCampoChange(campoId, "nome_campo", e.target.value)
            }
          />
          <select
            className="select select-bordered w-1/4"
            value={campo.tipo_campo}
                        onChange={(e) =>
              handleCampoChange(campoId, "tipo_campo", e.target.value)
            }
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
                        onChange={(e) =>
              handleCampoChange(campoId, "valor_campo", e.target.value)
            }
          />
          <button className="btn btn-error btn-sm"             onClick={() => handleRemoveCampo(campoId)}>
            ❌
          </button>
        </div>
      )})}
      <button className="btn btn-outline btn-sm mt-2" onClick={handleAddCampo}>
        ➕ Adicionar Campo
      </button>
    </div>
  );
}

