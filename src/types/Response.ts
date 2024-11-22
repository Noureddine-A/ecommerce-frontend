export class Response {
  error: boolean;
  message: string | Error 
  isAdmin: boolean

  constructor(error: boolean, message: string | Error, isAdmin: boolean) {
    this.error = error;
    this.message = message;
    this.isAdmin = isAdmin;
  }
}

export interface Error {
  email?: string[];
  password?: string[];
  name?: string[];
}
