import { useForm, FormProvider } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { useCreateUser } from '@/hooks/useUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/Input'
import { useEffect } from 'react'

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type FormType = z.infer<typeof formSchema>

export function Register() {
  const { mutate, isSuccess } = useCreateUser()
  const navigate = useNavigate()

  const methods = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      email: '',
    },
  })

  const onFormSubmit = async (data: FormType) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      return navigate('/login')
    }
  }, [isSuccess, navigate])

  return (
    <div className="grid h-screen place-content-center gap-4 bg-app-900 text-gray-100">
      <h1 className="text-2xl font-bold">Registrar</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onFormSubmit)}
          className="mx-auto flex w-[448px] flex-col justify-center gap-4"
        >
          <Input
            label="Nome"
            type="text"
            name="name"
            id="name"
            placeholder="Digite seu nome"
          />
          <Input
            label="E-mail"
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
          />

          <div className="flex items-center justify-between">
            <NavLink to="/login" className="text-xs text-gray-200">
              Entrar
            </NavLink>

            <button
              type="submit"
              className="h-10 self-end rounded-lg bg-app-100 px-8 text-sm font-semibold transition hover:bg-app-200"
            >
              Registrar
            </button>
          </div>
          {/* <GoogleLogin
          onSuccess={(response: { credential: string }) => {
            handleSetUser(response.credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        /> */}
        </form>
      </FormProvider>
    </div>
  )
}
