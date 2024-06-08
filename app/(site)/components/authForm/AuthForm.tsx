'use client'

import Button from "@/components/buttons/Buttons";
import Input from "@/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "../authSocialButton/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = 'LOGIN' | 'REGISTER'


export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toogleVariant = useCallback(() => {
    if(variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if(variant === 'REGISTER') {
      // Axios Register
    }

    if(variant === 'LOGIN') {
      // NextAuth
    }
  }

  const socialAction = (action: String) => {
    setIsLoading(true)
    // NextAuth Social Sign In
  }

  return (
    <div
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <div
      className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10"
      >
        <form 
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input 
              label="Name" 
              register={register} 
              id="name" 
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input 
            label="Email address" 
            type="email"
            register={register} 
            id="email" 
            errors={errors}
            disabled={isLoading}
          />
          <Input 
            label="Password" 
            type="email"
            register={register} 
            id="password" 
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div 
              className="absolute inset-0 flex items-center"
            >
              <div
                className="w-full border-t border-gray-300"
              />
            </div>
            
            <div 
              className=" relative flex justify-center text-sm"
            >
              <span
                className="bg-white px-2 text-gray-500"
              >
                Or continue with
              </span>
            </div>
          </div>

          <div
            className="mt-6 flex gap-2"
          >
            <AuthSocialButton 
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton 
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>

          <div
            className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500"
          >
            <div>
              {variant === 'LOGIN' ? 'New to messenger?' : 'Alread have an account?'}
            </div>
            <div
              onClick={toogleVariant}
              className="underline cursor-pointer"
            >
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}