/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();

  console.log(user);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('e-mail is a must')
            .email('enter a valid e-mail'),
          password: Yup.string().required('password is a must'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Please, login</h1>

          <Input name="email" icon={FiMail} placeholder="e-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="password"
          />

          <Button type="submit">Enter</Button>

          <a href="lost-password">Forgot password?</a>
        </Form>

        <a href="sign-up">
          <FiLogIn />
          Sign up
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
