import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGetUserToken } from '@/hooks/useUser'
import { Input } from '@/components/Input'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type FormType = z.infer<typeof formSchema>

export function Login() {
  const { mutate, isSuccess } = useGetUserToken()
  const navigate = useNavigate()

  const methods = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  })

  const onFormSubmit = (data: FormType) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      return navigate('/')
    }
  }, [isSuccess, navigate])

  return (
    <div className="grid h-screen place-content-center gap-4 bg-app-900 text-gray-100">
      <h1 className="text-2xl font-bold">Login</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onFormSubmit)}
          className="mx-auto flex w-[448px] flex-col justify-center gap-4"
        >
          <Input
            label="E-mail"
            name="email"
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            id="password"
            placeholder="Digite sua senha"
          />

          <div className="flex items-center justify-between">
            <NavLink to="/register" className="text-xs text-gray-200">
              Registar
            </NavLink>

            <button
              type="submit"
              className="h-10 self-end rounded-lg bg-app-100 px-8 text-sm font-semibold transition hover:bg-app-200"
            >
              Entrar
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
