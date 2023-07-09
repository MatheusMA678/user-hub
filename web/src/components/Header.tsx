import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SignOut } from '@phosphor-icons/react'
import { useGetUserById } from '@/hooks/useUser'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export function Header() {
  const [isShow, setIsShow] = useState(false)
  const { data: user } = useGetUserById()

  const navigate = useNavigate()

  const handleShowPopover = () => {
    setIsShow((prev) => !prev)
  }

  const logout = () => {
    cookies.remove('token')
  }

  useEffect(() => {
    const token = cookies.get('token')

    if (!token) {
      return navigate('/login')
    }
  }, [navigate])

  return (
    <header className="flex h-24 items-center justify-between gap-8 px-8 text-white">
      <div>
        <h1 className="text-2xl font-bold">
          User <span className="text-app-100">Hub</span>
        </h1>
      </div>

      <nav className="flex flex-1 items-center gap-6 text-sm transition-all">
        <NavLink to={'/'} className="">
          Home
        </NavLink>
        <NavLink to={'/settings'} className="">
          Configurações
        </NavLink>
      </nav>

      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex flex-1 flex-col text-right">
            <h1 className="font-bold capitalize">{user.name}</h1>
            <span className="text-xs text-gray-200">{user.email}</span>
          </div>
          <button
            type="button"
            data-popover={isShow}
            onClick={handleShowPopover}
            className="group relative h-10 w-10 rounded-full ring-2 ring-app-100"
          >
            <img
              src={user.picture}
              alt="Imagem do Usuário"
              className="h-full w-full rounded-full"
            />
            <div className="absolute right-0 top-[150%] hidden w-48 rounded-lg border border-app-100 bg-app-300 p-2 shadow group-data-[popover=true]:flex">
              <button
                className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-sm font-medium text-red-500 duration-200 hover:bg-red-500/20"
                onClick={logout}
              >
                <span>Sair</span>
                <SignOut />
              </button>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            className="rounded border-2 border-app-100 bg-app-100 px-4 py-2 text-sm font-bold text-white duration-200 hover:border-app-100/80 hover:bg-app-100/80"
            onClick={() => navigate('/register')}
          >
            Registrar
          </button>
          <button
            className="rounded border-2 border-app-100 bg-transparent px-4 py-2 text-sm font-bold text-white duration-200 hover:bg-app-100"
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>
        </div>
      )}
    </header>
  )
}
