
export interface Usuario {
    credencial: string; //token permanente, identificador uuid do banco de dados
    token: string; // token temporário
    nome: string;
    email: string;
    perfil: string;  // uuid do perfil associado
}