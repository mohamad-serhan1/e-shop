"use client";

import React, { useEffect, useState } from "react";
import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import { Input } from "@/components/ui/input";
import Login from "./components/loginModal";
import SignUp from "./components/signupModal";
import LogOut from "./components/logout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { CgShoppingCart } from "react-icons/cg";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

function navbar() {
  const [token, setToken] = useState(null);
  
  
  useEffect(() => {
    async function tokenCheck() {
      try {
        const res = await fetch(`http://localhost:3000/api/token/`);
        const data = await res.json();
        setToken(data);
      } catch (error) {
        
      }
    }

    tokenCheck();
  }, []);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const LoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const SignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  const [showLogoutForm, setShowLogoutForm] = useState(false);
  const LogoutForm = () => {
    setShowLogoutForm(!showLogoutForm);
  };


  return (
    <div className=" flex relative justify-center ">
      <div className="bg-gray-300 sticky top-0 w-full z-30 text-white">
        <div className="py-4 border-b">
          <Container>
            <div className="flex items-center justify-between gap-3 md:gap-0">
              <Link
                href={"/"}
                className={`${redressed.className} font-bold text-xl text-gray-900 hover:text-teal-400 transition-all duration-200 hover:scale-105`}
              >
                E-Shop
              </Link>
              <Link
                href={"/categories"}
                className={`${redressed.className} font-bold text-xl text-gray-900 hover:text-teal-400 transition-all duration-200 hover:scale-105`}
              >
                Categories
              </Link>

              <div className=" w-full hidden max-w-sm items-center  md:flex">
                <Input
                  type="search"
                  id="search"
                  placeholder="Search"
                  className="text-gray-700 rounded-r-none rounded-l-md border-none"
                />
                <Button
                  className="bg-gray-800 rounded-r-md rounded-l-none"
                  variant="outline"
                >
                  Search
                </Button>
              </div>
              <div className="flex gap-8  md:gap-12 pt-2">
                {token && (
                  <div className=" text-3xl  mb-0">
                    <Link href={"/orders"} className="flex">
                      <CgShoppingCart />
                      <p className=" inline-block w-5 h-5 align-top mx-auto px-1.5  rounded-full bg-black text-xs">
                        5
                      </p>
                    </Link>
                  </div>
                )}

                <div className="flex gap-1">
                  {!token && (
                    <div className="text-black">
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger className="rounded-full  w-8 h-9 bg-black ">
                              <Avatar>
                                <AvatarFallback>UN</AvatarFallback>
                              </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="py-2 px-3 bg-gray-200">
                              <NavigationMenuLink className="py-2 border-b flex flex-col  ">
                                <Button variant="link" onClick={LoginForm}>
                                  SignIn
                                </Button>
                                <Button variant="link" onClick={SignUpForm}>
                                  SignUp
                                </Button>
                              </NavigationMenuLink>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </div>
                  )}
                  {token && (
                    <div className="text-sm ">
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger className="rounded-full  w-8 h-9 bg-black ">
                              <Avatar>
                                <AvatarFallback>UN</AvatarFallback>
                              </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="py-2 px-3 bg-gray-200">
                              <NavigationMenuLink className="py-2 border-b flex flex-col  ">
                                <Button variant="link" onClick={LogoutForm}>
                                  Logout
                                </Button>
                              </NavigationMenuLink>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className=" absolute mt-[90px] z-20">
        {showLoginForm && <Login />}
      </div>

      <div className=" absolute mt-[90px] z-20">
        {showSignUpForm && <SignUp />}
      </div>
      <div className=" absolute mt-[90px] z-20">
        {showLogoutForm && <LogOut />}
      </div>
    </div>
  );
}

export default navbar;
