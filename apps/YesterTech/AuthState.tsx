import React, { useContext, useReducer, useCallback } from 'react'

const AuthStateContext = React.createContext({} as any)

const initialState = {
  authenticated: false,
  user: null
}

export function AuthStateProvider({ children }: any) {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, authenticated: true, user: action.user }
      }
      case 'LOGOUT': {
        return { ...initialState }
      }
      default:
        return state
    }
  }, initialState)

  const value = {
    ...state,
    dispatch: useCallback(dispatch, [])
  }

  return <AuthStateContext.Provider value={value} children={children} />
}

export function useAuthState() {
  return useContext(AuthStateContext)
}
