"use client"
// import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";



export default function ForgotPassword(){
    const [user,setUser] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        token:"",
    })
    
    const [loading,setLoading] = useState(false);
    
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            console.log("USEr:",user);
            const response = await axios.post("/api/users/forgot-password",user);
            toast.success("Email sent");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }finally{
            setLoading(false);
        }
    }
    // const updatePassword = async(e)=>{
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         user.token = window.location.search.split("=")[1];
            
    //         await axios.post("/api/users/update-password",user);

            
    //     } catch (error) {
            
    //     }
    // }
    return (

        <div className="flex items-center justify-center min-h-screen">
            <div>
                {
                    
                        <form className="flex flex-col items-center"
                            onSubmit={submitHandler}>
                                <input
                                    className="p-1 border border-gray-300 rounded-lg text-black
                                    mb-4 focus:outline-dotted focus:border-gray-600"
                                    id="email"
                                    type="email"
                                    placeholder="Enter registered Email"
                                    value={user.email}
                                    onChange={(e)=> setUser({...user, email:e.target.value})}
                                />
                                <button className=" bg-yellow-400 w-fit p-2 rounded-md hover:bg-yellow-600"
                                type="submit">
                                    {loading ? "Sending...." : "Send Email"}
                                </button>
                        </form>
                    
                }
                
            </div>
        </div>
    )
}