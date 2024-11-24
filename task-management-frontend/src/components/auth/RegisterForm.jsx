// src/components/auth/RegisterForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

export const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError
    } = useForm();

    const password = watch('password');

    const onSubmit = async (data) => {
        if (!authService.validateTCKN(data.tcIdentityNumber)) {
            setError('tcIdentityNumber', {
                type: 'manual',
                message: 'Geçersiz TC Kimlik Numarasý'
            });
            return;
        }

        setIsLoading(true);
        try {
            await registerUser({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                tcIdentityNumber: data.tcIdentityNumber
            });
            toast.success('Kayýt baþarýlý! Giriþ yapabilirsiniz.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Kayýt sýrasýnda bir hata oluþtu');
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
                        Yeni Hesap Oluþtur
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Zaten bir hesabýnýz var mý?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Giriþ yapýn
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="firstName" className="sr-only">Ad</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    {...register('firstName', {
                                        required: 'Ad gereklidir',
                                        minLength: {
                                            value: 2,
                                            message: 'Ad en az 2 karakter olmalýdýr'
                                        }
                                    })}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Ad"
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="sr-only">Soyad</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    {...register('lastName', {
                                        required: 'Soyad gereklidir',
                                        minLength: {
                                            value: 2,
                                            message: 'Soyad en az 2 karakter olmalýdýr'
                                        }
                                    })}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Soyad"
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="tcIdentityNumber" className="sr-only">TC Kimlik No</label>
                            <input
                                id="tcIdentityNumber"
                                type="text"
                                {...register('tcIdentityNumber', {
                                    required: 'TC Kimlik No gereklidir',
                                    pattern: {
                                        value: /^\d{11}$/,
                                        message: 'TC Kimlik No 11 haneli olmalýdýr'
                                    }
                                })}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="TC Kimlik No"
                            />
                            {errors.tcIdentityNumber && (
                                <p className="mt-1 text-xs text-red-500">{errors.tcIdentityNumber.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">Email</label>
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
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Þifre</label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'Þifre gereklidir',
                                    minLength: {
                                        value: 6,
                                        message: 'Þifre en az 6 karakter olmalýdýr'
                                    }
                                })}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Þifre"
                            />
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Þifre Tekrar</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Þifre tekrarý gereklidir',
                                    validate: value =>
                                        value === password || 'Þifreler eþleþmiyor'
                                })}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Þifre Tekrar"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Kayýt Yapýlýyor...
                                </span>
                            ) : (
                                'Kayýt Ol'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;