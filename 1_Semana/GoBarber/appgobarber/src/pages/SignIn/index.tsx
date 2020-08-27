import React, { useCallback, useRef } from 'react';
import {
  Container, Title, ForgotPassword, ForgotPasswordText,
  CreateAccountButton, CreateAccountButtonText
} from './styles';

// import React from 'react-native'
import logoImg from '../../assets/logo.png';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import Button from '../../components/button';
import Input from '../../components/input';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

const SingIn: React.FC = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef(null);
  const formRef = useRef<FormHandles>(null);
  const handleSignIn = useCallback((data: Object) => {
    console.log(data);
  }, []);
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
              <Title>Faça seu Logon</Title>
            </View>
            <Form style={{width: '100%'}} ref={formRef} onSubmit={handleSignIn}>
              <Input
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() =>{

                    }}
                    name="email"
                    icon="mail"
                    placeholder="E-mail" />
              <Input
                    autoCapitalize="none"
                    secureTextEntry
                    onSubmitEditing={() => {
                      formRef.current?.submitForm();
                     }}
                    returnKeyType="send"
                    autoCorrect={false}
                    name="password"
                    icon="lock"
                    placeholder="Senha" />

              <Button onPress={() => {
                formRef.current?.submitForm();
               }}>Entrar</Button>
              </Form>
            <ForgotPassword onPress={() => {

            }}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => { navigation.navigate('SignUp') }}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
}


export default SingIn;
