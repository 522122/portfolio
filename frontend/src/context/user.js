import { useReducer, useContext, createContext } from "react"

/**
 * @todo Axios, Interceptors, Token, Refresh token, Initial token login
 */

const initialState = {
  id: null,
  loginName: null,
  displayName: null,
  admin: false,
  loading: false,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER_DETAILS:
      return { ...state, ...action.payload }
    case actionType.UNSET_USER_DETAILS:
      return { ...initialState }
    case actionType.SET_ERROR:
      return { ...state, error: action.payload }
    case actionType.SET_LOADING:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export const actions = (dispatch) => {
  return {
    saveTokens(aT, rT) {
      // sessionStorage.setItem('aT', ...)
      // localStorage.setItem('rT', ...)
    },
    async login(username, password) {
      try {
        dispatch({
          type: actionType.SET_USER_DETAILS,
          payload: {
            loading: true,
            error: null,
          },
        })
        /*
          if username && password
          
          await Axios.post('...', {
            username,
            password
          })
          this.saveTokens(...,...)

          else if localStorage.getItem('rT')

          await Axios.post('...', {
            refreshToken: rT
          })
          this.saveTokens(...,...)
          
        */
      } catch (e) {
        dispatch({
          type: actionType.SET_ERROR,
          payload: e,
        })

        /*
          localStorage.removeItem('rT')
        */
      } finally {
        dispatch({
          type: actionType.SET_LOADING,
          payload: false,
        })
      }
    },
  }
}

const UserContext = createContext()

export const actionType = {
  SET_USER_DETAILS: "SET_USER_DETAILS",
  UNSET_USER_DETAILS: "UNSET_USER_DETAILS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
}

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <UserContext.Provider value={[state, dispatch, actions(dispatch)]}>{children}</UserContext.Provider>
}
