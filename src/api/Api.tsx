// api.ts

interface Result {
  token: string | null;
  erro?: string;
  status?: number;
  body?: string;
}

class Api {
  static login_local(login: string, senha: string): Result {
    if (login === 'Demonstração' && senha === '12345678') {
      return { token: '07a2db95'};
    }

    if (login === 'Duda' && senha === '12345') {
      return { token: '07a2db96' };
    }

    if (login === 'Gui' && senha === '12345') {
      return { token: '07a2db97' };
    }

    return { erro: 'Usuário ou senha inválido', token: null };
  }

  static async login(login: string, senha: string): Promise<Result> {
    try {
      const api_url = import.meta.env.VITE_API_URL;
      const resposta = await fetch(`${api_url}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha })
      });
      
      const tipo = resposta.headers.get('Content-Type') || '';

      // Se receber HTML → erro direto
      if (!tipo.includes('application/json')) {
        return { erro: 'Api indisponivel ❌', token: null };
      }

      const data = await resposta.json();

      if (!resposta.ok || data.erro) {
        return { status: resposta.status, body: `${resposta.statusText}`, erro: `${data.erro ?? 'Sem mensagem de erro'}`, token: null };
      }

      if (data.token) {
        return { token: data.token };
      } else {
        return { token: "AUTENTICADO" };
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // Erro de rede, DNS, timeout, etc
      return { erro: e.message ?? 'Falha na conexão', token: null };
    }
  }
}

export default Api;