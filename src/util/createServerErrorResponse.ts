import { NextResponse } from "next/server";

export default function createServerErrorResponse(
  messages: string[],
  status: number
) {
  return NextResponse.json(
    {
      messages,
    },
    {
      status,
    }
  );
}
