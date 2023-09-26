export interface IGenericResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: any;
}
export type IGenericResponses<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};


export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: {
    path: string;
    message: string;
  }[];
}


export type ITokenData = {
  userId: string;
  role: string;
  iat: number;
}
