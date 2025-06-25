'use client';


import React, { Suspense } from 'react';
import {LoginForm} from '@/components/loginform/LoginForm'; // move the form logic here

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
