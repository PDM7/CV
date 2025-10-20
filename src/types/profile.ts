export interface BaseCampo {
  chave_perfil?: number; 
  nome_campo: string;
  tipo_campo: string;
  valor_campo: string;
}

export interface Campo extends BaseCampo{
  chave: number
}

export interface NovoCampo extends BaseCampo {
  tempId: string
}

export interface BaseExperiencia{
  chave_perfil: number;
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

export interface NovaExperiencia extends BaseExperiencia {
  tempId: string;
}

export interface Experiencia extends NovaExperiencia {
  chave: number;
}

export interface Perfil {
  chave: number;
  nome: string;
  telefone: string;
  foto: string;
  resumo: string;
  campos: (Campo | NovoCampo)[];
  experiencias: (Experiencia | NovaExperiencia)[];
}

