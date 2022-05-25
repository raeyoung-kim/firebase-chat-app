import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import firebase from 'src/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { getDatabase, ref, child, set } from 'firebase/database';
import md5 from 'md5';

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
  const [isLoading, setIsLoading] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  useEffect(() => {
    setCurrentPassword(watch('password'));
  }, [watch('password')]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const createUser = await createUserWithEmailAndPassword(
        getAuth(),
        data.email,
        data.password
      );

      await updateProfile(createUser.user, {
        displayName: data.name,
        photoURL: `https://www.gravatar.com/avatar/${md5(data.email)}?d=mp`,
      });

      const database = await getDatabase(firebase);
      const usersRef = await ref(database, 'users');
      const usersChild = await child(usersRef, createUser.user.uid);
      await set(usersChild, {
        name: createUser.user.displayName,
        image: createUser.user.photoURL,
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('auth/email-already-in-use')) {
          setSubmitErrorMessage('이미 사용 중인 아이디(이메일)입니다.');
        }
      }
      console.error;
    } finally {
      setIsLoading(false);
    }
  };

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
        {submitErrorMessage && <p>{submitErrorMessage}</p>}

        <input type="submit" disabled={isLoading} value="가입하기" />

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
