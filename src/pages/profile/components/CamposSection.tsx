import type { Campo, NovoCampo } from "../../../types/profile";
import { useRef } from "react";
import { useUser } from "../../../contexts/UserContext";
import { Trash2, Plus } from "lucide-react";


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
    <h3 className="text-xl font-semibold mb-3">Campos extras</h3>

    {perfil.campos.map((campo) => {
      const campoId = "chave" in campo ? campo.chave : campo.tempId;

      return (
        <div
          key={campoId}
          className="flex items-center gap-2 mb-2 p-2 rounded-md"
        >
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
            <option value="TEXTO">Texto</option>
            <option value="TEXTO_LONGO">Texto longo</option>
            <option value="URL">Link</option>
          </select>
          <input
            className="input input-bordered w-1/2"
            placeholder="Valor"
            value={campo.valor_campo}
            onChange={(e) =>
              handleCampoChange(campoId, "valor_campo", e.target.value)
            }
          />

          <button
            className="btn btn-error btn-sm flex items-center gap-1 hover:brightness-110 transition"
            onClick={() => handleRemoveCampo(campoId)}
            title="Remover campo"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Remover</span>
          </button>
        </div>
      );
    })}

    <button
      className="btn btn-outline btn-sm mt-2 flex items-center gap-1"
      onClick={handleAddCampo}
    >
      <Plus size={16} />
      Adicionar Campo
    </button>
  </div>
);

}

