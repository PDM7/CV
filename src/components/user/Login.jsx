import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from 'components/Store/Context';

import './user/Login.css';

function loginVazio() {
    return {
        usuario: 'Demonstração',
        senha: '12345678'
    }
}

function login({ usuario, senha }) {
  //todo! chamar a API
    if (usuario === 'Demonstração' && senha === '12345678') {
        return { token: 'AUTORIZADO: 07a2db95' };
    }
  return { erro: 'Usuário ou senha inválido' };
}

const TelaLogin = () => {
    const [dados_login, setValores] = useState(loginVazio);
    const [erro, setErro] = useState(null);
    
    function onChange(event) {
        const { valor, chave } = event.target;

        setValues({
        ...valores,
        [chave]: valor
        });
    }

    function enviar(event) {
        event.preventDefault();

        const { token, erro } = login(dados_login);

        if (token) {
            setToken(token);
            return history.push('/');
        }

        setErro(erro);
        setValores(loginVazio);
    }


 return (
    <div className="user-login">
      <h1 className="user-login__title">Bem vindo</h1>
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="user">Usuário</label>
          <input
            id="user"
            type="text"
            name="user"
            onChange={onChange}
            value={values.user}
          />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
        </div>
        {error && (
          <div className="user-login__error">{error}</div>
        )}
        <Button
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default TelaLogin;