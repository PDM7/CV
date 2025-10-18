export interface Campo {
  nome_campo: string;
  tipo_campo: string;
  valor_campo: string;
}

export interface BaseExperiencia {
  chave: string;
  tipo_experiencia: string;
  nome_experiencia: string;
  descricao_experiencia: string;
  periodo_inicio: string;
  periodo_fim?: string;
  em_curso: boolean;
  hashtags: string;
  nome_instituicao: string;
  chave_instituicao: string;
}

export type Experiencia = BaseExperiencia;

export interface Perfil {
  chave: number;
  nome: string;
  telefone: string;
  foto: string;
  resumo: string;
  campos: Campo[];
  experiencias: Experiencia[];
}

