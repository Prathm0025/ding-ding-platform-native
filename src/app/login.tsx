import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Login() {
  const login = useAuth.use.login();
  const status = useAuth.use.status();
  const router = useRouter();

  useEffect(() => {
    if (status === 'signIn') {
      router.replace('/');
    }
  }, [status, router]);

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    // console.log(data);
    login(data.username, data.password);
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
