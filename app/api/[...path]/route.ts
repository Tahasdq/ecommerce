export const runtime = "nodejs";

import { NextResponse } from "next/server";
import axios from "axios";
// import { auth } from "../auth/[...nextauth]/route";

const BACKEND_BASE =
//   "http://localhost:8000"; // change to Azure backend later
// "https://ecommercebackend-e8dbfjc6erbcdgha.centralindia-01.azurewebsites.net"
process.env.NEXT_PUBLIC_BACKEND_BASE_LOCAL

export async function GET(req: Request, props :{params: Promise<{ path: string[] }> }) {
  // 1. Await the params object itself
   const params = await props.params; 
   
   // 2. Now you can safely access the path
   const paramsPath = params.path;
  return proxy(req,paramsPath, "GET");
}

export async function POST(req: Request, props :{params: Promise<{ path: string[] }>}) {
  // 1. Await the params object itself
   const params = await props.params; 
   
   // 2. Now you can safely access the path
   const paramsPath = params.path;
  return proxy(req, paramsPath, "POST");
}  

export async function PUT(req: Request, props :{params: Promise<{ path: string[] }>}) {
   // 1. Await the params object itself
   const params = await props.params; 
   
   // 2. Now you can safely access the path
   const paramsPath = params.path;
  return proxy(req, paramsPath, "PUT");
}
export async function PATCH(req: Request, props :{params: Promise<{ path: string[] }>}) {
   // 1. Await the params object itself
   const params = await props.params; 
   
   // 2. Now you can safely access the path
   const paramsPath = params.path;
  return proxy(req, paramsPath, "PATCH");
}

export async function DELETE(req: Request,  props :{params: Promise<{ path: string[] }>}) {
  // 1. Await the params object itself
   const params = await props.params; 
   
   // 2. Now you can safely access the path
   const paramsPath = params.path;
  return proxy(req, paramsPath, "DELETE");
}

async function proxy(req: Request, path: string[], method: string) {
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
