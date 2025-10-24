'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      // Simulate login and redirect
      router.push('/admin/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-lg flex items-center justify-center">
            <Image src="/asset/logo/logo.png" alt="logo" width={100} height={100} />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900">1000 CahayaMu Admin</CardTitle>
        <p className="text-slate-600">Login</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className={`pl-10 h-10 ${emailError ? 'border-red-500' : ''}`}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                className={`pl-10 pr-10 h-10 ${passwordError ? 'border-red-500' : ''}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
