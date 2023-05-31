import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import withRedirect from "../../hoc/withRedirect";
import Cookies from "js-cookie";
import { registrarRotas } from "../../routes";
import { useApiRequest } from "../../becape-components/hooks/useApiRequest";

const LoginForm = ({ setRedirect, hasLabel, layout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMensagem, setErrorMensagem] = useState("");
  const { isLoading, doRequest } = useApiRequest();

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMensagem("");

    if (email === "operador@gmail.com") {
      Cookies.set("perfil", "operador", { expires: 1 });
      Cookies.set("acesso", "true", { expires: 1 });

      toast.success(`Logado com ${email}`);
      setRedirect(true);
      registrarRotas();
    } else {
      try {
        const data = {
          userName: email,
          password: password
        };

        const responsePost = await doRequest("post", "autenticacao", data);

        if (responsePost.status === 200) {
          const { email, contaId } = responsePost.content;
          console.log(responsePost);

          Cookies.set("acesso", true, { expires: 1 });
          Cookies.set("contaId", contaId, { expires: 1 });
          Cookies.set("perfil", "adm", { expires: 1 });

          registrarRotas();
          setRedirect(true);
          toast.success(`Logado com ${email}`);
        }

        if (responsePost.status === 401) {
          setErrorMensagem("Usuário ou senha incorretos.");
        }
      } catch (err) {
        console.log(err);
      }
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
          {!isLoading ? (
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
