import { useState, type ChangeEvent } from "react";
import CamposSection from "./CamposSection";

import { useUser } from "../../../contexts/UserContext";
import {
  Briefcase,
  GraduationCap,
  Languages,
  ListPlus,
  User,
  Save,
  Eye,
} from "lucide-react";
import { AvatarUpload } from "../../../components/form/Avatar";
import ExperienciasSection from "./Sections";
import { useNavigate } from "react-router-dom";

export default function PerfilForm() {
  const nav = useNavigate();
  const { perfil, setPerfil, savePerfil, isSaving } = useUser();
  const [file, setFile] = useState<File | null>(null);

  const grupos = [
    "Certificados acadêmicos",
    "Experiências profissionais",
    "Idiomas",
  ];

  // No componente principal
  const handlePerfilChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (
      target instanceof HTMLInputElement &&
      target.type === "file" &&
      target.files &&
      target.files[0]
    ) {
      const selectedFile = target.files[0];
      setFile(selectedFile); // guarda só no estado local

      const fileURL = URL.createObjectURL(selectedFile);
      setPerfil((prev) => ({
        ...prev,
        foto: fileURL, // preview temporário
      }));
    } else {
      const { name, value } = target;
      setPerfil((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    await savePerfil(file ?? undefined);
    setFile(null);
  };

  return (
    <div className="container mx-auto flex flex-col">
      {/* Cabeçalho com botão salvar */}
      <div className="flex justify-between items-center p-6 pb-1">
        <h1 className="text-2xl font-bold">Meu Perfil</h1>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Perfil"}
        </button>
      </div>
      <div className="tabs tabs-lift p-6 pt-0">
        {/* Dados Pessoais */}
        <label className="tab">
          <input type="radio" name="profile_tabs" defaultChecked />
          <User className="me-1" /> Dados pessoais
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <AvatarUpload
              initialImage={perfil.foto}
              handlePerfilChange={handlePerfilChange}
            />

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

      {/* Botão flutuante fixo */}
      <div className="fixed bottom-6 right-6">
        <div className="dropdown dropdown-top dropdown-end">
          <label tabIndex={0} className="btn btn-primary btn-circle shadow-lg">
            <Eye />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48"
          >
            <li>
              <button onClick={() => nav("/lattes")}>Lattes</button>
            </li>
            <li>
              <button onClick={() => nav("/vitae")}>Vitae</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
