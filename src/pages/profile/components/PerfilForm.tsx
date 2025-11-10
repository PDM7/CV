import type { ChangeEvent } from "react";
import CamposSection from "./CamposSection";

import { useUser } from "../../../contexts/UserContext";
import {
  Briefcase,
  GraduationCap,
  Languages,
  ListPlus,
  User,
  Save
} from "lucide-react";
import { AvatarUpload } from "../../../components/form/Avatar";
import ExperienciasSection from "./Sections";

export default function PerfilForm() {
  const { perfil, setPerfil, savePerfil } = useUser();

  const grupos = [
    "Certificados acadêmicos",
    "Experiências profissionais",
    "Idiomas",
  ];

  const handlePerfilChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  return (
     <div className="flex flex-col">
      {/* Cabeçalho com botão salvar */}
      <div className="flex justify-between items-center p-6 pb-1">
        <h1 className="text-2xl font-bold">Meu Perfil</h1>
        <button 
          className="btn btn-primary"
           onClick={savePerfil}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Perfil
        </button>
      </div>
      <div className="tabs tabs-lift p-6 pt-0">
        {/* Aba: Dados Pessoais */}
        <label className="tab">
          <input type="radio" name="profile_tabs" defaultChecked />
          <User className="me-1" /> Dados pessoais
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <AvatarUpload initialImage={perfil.foto} />

            <div className="flex flex-col gap-4 flex-1">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  name="nome"
                  className="input input-bordered w-full"
                  value={perfil.nome}
                  onChange={handlePerfilChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Telefone</span>
                </label>
                <input
                  name="telefone"
                  className="input input-bordered w-full"
                  value={perfil.telefone}
                  onChange={handlePerfilChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="label">Resumo</label>
            <textarea
              name="resumo"
              className="textarea textarea-bordered w-full"
              rows={3}
              value={perfil.resumo}
              onChange={handlePerfilChange}
            />
          </div>

          <CamposSection />
        </div>

        {/* Aba: Certificados */}
        <label className="tab">
          <input type="radio" name="profile_tabs" />
          <GraduationCap className="me-1" /> Certificados
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <ExperienciasSection incluir={[grupos[0]]} gruposPadrao={grupos} />
        </div>

        {/* Aba: Experiências Profissionais */}
        <label className="tab">
          <input type="radio" name="profile_tabs" />
          <Briefcase className="me-1" /> Experiências profissionais
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <ExperienciasSection incluir={[grupos[1]]} gruposPadrao={grupos} />
        </div>

        {/* Aba: Idiomas */}
        <label className="tab">
          <input type="radio" name="profile_tabs" />
          <Languages className="me-1" /> Linguagens
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <ExperienciasSection incluir={[grupos[2]]} gruposPadrao={grupos} />
        </div>

        {/* Aba: Seções Extras */}
        <label className="tab">
          <input type="radio" name="profile_tabs" />
          <ListPlus className="me-1" /> Seções extras
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <ExperienciasSection
            excluir={grupos}
            gruposPadrao={grupos}
            permitirCustomizacao
          />
        </div>
      </div>


    </div>
  );
}

