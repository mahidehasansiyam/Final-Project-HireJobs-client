import React, { Suspense } from 'react';
import SignupForm from './SignupForm';

const SignupPage = () => {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
};

export default SignupPage;
