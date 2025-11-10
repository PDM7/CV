import type { Campo, Experiencia, Perfil } from "./types/profile"

export const defaultData: Perfil = {
    chave: 1,
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    foto: "https://static.vecteezy.com/system/resources/thumbnails/047/268/484/small/cheerful-software-developer-focused-on-his-computer-at-workstation-free-photo.jpeg",
    resumo: "Desenvolvedor Fullstack com experiência em React, Node.js e bancos de dados relacionais e não relacionais. Apaixonado por criar soluções escaláveis e eficientes.",
    campos: [
      { chave: 1, nome_campo: "Email", tipo_campo: "TEXTO", valor_campo: "joao.silva@example.com" },
      { chave: 2, nome_campo: "LinkedIn", tipo_campo: "TEXTO", valor_campo: "linkedin.com/in/joaosilva" },
      { chave: 3, nome_campo: "GitHub", tipo_campo: "TEXTO", valor_campo: "github.com/joaosilva" },
    ] as Campo[],
    experiencias: [
      {
        chave: 1,
        chave_perfil: 1,
        nome_experiencia: "Desenvolvedor Sênior",
        tipo_experiencia: "Experiências profissionais",
        descricao_experiencia: "Desenvolvimento e manutenção de aplicações web utilizando React e Node.js.",
        periodo_inicio: "2020-01-01",
        periodo_fim: "",
        em_curso: true,
        hashtags: "react nodejs javascript typescript",
        nome_instituicao: "Tech Solutions Ltda.",
        chave_instituicao: "tech-solutions-1",
      },
      {
        chave: 2,
        chave_perfil: 1,
        nome_experiencia: "Desenvolvedor Pleno",
        tipo_experiencia: "Experiências profissionais",
        descricao_experiencia: "Participação no desenvolvimento de novas funcionalidades e correção de bugs.",
        periodo_inicio: "2018-03-01",
        periodo_fim: "2019-12-31",
        em_curso: false,
        hashtags: "angular java springboot",
        nome_instituicao: "Web Innovators S.A.",
        chave_instituicao: "web-innovators-1",
      },
      {
        chave: 3,
        chave_perfil: 1,
        nome_experiencia: "Certificado AWS Cloud Practitioner",
        tipo_experiencia: "Certificados acadêmicos",
        descricao_experiencia: "Certificação fundamental em conceitos de nuvem AWS.",
        periodo_inicio: "2023-05-01",
        periodo_fim: "",
        em_curso: false,
        hashtags: "aws cloud certificacao",
        nome_instituicao: "Amazon Web Services",
        chave_instituicao: "aws-cert-1",
      }
    ] as Experiencia[]
}