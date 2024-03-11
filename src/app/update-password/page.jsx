"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react"
import toast from "react-hot-toast";



export default function updatePassword(){
    const [user,setUser] = useState({
        password:"",
        confirmPassword:"",
        token:"",
    })
    const [updated,setUpdated] = useState(false);
    const [loading,setLoading] = useState(false);
    const updatePassword = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            user.token = window.location.search.split("=")[1];
            
            await axios.post("/api/users/update-password",user);

            toast.success("Password Updated");
            setUpdated(true);
            
        } catch (error) {
            console.log(error);
           toast.error("cant update password..."); 
        }finally{
            setLoading(false);


        }
    }
    return (
        <form className="flex flex-col gap-2 items-center justify-center min-h-screen" onSubmit={updatePassword}>
                        <label htmlFor="password">Password</label>
                        <input
                            className="p-1 border border-gray-300 rounded-lg text-black
                            mb-4 focus:outline-dotted focus:border-gray-600"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e)=> setUser({...user, password:e.target.value})}
                            placeholder="New Password"
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="p-1 border border-gray-300 rounded-lg text-black
                            mb-4 focus:outline-dotted focus:border-gray-600"
                            id="confirmPassword"
                            type="password"
                            value={user.confirmPassword}
                            onChange={(e)=> setUser({...user, confirmPassword:e.target.value})}
                            placeholder="Confirm New Password"
                        />
                        <button className=" bg-yellow-400 w-fit p-2 rounded-md hover:bg-yellow-600"
                                type="submit">
                                    {loading ? "Updating...." : "Update"}
                        </button>
                        {
                            updated && (<Link href={"/login"}>
                                Login 
                            </Link>)
                        }
        </form>
    )
}