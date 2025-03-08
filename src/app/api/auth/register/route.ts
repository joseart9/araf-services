"use server";

import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import registerUser from "@/server/registerUser";
import getUser from "@/server/getUser";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const user = await req.json();

    try {
      const response = await registerUser({ user });

      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.error();
    }
  }
}
