// api.ts
export const Api = {
  login(usuario: string, senha: string): any {
    if (usuario === 'Demonstração' && senha === '12345678') {
      return { token: 'AUTORIZADO: 07a2db95' };
    }

    if (usuario === 'Duda' && senha === '12345') {
      return { token: 'AUTORIZADO: 07a2db96' };
    }

    if (usuario === 'Gui' && senha === '12345') {
      return { token: 'AUTORIZADO: 07a2db97' };
    }

    return { erro: 'Usuário ou senha inválido' };
  }
};
