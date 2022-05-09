/**
 * BASE REQUEST QUERY PARAMETERS BASED ON STYLISH BACKEND
 * REQUEST STRUCTURE, IN SUCCESS / ERRORS AND VALIDATION REQUESTS
 */

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type BackendValidationError = {
  msg: string;
  param: string;
  location: string;
};

interface BaseResponse<T> {
  error: boolean;
  code: number;
  message: string;
  results: T;
  errors: BackendValidationError[];
}
