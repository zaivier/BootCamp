import React, { useCallback, useRef } from 'react';
import { FiArrowDownLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, BackGround, Content, AnimationContainer } from './styles';
import logo from '../../asssets/logo.svg';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import getValidationErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
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

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu Logon.',
        });

        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <BackGround />
      <Content>
        <AnimationContainer>
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
          <Link to="/">
            <FiArrowDownLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
