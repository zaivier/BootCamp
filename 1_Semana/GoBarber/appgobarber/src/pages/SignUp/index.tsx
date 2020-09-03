import React, { useRef, useCallback } from 'react';
import {
  Container, Title, BackToSignIn, BackToSignInText
} from './styles';

// import React from 'react-native'
import logoImg from '../../assets/logo.png';
import { Image, KeyboardAvoidingView, Platform, View, TextInput, Alert } from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';

interface SignUpFormData{
nome: string;
email: string;
password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSingUp = useCallback(
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

        Alert.alert('Cadastro realizado com sucesso', 'Você já pode fazer login na aplicação.')
        navigation.goBack();
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer cadastro, tente novamente.')
        // addToast({
        //   type: 'error',
        //   title: 'Erro no cadastro',
        //   description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        // });
      }
    },
    [navigation]
  );
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form style={{ width: '100%' }} ref={formRef} onSubmit={handleSingUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
              />
              <Input
                ref={passwordInputRef}
                textContentType="newPassword"
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => { formRef.current?.submitForm() }}
              />


              <Button onPress={() => { formRef.current?.submitForm() }}>Entrar</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => { navigation.goBack() }}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp;
