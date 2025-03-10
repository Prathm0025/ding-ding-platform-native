import React, { useEffect } from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';
import { getToken } from '@/lib/auth/utils';
import { useRouter } from 'expo-router';

export default function Login() {
  const login = useAuth.use.login();
  const status = useAuth.use.status();
  const router = useRouter()

  useEffect(() => {
    if (status === 'signIn') {
      router.replace('/')
    }
  }, [status])

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    // console.log(data);
    login(data.username, data.password)
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
