import { NumberLiteralType } from "typescript";

export interface Epic {
  id: number;
  name: string;
  projectId: number;
  //开始时间
  start: number;
  end: number;
}
