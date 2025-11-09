import React, { useState, useContext  } from 'react';
import type  { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from './../../Store/Context';
import Api from '../../api/Api';
import './Login.css';

interface LoginData {
  login: string;
  senha: string;
}

function loginVazio(): LoginData {
  return { login: 'Demonstração', senha: '12345678' }
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

  async function enviar(event: FormEvent) {
    event.preventDefault();
    const { login, senha } = dados_login;
    const { token, erro } = await Api.login(login, senha);
    if (token) {
      localStorage.setItem('acesso', token);
      setToken(token);
      return navigate('/');
    }
    setErro(erro || null);
    setValores(loginVazio());
      localStorage.removeItem('acesso');
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
              <label htmlFor="login">Login</label>
              <input
                id="login"
                type="text"
                name="login"
                onChange={onChange}
                value={dados_login.login}
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
