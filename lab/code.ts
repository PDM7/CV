import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface TipoExperiencia {
  nome_tipo_experiencia: string;
  titulo_tipo_experiencia?: string;
}

interface Campo {
  nome_campo: string;
  tipo_campo: string;
  valor_campo: string;
}

interface Experiencia {
  nome_experiencia: string;
  tipo_experiencia: string;
  descricao_experiencia?: string;
  periodo_inicio?: string;
  periodo_fim?: string;
  em_curso?: boolean;
  hashtags?: string;
  nome_instituicao?: string;
  chave_instituicao?: string;
}

interface Perfil {
  chave: number;
  nome: string;
  telefone: string;
  foto?: string;
  resumo?: string;
  campos: Campo[];
  experiencias: Experiencia[];
}

interface Props {
  data: Perfil[];
}

export default function PerfilViewer({ data }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {data.map((perfil) => (
        <Card key={perfil.chave} className="shadow-lg rounded-2xl p-4">
          <CardHeader>
            <div className="flex items-center gap-4">
              {perfil.foto && (
                <img
                  src={perfil.foto}
                  alt={perfil.nome}
                  className="w-16 h-16 rounded-full object-cover border"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{perfil.nome}</h2>
                <p className="text-sm text-gray-500">{perfil.telefone}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {perfil.resumo && (
              <p className="text-gray-700 mt-2 mb-4">{perfil.resumo}</p>
            )}

            {/* Campos personalizados */}
            {perfil.campos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2 text-blue-700">
                  Campos Personalizados
                </h3>
                <ul className="space-y-1 text-sm">
                  {perfil.campos.map((campo, i) => (
                    <li key={i} className="flex justify-between border-b py-1">
                      <span className="font-medium">{campo.nome_campo}</span>
                      <span>{campo.valor_campo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Agrupar experiências por tipo */}
            {(() => {
              const grupos = perfil.experiencias.reduce(
                (acc: Record<string, Experiencia[]>, exp) => {
                  acc[exp.tipo_experiencia] = acc[exp.tipo_experiencia] || [];
                  acc[exp.tipo_experiencia].push(exp);
                  return acc;
                },
                {}
              );

              return Object.entries(grupos).map(([tipo, exps]) => (
                <div key={tipo} className="mb-6">
                  <h3 className="font-semibold text-green-700 mb-2">
                    {tipo.toUpperCase()}
                  </h3>
                  <div className="space-y-3">
                    {exps.map((exp, i) => (
                      <div
                        key={i}
                        className="border rounded-xl p-3 bg-gray-50 shadow-sm"
                      >
                        <h4 className="font-semibold text-gray-800">
                          {exp.nome_experiencia}
                        </h4>
                        {exp.nome_instituicao && (
                          <p className="text-sm text-gray-600">
                            {exp.nome_instituicao}
                          </p>
                        )}
                        {exp.descricao_experiencia && (
                          <p className="text-sm text-gray-700 mt-1">
                            {exp.descricao_experiencia}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {exp.periodo_inicio
                            ? new Date(exp.periodo_inicio).toLocaleDateString()
                            : ""}
                          {exp.em_curso
                            ? " — Em curso"
                            : exp.periodo_fim
                            ? ` — ${new Date(
                                exp.periodo_fim
                              ).toLocaleDateString()}`
                            : ""}
                        </p>
                        {exp.hashtags && (
                          <p className="text-xs text-blue-600 mt-1">
                            #{exp.hashtags.replace(/\s+/g, " #")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}