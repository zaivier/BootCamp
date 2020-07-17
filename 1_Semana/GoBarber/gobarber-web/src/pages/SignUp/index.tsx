import React, { useCallback, useRef } from 'react';
import { FiArrowDownLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { Container, BackGround, Content } from './styles';
import logo from '../../asssets/logo.svg';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import getValidationErrors from '../../utils/getValidationsErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        name: yup.string().required('Nome Obrigatório'),
        email: yup
          .string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        password: yup.string().min(6, 'No mínimo 6 dígitos'),
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
      <BackGround />
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="password"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="teste">
          <FiArrowDownLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
