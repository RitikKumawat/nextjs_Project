import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";
connect();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {email,password} = reqBody;
        // console.log(reqBody);
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User Does not exist"},
            {status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:"Password is incorrect"},
            {status:400})
        }
        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,
            {expiresIn:"1d"})
        const response = NextResponse.json({
            message:"Login Successful",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true,

        })
        return response;

    } catch (error) {
        return NextResponse.json({error:error.message}),
        {status:500}
    }
}