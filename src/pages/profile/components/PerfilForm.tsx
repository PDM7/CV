import type { ChangeEvent } from "react";
import CamposSection from "./CamposSection";
import Sections from "./Sections";
import { useUser } from "../../../contexts/UserContext";
export default function PerfilForm() {
  const { perfil, setPerfil, savePerfil } = useUser();
  const handlePerfilChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 bg-base-200 rounded-2xl shadow-lg m-5 curriculo-a4 max-w-6xl mx-auto my-8 ">
      <h2 className="text-2xl font-bold mb-5">Gerenciar Perfil</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="label display">Nome</label>
          <input
            name="nome"
            className="input input-bordered w-full"
            value={perfil.nome}
            onChange={handlePerfilChange}
          />
        </div>
        <div>
          <label className="label">Telefone</label>
          <input
            name="telefone"
            className="input input-bordered w-full"
            value={perfil.telefone}
            onChange={handlePerfilChange}
          />
        </div>
        <div className="col-span-2">
          <label className="label">Foto (URL)</label>
          <input
            name="foto"
            className="input input-bordered w-full"
            value={perfil.foto}
            onChange={handlePerfilChange}
          />
        </div>
        <div className="col-span-2">
          <label className="label">Resumo</label>
          <textarea
            name="resumo"
            className="textarea textarea-bordered w-full"
            rows={3}
            value={perfil.resumo}
            onChange={handlePerfilChange}
          />
        </div>
      </div>

      <CamposSection />

      <Sections />

      <div className="mt-6">
        <button className="btn btn-primary" onClick={savePerfil}>
          💾 Salvar Perfil
        </button>
      </div>
    </div>
  );
}

