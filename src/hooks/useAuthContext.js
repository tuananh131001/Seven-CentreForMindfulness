import React, { createContext, useReducer } from 'react'
import { SignInReducer, initialState } from './authReducers'

export const SignInContext = createContext()

export const SignInContextProvider = (props) => {
  const [signedIn, dispatchSignedIn] = useReducer(SignInReducer, initialState)

  return (
    <SignInContext.Provider value={{ signedIn, dispatchSignedIn }}>
      {props.children}
    </SignInContext.Provider>
  )
}
