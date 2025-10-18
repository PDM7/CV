Table perfil {
  chave INTEGER [pk, increment]
  nome VARCHAR [not null]
  telefone VARCHAR [not null]
  foto TEXT
  resumo VARCHAR [default: 'Lorem Ipsum...']
}

Table tipo_campo {
  nome_tipo_campo VARCHAR [pk, unique, not null]
  titulo_tipo_campo VARCHAR
}

Table tipo_experiencia {
  nome_tipo_experiencia VARCHAR [pk, unique, not null]
  titulo_tipo_experiencia VARCHAR
}

Table instituicoes {
  chave INTEGER [pk, increment]
  nome VARCHAR [not null]
  telefone VARCHAR [not null]
  foto TEXT
  resumo VARCHAR [default: 'Lorem Ipsum...']
}

Table campos {
  chave INTEGER [pk, increment]
  chave_perfil INTEGER [ref: > perfil.chave]
  nome_campo VARCHAR [not null]
  tipo_campo VARCHAR [not null, default: 'TEXTO', ref: > tipo_campo.nome_tipo_campo]
  valor_campo VARCHAR
  indexes {
    (chave, nome_campo) [unique]
  }
}

Table status_experiencia {
  nome_status_experiencia VARCHAR [pk, unique, not null]
  tipo_experiencia VARCHAR [ref: > tipo_experiencia.nome_tipo_experiencia]
  titulo_status_experiencia varchar NOT NULL
}

Table experiencias {
  chave INTEGER [pk, increment] 
  chave_perfil INTEGER [ref: > perfil.chave]
  nome_experiencia VARCHAR [not null]
  tipo_experiencia VARCHAR [ref: > tipo_experiencia.nome_tipo_experiencia]
  descricao_experiencia VARCHAR
  periodo_inicio TIMESTAMP
  periodo_fim TIMESTAMP
  em_curso BOOLEAN [not null, default: false]
  status_experiencia VARCHAR [ref: > status_experiencia.nome_status_experiencia]
  hashtags VARCHAR
  nome_instituicao VARCHAR
  chave_instituicao INTEGER [ref: > instituicoes.chave]
}
