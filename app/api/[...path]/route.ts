export const runtime = "nodejs";

import { NextResponse } from "next/server";
import axios from "axios";
// import { auth } from "../auth/[...nextauth]/route";

const BACKEND_BASE =
//   "http://localhost:8000"; // change to Azure backend later
// "https://ecommercebackend-e8dbfjc6erbcdgha.centralindia-01.azurewebsites.net"
process.env.NEXT_PUBLIC_BACKEND_BASE_LOCAL

export async function GET(req: Request, { params }: any) {
  return proxy(req, params.path, "GET");
}

export async function POST(req: Request, { params }: any) {
  console.log("BACKEND_BASE" , BACKEND_BASE)
  return proxy(req, params.path, "POST");
}  

export async function PUT(req: Request, { params }: any) {
  return proxy(req, params.path, "PUT");
}
export async function PATCH(req: Request, { params }: any) {
  return proxy(req, params.path, "PATCH");
}

export async function DELETE(req: Request, { params }: any) {
  return proxy(req, params.path, "DELETE");
}

async function proxy(req: Request, path: string[], method: string) {
  // console.log("BACKEND_BASE" , BACKEND_BASE)
  // console.log("path",path)
  // console.log("req",req)
  const { search } = new URL(req.url);
 const url = `${BACKEND_BASE}/api/${path.join("/")}${search}`;

  console.log("url",url)

  const cookie = req.headers.get("cookie");
  // const session = await auth();
  
  // console.log("session", session);


  const headers: any = {
    ...(cookie ? { cookie } : {}), // forward cookies
  };
  const getContentype = (req: Request)=>{
    return req.headers.get("content-type")?.split(";")[0]
  }
  const contentType = getContentype(req)

  
 
  const body =
    method === "GET" || method === "DELETE"
      ? undefined
      :  contentType=="multipart/form-data" ? await req.formData() :await req.json() // here we are checking if header is multipart/form-data data then set get req.formData() otherwise get req.json() buy why?

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
