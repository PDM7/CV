import React, { useState, ChangeEvent } from "react";

/* ======================================================
   TIPAGENS E MODELOS
====================================================== */
interface Campo {
  nome_campo: string;
  tipo_campo: string;
  valor_campo: string;
}

interface Experiencia {
  nome_experiencia: string;
  tipo_experiencia: string;
  descricao_experiencia: string;
  periodo_inicio: string;
  periodo_fim?: string;
  em_curso: boolean;
  hashtags: string;
  nome_instituicao: string;
  chave_instituicao: string;
}

interface Perfil {
  chave: number;
  nome: string;
  telefone: string;
  foto: string;
  resumo: string;
  campos: Campo[];
  experiencias: Experiencia[];
}

/* ======================================================
   COMPONENTE PRINCIPAL
====================================================== */
export default function PerfilForm() {
  const [perfil, setPerfil] = useState<Perfil>({
    chave: 1,
    nome: "João Silva",
    telefone: "(31) 99999-9999",
    foto: "https://via.placeholder.com/100",
    resumo:
      "Desenvolvedor Java com sólida experiência em sistemas corporativos e arquitetura de microsserviços.",
    campos: [
      {
        nome_campo: "LinkedIn",
        tipo_campo: "TEXTO",
        valor_campo: "linkedin.com/in/joaosilva",
      },
      {
        nome_campo: "GitHub",
        tipo_campo: "TEXTO",
        valor_campo: "github.com/joaosilva",
      },
    ],
    experiencias: [
      {
        nome_experiencia: "Desenvolvedor Java Sênior",
        tipo_experiencia: "EXPERIENCIA",
        descricao_experiencia:
          "Atuação em arquitetura de sistemas distribuídos e APIs RESTful com Spring Boot.",
        periodo_inicio: "2015-05-01",
        periodo_fim: "",
        em_curso: true,
        hashtags: "java springboot microservices",
        nome_instituicao: "Tech Solutions",
        chave_instituicao: "a1001",
      },
      {
        nome_experiencia: "Certificação Oracle Java SE 11 Developer",
        tipo_experiencia: "CERTIFICADO",
        descricao_experiencia:
          "Certificado oficial Oracle Java SE 11 Developer (1Z0-819).",
        periodo_inicio: "2020-06-01",
        periodo_fim: "2020-12-01",
        em_curso: false,
        hashtags: "oracle java certification",
        nome_instituicao: "Oracle University",
        chave_instituicao: "b1001",
      },
    ],
  });

  const handlePerfilChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Perfil salvo:\n" + JSON.stringify(perfil, null, 2));
  };

  return (
    <div className="p-8 bg-base-200 rounded-2xl shadow-lg m-5">
      <h2 className="text-2xl font-bold mb-5">Gerenciar Perfil</h2>

      {/* Seção principal */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <InputField
          label="Nome"
          name="nome"
          value={perfil.nome}
          onChange={handlePerfilChange}
        />
        <InputField
          label="Telefone"
          name="telefone"
          value={perfil.telefone}
          onChange={handlePerfilChange}
        />
        <InputField
          label="Foto (URL)"
          name="foto"
          value={perfil.foto}
          onChange={handlePerfilChange}
          fullWidth
        />
        <TextAreaField
          label="Resumo"
          name="resumo"
          value={perfil.resumo}
          onChange={handlePerfilChange}
        />
      </div>

      {/* Campos personalizados */}
      <CamposSection perfil={perfil} setPerfil={setPerfil} />

      {/* Experiências */}
      <ExperienciasSection perfil={perfil} setPerfil={setPerfil} />

      <div className="mt-6">
        <button className="btn btn-primary" onClick={handleSave}>
          💾 Salvar Perfil
        </button>
      </div>
    </div>
  );
}

/* ======================================================
   COMPONENTES DE ENTRADA BÁSICOS
====================================================== */
interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
}

function InputField({ label, name, value, onChange, fullWidth }: InputProps) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="label">{label}</label>
      <input
        name={name}
        className="input input-bordered w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaField({ label, name, value, onChange }: TextAreaProps) {
  return (
    <div className="col-span-2">
      <label className="label">{label}</label>
      <textarea
        name={name}
        className="textarea textarea-bordered w-full"
        rows={3}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

/* ======================================================
   CAMPOS PERSONALIZADOS
====================================================== */
interface CamposSectionProps {
  perfil: Perfil;
  setPerfil: React.Dispatch<React.SetStateAction<Perfil>>;
}

function CamposSection({ perfil, setPerfil }: CamposSectionProps) {
  const handleCampoChange = (index: number, field: keyof Campo, value: string) => {
    const novosCampos = [...perfil.campos];
    novosCampos[index][field] = value;
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

/* ======================================================
   EXPERIÊNCIAS E CERTIFICADOS
====================================================== */
interface ExperienciasSectionProps {
  perfil: Perfil;
  setPerfil: React.Dispatch<React.SetStateAction<Perfil>>;
}

function ExperienciasSection({ perfil, setPerfil }: ExperienciasSectionProps) {
  const handleExpChange = (
    index: number,
    field: keyof Experiencia,
    value: string | boolean
  ) => {
    const novasExp = [...perfil.experiencias];
    (novasExp[index][field] as any) = value;
    setPerfil({ ...perfil, experiencias: novasExp });
  };

  const handleAddExp = () => {
    setPerfil({
      ...perfil,
      experiencias: [
        ...perfil.experiencias,
        {
          nome_experiencia: "",
          tipo_experiencia: "EXPERIENCIA",
          descricao_experiencia: "",
          periodo_inicio: "",
          periodo_fim: "",
          em_curso: false,
          hashtags: "",
          nome_instituicao: "",
          chave_instituicao: "",
        },
      ],
    });
  };

  const handleRemoveExp = (index: number) => {
    const novasExp = perfil.experiencias.filter((_, i) => i !== index);
    setPerfil({ ...perfil, experiencias: novasExp });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Experiências e Certificados</h3>
      {perfil.experiencias.map((exp, index) => (
        <div key={index} className="border p-4 rounded-xl mb-4 bg-base-100">
          <div className="grid grid-cols-2 gap-2">
            <input
              className="input input-bordered"
              placeholder="Nome da Experiência"
              value={exp.nome_experiencia}
              onChange={(e) => handleExpChange(index, "nome_experiencia", e.target.value)}
            />
            <select
              className="select select-bordered"
              value={exp.tipo_experiencia}
              onChange={(e) => handleExpChange(index, "tipo_experiencia", e.target.value)}
            >
              <option value="EXPERIENCIA">EXPERIENCIA</option>
              <option value="CERTIFICADO">CERTIFICADO</option>
            </select>

            <input
              className="input input-bordered col-span-2"
              placeholder="Descrição"
              value={exp.descricao_experiencia}
              onChange={(e) =>
                handleExpChange(index, "descricao_experiencia", e.target.value)
              }
            />

            <input
              type="date"
              className="input input-bordered"
              value={exp.periodo_inicio}
              onChange={(e) => handleExpChange(index, "periodo_inicio", e.target.value)}
            />
            <input
              type="date"
              className="input input-bordered"
              value={exp.periodo_fim}
              onChange={(e) => handleExpChange(index, "periodo_fim", e.target.value)}
            />

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={exp.em_curso}
                onChange={(e) => handleExpChange(index, "em_curso", e.target.checked)}
              />
              <span>Em curso</span>
            </label>

            <input
              className="input input-bordered col-span-2"
              placeholder="Hashtags"
              value={exp.hashtags}
              onChange={(e) => handleExpChange(index, "hashtags", e.target.value)}
            />

            <input
              className="input input-bordered"
              placeholder="Instituição"
              value={exp.nome_instituicao}
              onChange={(e) => handleExpChange(index, "nome_instituicao", e.target.value)}
            />
            <input
              className="input input-bordered"
              placeholder="Chave Instituição"
              value={exp.chave_instituicao}
              onChange={(e) => handleExpChange(index, "chave_instituicao", e.target.value)}
            />
          </div>

          <div className="text-right mt-3">
            <button className="btn btn-error btn-xs" onClick={() => handleRemoveExp(index)}>
              Remover
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-outline btn-sm mt-2" onClick={handleAddExp}>
        ➕ Adicionar Experiência
      </button>
    </div>
  );
}
