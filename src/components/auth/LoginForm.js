import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Button,
    Form,
    Row,
    Col,
    FormGroup,
    Input,
    CustomInput,
    Label
} from "reactstrap";
import Divider from "../common/Divider";
import SocialAuthButtons from "./SocialAuthButtons";
import withRedirect from "../../hoc/withRedirect";
import Cookies from "js-cookie";
import { registrarRotas } from "../../routes";

const LoginForm = ({ setRedirect, hasLabel, layout }) => {
    // State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    // Handler
    const handleSubmit = e => {
        e.preventDefault();

        if (email === "operador@gmail.com") {
            Cookies.set("perfil", "operador", { expires: 1 });
            Cookies.set("acesso", "true", { expires: 1 });

            toast.success(`Logado com ${email}`);
            setRedirect(true);
            registrarRotas();
        }
        if (email === "adm@gmail.com") {
            Cookies.set("acesso", true, { expires: 1 });
            Cookies.set("perfil", "adm", { expires: 1 });

            toast.success(`Logado com ${email}`);
            setRedirect(true);
            registrarRotas();
        }

        // toast.success(`Email inválido`);
    };

    useEffect(() => {
        setIsDisabled(!email || !password);
    }, [email, password]);

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                {hasLabel && <Label>Email address</Label>}
                <Input
                    placeholder={!hasLabel ? "Email" : ""}
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                />
            </FormGroup>
            <FormGroup>
                {hasLabel && <Label>Password</Label>}
                <Input
                    placeholder={!hasLabel ? "Senhaa" : ""}
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                />
            </FormGroup>
            <FormGroup>
                <Button
                    color="primary"
                    block
                    className="mt-3"
                    disabled={isDisabled}
                >
                    Login
                </Button>
            </FormGroup>
            {/* <Divider className="mt-4">or log in with</Divider> */}
            {/* <SocialAuthButtons /> */}
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
