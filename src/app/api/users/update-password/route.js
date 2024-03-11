import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(req){
    try {
        const reqBody = await req.json();
        const {email,password,confirmPassword,token} = reqBody;
        const user = await User.findOne({forgotPasswordToken:token,
            forgotPasswordExpiry:{$gt:Date.now()}});
        if(!user){
            return NextResponse.json({
                error:"Invalid Token",
                
            },{status:400})
        }
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            success:true,
            message:"Password Updated"
        })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}