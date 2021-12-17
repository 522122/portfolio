export enum ErrorType {
  E_LOGIN_USER_NOT_FOUND,
  E_LOGIN_WRONG_PASSWORD,
  E_LOGIN_TOKEN_NOT_FOUND,
  E_LOGIN_TOKEN_APP_MISMATCH,
}

export default class AppError extends Error {
  public type
  public details
  constructor(type: ErrorType, message: string, details?: any) {
    super(message)
    this.type = type
    this.details = details
  }
}
