import { UserTypes } from '@/@types'
import { ReactNode, createContext } from 'react'

interface UserHubContextTypes {
  user?: UserTypes | undefined
}

interface UserHubContextProviderProps {
  children: ReactNode
}

export const UserHubContext = createContext({} as UserHubContextTypes)

export function UserHubContextProvider({
  children,
}: UserHubContextProviderProps) {
  return (
    <UserHubContext.Provider value={{}}>{children}</UserHubContext.Provider>
  )
}
