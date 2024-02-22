import { Status } from "./status";

export interface ProductServiceResult<T> {
  status: Status;
  result?: T;
}
