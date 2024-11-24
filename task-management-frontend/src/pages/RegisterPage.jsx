// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }, 
    setError 
  } = useForm();

  const password = watch('password');

  const validateTCKN = (value) => {
    if (!authService.validateTCKN(value)) {
      return 'Geçersiz TC Kimlik Numarası';
    }
    return true;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        tcIdentityNumber: data.tcIdentityNumber
      });
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
    } catch (error) {
      toast.error(error.message || 'Kayıt sırasında bir hata oluştu');
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Yeni hesap oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veya{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              mevcut hesabınızla giriş yapın
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Ad
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName', {
                    required: 'Ad gereklidir',
                    minLength: {
                      value: 2,
                      message: 'Ad en az 2 karakter olmalıdır'
                    }
                  })}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Ad"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Soyad
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName', {
                    required: 'Soyad gereklidir',
                    minLength: {
                      value: 2,
                      message: 'Soyad en az 2 karakter olmalıdır'
                    }
                  })}
                  className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Soyad"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="tcIdentityNumber" className="block text-sm font-medium text-gray-700">
                TC Kimlik No
              </label>
              <input
                id="tcIdentityNumber"
                type="text"
                maxLength="11"
                {...register('tcIdentityNumber', {
                  required: 'TC Kimlik No gereklidir',
                  pattern: {
                    value: /^\d{11}$/,
                    message: 'TC Kimlik No 11 haneli olmalıdır'
                  },
                  validate: validateTCKN
                })}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="TC Kimlik No"
              />
              {errors.tcIdentityNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.tcIdentityNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email gereklidir',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Geçersiz email adresi'
                  }
                })}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Şifre gereklidir',
                  minLength: {
                    value: 6,
                    message: 'Şifre en az 6 karakter olmalıdır'
                  },
                  pattern: {
                   // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                   // message: 'Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir'
                  }
                })}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Şifre"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: 'Şifre tekrarı gereklidir',
                  validate: value =>
                    value === password || 'Şifreler eşleşmiyor'
                })}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Şifre Tekrar"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Kaydediliyor...
                </div>
              ) : (
                'Kayıt Ol'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegisterPage;