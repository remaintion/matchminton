declare module '@types' {
  export const x = 100
  export type AuthState = import('../reducers/auth').AuthState
  export type RootState = Readonly<{
    auth: AuthState
  }>
}