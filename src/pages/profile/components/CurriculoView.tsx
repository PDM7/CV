import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import type { Perfil } from "../PerfilPage";

interface CurriculoViewProps {
  perfil: Perfil;
}

export default function CurriculoView({ perfil }: CurriculoViewProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Curriculo_${perfil.nome.replace(/\s+/g, '_')}`,
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

  const formatarPeriodo = (inicio: string, fim: string, emCurso: boolean) => {
    const inicioFormatado = formatarData(inicio);
    const fimFormatado = emCurso ? "Atual" : formatarData(fim || "");
    return `${inicioFormatado} - ${fimFormatado}`;
  };

  const experiencias = perfil.experiencias.filter(exp => exp.tipo_experiencia === "EXPERIENCIA");
  const certificados = perfil.experiencias.filter(exp => exp.tipo_experiencia === "CERTIFICADO");

  return (
    <div>
      <div className="no-print flex justify-center my-4">
        <button className="btn btn-info" onClick={handlePrint}>
          🖨️ Imprimir Currículo
        </button>
      </div>
      
      <div ref={componentRef}>
        <style>{`
          .curriculo-a4 {
            width: 210mm;
            min-height: 297mm;
            margin: 10mm auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            page-break-after: always;
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
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>
        
        <div className="curriculo-a4 bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8 border">
          {/* Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl text-gray-800 mb-2">{perfil.nome}</h1>
              <p className="text-gray-600 mb-1">{perfil.telefone}</p>
              <p className="text-gray-700 leading-relaxed">{perfil.resumo}</p>
            </div>
            <img 
              src={perfil.foto} 
              alt="Foto" 
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          </div>

          {/* Links/Contatos */}
          {perfil.campos.length > 0 && (
            <div className="mb-6">
              
              
              <div className="flex flex-wrap gap-4">
                {perfil.campos.map((campo, index) => (
                  <div key={index} className="flex items-center">
                    <span className="font-medium text-gray-700 mr-2">{campo.nome_campo}:</span>
                    <span className="text-blue-600 hover:text-blue-800">
                      
                    {campo.tipo_campo === "URL" ? (
                      <a
                        href={campo.valor_campo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 "
                      >
                        {campo.valor_campo}
                      </a>
                    ) : (
                      <span className="text-blue-600 hover:text-blue-800">
                        {campo.valor_campo}
                      </span>
                    )}

                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experiências Profissionais */}
          {experiencias.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                Experiência Profissional
              </h2>
              <div className="space-y-4">
                {experiencias.map((exp, index) => (
                  <div key={index} className="border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{exp.nome_experiencia}</h3>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {formatarPeriodo(exp.periodo_inicio, exp.periodo_fim || "", exp.em_curso)}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-1">{exp.nome_instituicao}</p>
                    <p className="text-gray-600 mb-2">{exp.descricao_experiencia}</p>
                    {exp.hashtags && (
                      <div className="flex flex-wrap gap-1">
                        {exp.hashtags.split(" ").map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificações */}
          {certificados.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
                Certificações
              </h2>
              <div className="space-y-3">
                {certificados.map((cert, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{cert.nome_experiencia}</h3>
                      <p className="text-gray-600">{cert.nome_instituicao}</p>
                      <p className="text-gray-500 text-sm">{cert.descricao_experiencia}</p>
                      {cert.hashtags && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cert.hashtags.split(" ").map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatarData(cert.periodo_inicio)}
                      {cert.periodo_fim && ` - ${formatarData(cert.periodo_fim)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

