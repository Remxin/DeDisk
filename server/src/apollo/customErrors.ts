import { ApolloError } from 'apollo-server-errors';

export class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_FOUND');

    Object.defineProperty(this, 'name', { value: 'Not found' });
  }
}

export class WrongPasswordError extends ApolloError {
    constructor(message: string) {
        super(message, 'WRONG_PASSWORD');
    
        Object.defineProperty(this, 'name', { value: 'Wrong Password' });
      }
}

export class InternalServerError extends ApolloError {
    constructor(message: string) {
        super(message, 'INTERNAL_SERVER_ERROR');
    
        Object.defineProperty(this, 'name', { value: 'Internal server error' });
      }
}

export class CookiesError extends ApolloError {
  constructor(message: string) {
      super(message, 'COOKIES_ERROR');
  
      Object.defineProperty(this, 'name', { value: 'Please allow cookies on this site' });
    }
}

export class UserAuthError extends ApolloError {
  constructor(message: string) {
      super(message, 'USER_AUTH');
  
      Object.defineProperty(this, 'name', { value: 'User is not valid' });
    }
}

export class RecordError extends ApolloError {
  constructor(message: string) {
      super(message, 'RECORD_ERROR');
  
      Object.defineProperty(this, 'name', { value: 'Something gone wrong with record' });
    }
}

export class PermissionError extends ApolloError {
  constructor(message: string) {
      super(message, 'PERMISSION_ERROR');
  
      Object.defineProperty(this, 'name', { value: "You don't have permissions to perform this action" });
    }
}