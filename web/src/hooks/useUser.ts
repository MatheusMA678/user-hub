import { UserTypes } from '@/@types'
import { api } from '@/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

// Login Route
async function getUserToken(data: { email?: string; password?: string }) {
  try {
    const res = await api.post<{ token: string }>('/auth/login', data)
    cookies.set('token', res.data.token)
  } catch (error) {
    throw new Error(error)
  }
}

// Register Route
async function postUser(data: UserTypes) {
  try {
    const res = await api.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

// User Route
async function getUserById(): Promise<UserTypes | null> {
  const token = cookies.get('token')

  if (!token) {
    return
  }

  const decodedToken: { id: string } = jwt_decode(token)
  localStorage.setItem('userId', decodedToken.id)

  const userId = localStorage.getItem('userId')

  try {
    const res = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export function useGetUserToken() {
  return useMutation({
    mutationFn: getUserToken,
  })
}

export function useGetUserById() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserById,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postUser,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}
