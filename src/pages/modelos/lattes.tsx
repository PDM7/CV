import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useUser } from "../../contexts/UserContext";
import type { BaseExperiencia } from "../../types/profile";
import { CurriculumHeader } from "../../components/Header";

export default function Lattes() {
  const { perfil } = useUser();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Curriculo_${perfil.nome.replace(/\s+/g, "_")}`,
    pageStyle: `
        @page {
        size: A4;
        margin: 10mm;
        }
        @media print {
        body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .curriculo-a4 {
            box-shadow: none;
            margin: 0;
            padding: 0;
        }
        }
    `,
  });

  const formatarData = (data: string) => {
    if (!data) return "";
    const [ano, mes] = data.split("-");
    return `${mes}/${ano}`;
  };

  const formatarPeriodo = (
    inicio: string,
    fim: string | undefined,
    emCurso: boolean
  ) => {
    const inicioFormatado = formatarData(inicio);
    const fimFormatado = emCurso ? "Atual" : formatarData(fim || "");
    return `${inicioFormatado} - ${fimFormatado}`;
  };

  const grupos = perfil.experiencias.reduce(
    (acc: { [key: string]: BaseExperiencia[] }, exp) => {
      const tipo = exp.tipo_experiencia || "Outros";
      if (!acc[tipo]) acc[tipo] = [];
      acc[tipo].push(exp);
      return acc;
    },
    {}
  );

  return (
    <div>
      <CurriculumHeader onClick={handlePrint} />

      <div ref={componentRef}>
        <style>{`
          .curriculo-a4 {
            width: 210mm;
            min-height: 297mm;
            margin: 10mm auto;
            box-shadow: none; 
            page-break-after: always;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10pt;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          @media print {
            .curriculo-a4, .curriculo-a4 * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            body * {
              visibility: hidden;
            }
            .curriculo-a4, .curriculo-a4 * {
              visibility: visible;
            }
            .curriculo-a4 {
              position: absolute;
              left: 0;
              top: 0;
              width: 210mm;
              min-height: 297mm;
              margin: 0;
              box-shadow: none;
              border: none;
              font-size: 10pt;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>

           <div className="curriculo-a4 bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8 border">
          {/* Cabeçalho */}
          <div className="mb-4 relative flex flex-col items-center">
            <h1 className="text-xl font-bold text-gray-900 uppercase text-center mb-1">
              {perfil.nome}
            </h1>

            <div className="text-center text-gray-700 text-xs mb-3">
              {perfil.telefone}
            </div>

            {perfil.foto && perfil.foto !== "" && (
              <div className="absolute top-0 right-0 p-2">
                <img
                  src={perfil.foto}
                  alt="Foto"
                  className="w-16 h-16 object-cover border border-gray-300"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}
          </div>

          {/* Resumo */}
          <div className="mb-4">
            <h2 className="text-sm text-gray-800 font-bold uppercase border-b border-gray-500 pb-1 mb-1">
              Resumo
            </h2>
            <p className="text-gray-800 text-sm leading-snug text-justify">
              {perfil.resumo}
            </p>
          </div>

          {/* Campos */}
          {perfil.campos.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-gray-500 pb-1 mb-1 text-gray-800">
                Informações Adicionais
              </h2>
              <div className="text-sm text-gray-800">
                {perfil.campos.map((campo, index) => (
                  <div key={index} className="mb-1">
                    <span className="font-semibold mr-1">
                      {campo.nome_campo}:
                    </span>

                    {campo.tipo_campo === "URL" ? (
                      <a
                        href={campo.valor_campo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800 underline"
                      >
                        {campo.valor_campo}
                      </a>
                    ) : campo.tipo_campo === "TEXTO" ? (
                      <span>{campo.valor_campo}</span>
                    ) : campo.tipo_campo === "TEXTO_LONGO" ? (
                      <p className="whitespace-pre-line">{campo.valor_campo}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Renderizar seções de experiências */}
          {Object.entries(grupos).map(([tipo, experiencias]) => (
            <div key={tipo} className="mb-4">
              {/* Título da Seção - Formal e em caixa alta */}
              <h2 className="text-sm text-gray-800 font-bold uppercase border-b border-gray-500 pb-1 mb-1">
                {tipo.replace(/_/g, " ")}
              </h2>

              {experiencias.map((exp, idx) => (
                <div key={idx} className="pl-2 mb-2 text-sm text-gray-800">
                  <p className="mb-1">
                    <span className="mr-1">•</span>
                    <span className="font-semibold">
                      {exp.nome_experiencia}
                    </span>
                    {exp.nome_instituicao && (
                      <span className="ml-1">({exp.nome_instituicao}).</span>
                    )}
                    {(exp.periodo_inicio || exp.periodo_fim) && (
                      <span className="ml-1 text-xs text-gray-600">
                        Período:{" "}
                        {formatarPeriodo(
                          exp.periodo_inicio,
                          exp.periodo_fim,
                          exp.em_curso
                        )}
                        .
                      </span>
                    )}
                  </p>

                  {exp.descricao_experiencia && (
                    <p className="text-xs text-gray-700 ml-3 text-justify leading-tight">
                      {exp.descricao_experiencia}
                    </p>
                  )}

                  {exp.hashtags.trim() && (
                    <p className="text-xs text-gray-700 ml-3 mt-1">
                      Palavras-chave:{" "}
                      {exp.hashtags
                        .split(" ")
                        .filter((tag) => tag.trim())
                        .join("; ")}
                      .
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
