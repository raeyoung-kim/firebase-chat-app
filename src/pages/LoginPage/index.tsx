import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = () => {
    console.log('로그인');
  };
  return (
    <div>
      <div className="auth-wrapper">
        <h3 style={{ textAlign: 'center' }}>로그인</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>이메일</label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p>필수 정보입니다.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p>사용할 수 없는 이메일입니다.</p>
          )}

          <label>비밀번호</label>
          <input
            type={'password'}
            {...register('password', { required: true })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p>필수 정보입니다.</p>
          )}

          <input type="submit" value="로그인하기" />
          <Link style={{ color: 'gray', textDecoration: 'none' }} to="/login">
            <span>계정이 없으신가요?</span>{' '}
            <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
              회원가입 하기
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
