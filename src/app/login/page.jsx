"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";




export default function LoginPage(){
    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loading,setLoading] = useState(false);
    const onLogin = async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            // console.log("login success:",response);
            toast.success("Login success");
            router.push("/profile");
        } catch (error) {
            // console.log("Login error",error);
            toast.error(error.response.data.error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing....": "Login"}</h1>
            <hr/>
            <label htmlFor="email">Email</label>
            <input
                className="p-1 border border-gray-300 rounded-lg text-black
                mb-4 focus:outline-dotted focus:border-gray-600"
                id="email"
                type="email"
                value={user.email}
                onChange={(e)=> setUser({...user, email:e.target.value})}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-1 border border-gray-300 rounded-lg text-black
                mb-4 focus:outline-dotted focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e)=> setUser({...user, password:e.target.value})}
                placeholder="Password"
            />
            <div className="flex gap-1 items-center">
            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600">
                Login here
            </button>
            <Link href={"/forgot-password"} className=" text-blue-500 mb-4">
                Forgot Password
            </Link>
            </div>
            <Link href={"/signup"}> Visit Signup page</Link>
        </div>
    )
}