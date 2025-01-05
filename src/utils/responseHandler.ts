class ResponseHandler<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: ErrorResponse;

  constructor(success: boolean, message: string, data?: T, error?: ErrorResponse) {
    this.success = success;
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
    if (error !== undefined) {
      this.error = this.serializeError(error);
    }
  }

  static success<T>(message: string, data?: T) {
    return new ResponseHandler<T>(true, message, data);
  }

  static error(message: string, error?: any) {
    return new ResponseHandler<undefined>(false, message, undefined, error);
  }

  private serializeError(error: any): ErrorResponse {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
      };
    }
    return { name: 'UnknownError', message: String(error) };
  }
}

interface ErrorResponse {
  name: string;
  message: string;
}

export default ResponseHandler;
