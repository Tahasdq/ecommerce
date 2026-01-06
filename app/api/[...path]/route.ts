import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_BASE =
//   "http://localhost:8000"; // change to Azure backend later
// "https://ecommercebackend-e8dbfjc6erbcdgha.centralindia-01.azurewebsites.net"
process.env.NEXT_PUBLIC_BACKEND_BASE_LOCAL

export async function GET(req: Request, { params }: any) {
  return proxy(req, params.path, "GET");
}

export async function POST(req: Request, { params }: any) {
  return proxy(req, params.path, "POST");
}

export async function PUT(req: Request, { params }: any) {
  return proxy(req, params.path, "PUT");
}

export async function DELETE(req: Request, { params }: any) {
  return proxy(req, params.path, "DELETE");
}

async function proxy(req: Request, path: string[], method: string) {
  const url = `${BACKEND_BASE}/api/${path.join("/")}`;

  const headers: any = {
    "content-type": "application/json",
  };

  const body =
    method === "GET" || method === "DELETE"
      ? undefined
      : await req.json();

  const backendRes = await axios({
    method,
    url,
    data: body,
    headers,
    withCredentials: true,
    validateStatus: () => true,
  });

  const response = NextResponse.json(backendRes.data, {
    status: backendRes.status,
  });

  const cookies = backendRes.headers["set-cookie"];
  if (cookies && Array.isArray(cookies)) {
  cookies.forEach((cookie) => {
    response.headers.append("set-cookie", cookie);
  });
}

  return response;
}
