import { auth } from 'firebase'
import { Dispatch } from 'redux'

interface UserPayload {
  displayName: string | null,
  photoURL: string | null,
  uid: string | null
}

export const getCurrentUser = () => async (dispatch: Dispatch): Promise<void> => {
  auth().onAuthStateChanged(state => {
    if (state) {
      const user: UserPayload = {
        displayName: state.displayName,
        photoURL: state.photoURL,
        uid: state.uid,
      }
      dispatch({
        type: 'AUTH_SIGN_IN',
        payload: user
      })
    } else {
      dispatch({ type: 'AUTH_SIGN_OUT' })
    }
  })
}
export const signInWithFacebook = () => async (dispatch: Dispatch): Promise<void> => {
  const provider = new auth.FacebookAuthProvider()
  try {
    await auth().signInWithPopup(provider)

  } catch (error) {
    console.log(error)
  }
}

export const signOut = () => (dispatch: Dispatch) => {
  auth().signOut()
}

export interface AuthState {
  displayName: string,
  photoURL: string,
  uid: string,
  isLoggedIn: boolean
}

export type AuthAction = { type: 'AUTH_SIGN_IN', payload: UserPayload } | { type: 'AUTH_SIGN_OUT' }
const initialState: AuthState = {
  displayName: '',
  photoURL: '',
  uid: '',
  isLoggedIn: false
}
const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case 'AUTH_SIGN_IN': {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      }
    }
    case 'AUTH_SIGN_OUT': {
      return initialState
    }
    default: return state
  }
}

export default reducer