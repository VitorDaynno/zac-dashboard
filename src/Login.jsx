import React from "react";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import M from "materialize-css";

import zac from "./images/zac.png";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (key === 'Enter') {
      login()
    }
  }

  const login = async () => {
    try {
      if (email === "" || password === "") {
        const error = { message: "Informe todos os campos requeridos" };
        throw error;
      }

      const url = `/api/users/auth`;
      const body = { email, password };
      const response = await axios.post(url, body);
      const { data } = response;
      const { token } = data;

      localStorage.setItem("token", token);
      M.toast({ html: "Login com sucesso", classes: "green" });
      history.push("/dashboard");
    } catch (error) {
      let messageUser = "Um erro ocorreu";
      const { response } = error;

      if (response) {
        const { status } = response;
        if (status === 401) {
          messageUser = "Email ou senhas requeridos";
        }
        if (status === 422) {
          messageUser = "Informe todos os campos requeridos";
        }
      } else {
        const { message } = error;
        messageUser = message;
      }

      M.toast({ html: messageUser, classes: "red" });
    }
  };

  return (
    <div className="login row" onKeyDown={handleKeyDown}>
      <div className="card col s10 offset-s1 l6 offset-l3 xl4 offset-xl4">
        <div className="center">
          <img src={zac} alt="zac" className="logo" />
        </div>
        <div className="row input-pad">
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={onChangeEmail}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row input-pad">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={onChangePassword}
            />
            <label htmlFor="password">Senha</label>
          </div>
        </div>
        <div className="row input-pad">
          <button
            className="btn waves-effect waves-light col s12"
            onClick={login}
          >
            Acessar
          </button>
        </div>
      </div>
      <footer className="col s12 footer">
        <div className="container center">
          <div className="col s12 contacts">
            <span>Desenvolvido por:</span>
          </div>
          <div className="col s12 contacts">
            <FaGithub />
            <a
              href="https://github.com/VitorDaynno"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-label"
            >
              Vítor Daynno
            </a>
          </div>
          <div className="col s12 contacts">
            <HiOutlineMail />
            <a href="mailto:vitordaynno@gmail" className="contact-label">
              vitordaynno@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
