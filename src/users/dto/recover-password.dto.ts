export interface RecoverPasswordDto {
  email: string
  codeRecover: string
  worn: boolean
  newPassword: boolean
}