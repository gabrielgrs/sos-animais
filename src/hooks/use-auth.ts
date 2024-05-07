'use client'

import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuthenticatedUser } from '~/actions/auth'
import { UserSchema } from '~/libs/mongoose'

export function useAuth() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['auth'],
    queryFn: () => getAuthenticatedUser(),
    refetchInterval: false,
  })

  const onUpdateUser = useCallback(
    (user: Partial<UserSchema>) => {
      refetch()
      return user
    },
    [refetch],
  )

  const onLogin = useCallback(
    (user: Partial<UserSchema>) => {
      refetch()
      return user
    },
    [refetch],
  )

  return {
    user: data,
    isAuthenticated: Boolean(!error && data),
    isLoading,
    onUpdateUser,
    onLogin,
  }
}
