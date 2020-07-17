import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { Form } from '@unform/web';
import { Container, BackGround, Content } from './styles';
import logo from '../../asssets/logo.svg';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import getValidationErrors from '../../utils/getValidationsErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        email: yup
          .string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        password: yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);
      console.log(errors);
      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="password"
          />
          <Button type="submit">Entrar</Button>
          <a href="teste">Esqueci minha senha</a>
        </Form>
        <a href="teste">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <BackGround />
    </Container>
  );
};

export default SignIn;
