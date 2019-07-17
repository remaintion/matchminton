import { combineReducers } from 'redux'
import { RootState } from '@types'
import auth, { AuthAction } from './auth'

export const rootReducer = combineReducers<RootState, AuthAction>({
  auth: auth as any,
})

export default rootReducer
