import { useState } from "react";

interface CreateCustomSectionProps {
  onCriarNovaSecao: (sectionName: string) => void;
  onAddExperiencia: (tipo: string, nomePadrao: string) => void;
  gruposExistentes: string[];
}

export default function CreateCustomSection({
  onCriarNovaSecao,
  onAddExperiencia,
  gruposExistentes,
}: CreateCustomSectionProps) {
  const [newCustomSectionName, setNomeNovaSecao] = useState("");
  const [showNewCustomSectionInput, setExibirNovaSecao] = useState(false);

  const handleCriarSecaoCustom = () => {
    const nomeTrim = newCustomSectionName.trim();
    if (!nomeTrim) {
      alert("Por favor, insira um nome para a nova seção personalizada.");
      return;
    }

    const tipoPersonalizado = nomeTrim.replace(/\s+/g, "_");

    if (gruposExistentes.includes(tipoPersonalizado)) {
      alert("Já existe uma seção com esse nome.");
      return;
    }

    onAddExperiencia(tipoPersonalizado, nomeTrim);
    onCriarNovaSecao(tipoPersonalizado);
    setNomeNovaSecao("");
    setExibirNovaSecao(false);
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-base-100 shadow-sm">
      <h4 className="text-lg font-medium mb-3">
        Criar Nova Seção Personalizada
      </h4>
      {!showNewCustomSectionInput ? (
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setExibirNovaSecao(true)}
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
            onChange={(e) => setNomeNovaSecao(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleCriarSecaoCustom}
          >
            Criar
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setExibirNovaSecao(false)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

