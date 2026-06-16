import { NextResponse } from "next/server";

import type { ApiResult } from "@/lib/types";

export function apiOk<T>(data: T, init?: ResponseInit) {
  const body: ApiResult<T> = {
    ok: true,
    data,
    notPersisted: true
  };

  return NextResponse.json(body, init);
}

export function apiError(error: string, status = 400) {
  const body: ApiResult = {
    ok: false,
    error,
    notPersisted: true
  };

  return NextResponse.json(body, { status });
}
