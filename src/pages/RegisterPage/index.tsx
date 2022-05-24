import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

type Inputs = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    setCurrentPassword(watch('password'));
  }, [watch('password')]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="auth-wrapper">
      <h3 style={{ textAlign: 'center' }}>회원가입</h3>
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

        <label>이름</label>
        <input {...register('name', { required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === 'required' && (
          <p>필수 정보입니다.</p>
        )}

        <label>비밀번호</label>
        <input
          {...register('password', { required: true, minLength: 6 })}
          type={'password'}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>필수 정보입니다.</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>최소 6자 이상</p>
        )}

        <label>비밀번호 확인</label>
        <input
          {...register('passwordConfirm', {
            required: true,
            validate: (value) => value === currentPassword,
          })}
          type={'password'}
        />
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'required' && <p>필수 정보입니다.</p>}
        {errors.passwordConfirm &&
          errors.passwordConfirm.type === 'validate' && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}

        <input type="submit" value="가입하기" />

        <Link style={{ color: 'gray', textDecoration: 'none' }} to="/login">
          <span>이미 계정이 있으신가요?</span>{' '}
          <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            로그인하기
          </span>
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
