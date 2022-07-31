import {createContext, useState} from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const singIn = (newUser, callback) => {
    setUser(newUser)
    callback()
  }
  const singOut = (callback) => {
    setUser(null)
    callback()
  }

  const value = {user, singIn, singOut}

  return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
}