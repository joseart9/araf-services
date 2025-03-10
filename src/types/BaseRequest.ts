import { NextRequest } from "next/server";

export default interface BaseRequest {
  req: NextRequest;
}
