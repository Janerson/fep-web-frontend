export interface ErrorException {
  timestamp: string;
  status: number;
  errors: string[];
  trace: string;
  message: string;
  path: string;
}
