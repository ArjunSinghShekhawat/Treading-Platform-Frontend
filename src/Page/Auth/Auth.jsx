import React from "react";
import "./Auth.css";
import { SignUp } from "./SignUp";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { ForgetPassword } from "./ForgetPassword";

export const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen relative authContainer">
      <div className=" absolute top-0 right-0 bottom-0 left-0 bg-[#0307102] bg-opacity-50">
        <div
          className=" bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md  z-50 bg-black
         bg-opacity-50 shadow-2xl shadow-white"
        >
          <h1 className=" text-6xl font-bold pb-9">Arjun Treading</h1>

          {location.pathname == "/signup" ? (
            <section className=" w-full">
              <SignUp />
              <div className=" flex items-center justify-center">
                <span>have already account</span>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className=" ml-2"
                >
                  login
                </Button>
              </div>
            </section>
          ) : location.pathname == "/forget-password" ? (
            <section className=" mt-7 w-full">
              <ForgetPassword />
              <div className=" flex items-center justify-center mt-2">
                <span>back to login</span>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  login
                </Button>
              </div>
            </section>
          ) : (
            <section className=" w-full">
              <Login />
              <div className=" flex items-center justify-center">
                <span>don't have account</span>
                <Button variant="ghost" onClick={() => navigate("/signup")}>
                  SignUp
                </Button>
              </div>
              <div className=" mt-10">
                <Button
                  className="w-full py-5"
                  variant="outline"
                  onClick={() => navigate("/forget-password")}
                >
                  Forget Password
                </Button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
