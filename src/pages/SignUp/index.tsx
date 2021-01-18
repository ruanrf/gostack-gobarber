/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('name is a must'),
        email: Yup.string()
          .required('e-mail is a must')
          .email('enter a valid e-mail'),
        password: Yup.string().min(6, 'password must be at least 6 chars long'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Register your account</h1>

          <Input name="name" icon={FiUser} placeholder="name" />
          <Input name="email" icon={FiMail} placeholder="e-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="password"
          />

          <Button type="submit">Register</Button>
        </Form>

        <a href="/">
          <FiArrowLeft />
          Back to login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
