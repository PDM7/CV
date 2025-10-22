import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from './../../Store/Context';
import './Login.css';

interface LoginData {
  usuario: string;
  senha: string;
}

function loginVazio(): LoginData {
  return { usuario: 'Demonstração', senha: '12345678' };
}

function login({ usuario, senha }: LoginData) {
  if (usuario === 'Demonstração' && senha === '12345678') {
    return { token: 'AUTORIZADO: 07a2db95' };
  }
  return { erro: 'Usuário ou senha inválido' };
}

const TelaLogin: React.FC = () => {
  const [dados_login, setValores] = useState<LoginData>(loginVazio);
  const [erro, setErro] = useState<string | null>(null);
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValores({ ...dados_login, [name]: value });
  }

  function enviar(event: FormEvent) {
    event.preventDefault();
    const { token, erro } = login(dados_login);
    if (token) {
      setToken(token);
      return navigate('/');
    }
    setErro(erro || null);
    setValores(loginVazio());
  }

  return (
    <div className="user-login-container">
      {/* Coluna esquerda azul */}
        <div className="user-login-left">
          <div className="user-login_left-wraper">
            <div className="user-login__bottom-left">
              <p className="user-login__other">Outras formas de entrar</p>
              <div className="user-login__social-buttons">
                <button className="social-button">Icone</button>
                <button className="social-button">Icone</button>
                <button className="social-button">Icone</button>
              </div>
              <button className="user-login__create-account">Criar Conta</button>
            </div>
          </div>
        </div>
      {/* Coluna direita branca */}
      <div className="user-login-right">
        <div className="user-login">
          <h1 className="user-login__title">ENTRAR</h1>
          <p className="user-login__subtitle">Lorem Ipsum dolor sit amet</p>

          <form onSubmit={enviar}>
            <div className="user-login__form-control">
              <label htmlFor="usuario">Login</label>
              <input
                id="usuario"
                type="text"
                name="usuario"
                onChange={onChange}
                value={dados_login.usuario}
              />
            </div>

            <div className="user-login__form-control">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                name="senha"
                onChange={onChange}
                value={dados_login.senha}
              />
            </div>

            {erro && <div className="user-login__error">{erro}</div>}

            <button type="submit" className="user-login__submit-button">
              Entrar
            </button>
          </form>

          {/* Seção mobile / telas pequenas */}
          <div className="user-login__bottom-mobile">
            <p className="user-login__other">Outras formas de entrar</p>
            <div className="user-login__social-buttons">
              <button className="social-button">Icone</button>
              <button className="social-button">Icone</button>
              <button className="social-button">Icone</button>
            </div>
            <button className="user-login__create-account">Criar Conta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaLogin;
