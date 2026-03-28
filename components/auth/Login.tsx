"use client";
import React, { useState } from "react";
import Wrapper from "../app/Wrapper/Wrapper";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Control, Controller, FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { LoginInputs } from "@/types/auth/login.type";

//Login Schema

const Login = ({control , handleSubmit,errors ,onSubmit, loading, modal = false, openRegister}:{control :Control<LoginInputs>, handleSubmit:UseFormHandleSubmit<LoginInputs>,errors:FieldErrors<LoginInputs> ,onSubmit:SubmitHandler<LoginInputs>, loading:boolean, modal:boolean, openRegister:(val:boolean)=>void}  ) => {
  const [showPasswordFields, setShowPasswordFields] = useState<{
    password: boolean;
    // confirmPassword: boolean;
  }>({
    password: false,
    // confirmPassword: false,
  });

  

  const togglePassword = (name: keyof typeof showPasswordFields) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  return (
    <Wrapper className="px-10 md:w-1/2  flex flex-col h-[80vh] justify-center items-center">
      <Card onClick={(e)=>e.stopPropagation()} className="min-w-3/4">
        <CardHeader className="justify-center text-4xl font-bold">
          Login
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <CardContent>
            <div>Email</div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input type="email" {...field} />}
            />
            {errors && errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </CardContent>
          <CardContent>
            <div>Password</div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="flex items-center relative">
                  <Input
                    type={showPasswordFields.password ? "text" : "password"}
                    {...field}
                  />
                  <div
                    className="absolute right-0 rounded-4xl h-full flex items-center px-2"
                    onClick={() => togglePassword("password")}
                  >
                    {showPasswordFields.password ? <Eye /> : <EyeClosed />}
                  </div>
                </div>
              )}
            />
            {errors && errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </CardContent>

          <CardContent>
            <Button className="w-full cursor-pointer" type="submit">
              {loading ? <Spinner /> : "Login"}
            </Button>
          </CardContent>
          <CardContent>
            {!modal && (
              <span>
                <Link className="cursor-pointer  underline" href={`/register`}>
                  Register now
                </Link>
              </span>
            )}
            {modal && (
              <span onClick={() => openRegister(true)}
                  className="cursor-pointer  underline">
                  Register now
              </span>
            )}
          </CardContent>
        </form>
      </Card>
    </Wrapper>
  );
};

export default Login;
