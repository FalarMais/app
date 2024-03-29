import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import withRedirect from "../../hoc/withRedirect";
import Cookies from "js-cookie";
import { registrarRotas } from "../../routes";
import { useApiRequest } from "../../becape-components/hooks/useApiRequest";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LoginForm = ({ setRedirect, hasLabel, layout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMensagem, setErrorMensagem] = useState("");
  const { isLoading, setIsLoading, doRequest } = useApiRequest();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMensagem("");

    try {
      const data = {
        email,
        senha: password
      };

      const responsePost = await doRequest("post", "Autenticar", data);
      console.log(responsePost);
      if (responsePost.status === 200) {
        const { email, contaId } = responsePost.content;

        const responseContext = await doRequest("get", `/Conta/${contaId}`);
        const { context } = responseContext.content;
        console.log(responsePost);

        Cookies.set("acesso", true, { expires: 1 });
        Cookies.set("contaId", contaId, { expires: 1 });
        Cookies.set("context", context, { expires: 1 });

        Cookies.set("perfil", "adm", { expires: 1 });

        registrarRotas();
        setRedirect(true);
        toast.success(`Logado com ${email}`);
      }

      if (responsePost.status === 401) {
        setErrorMensagem("Usuário ou senha incorretos.");
      }

      if (responsePost.status === 400) {
        setErrorMensagem("Usuário ou senha inválidos.");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      toast("Erro ao realizar login...");
      console.log(err.message);
    }
  };

  useEffect(() => {
    setIsDisabled(!email || !password);
  }, [email, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <span className="text-danger">{errorMensagem}</span>
        {hasLabel && <Label>Email address</Label>}
        <Link to="/registrar" className="text-primary">
          registrar
        </Link>
        <Input
          placeholder={!hasLabel ? "Usuário" : ""}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Password</Label>}
        <Input
          placeholder={!hasLabel ? "Senha" : ""}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <FormGroup>
        <Button color="falar" block className="mt-3" disabled={isDisabled}>
          {isLoading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </FormGroup>
    </Form>
  );
};

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: "basic",
  hasLabel: false
};

export default withRedirect(LoginForm);
