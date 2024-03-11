import { sendEmail } from "@/helpers/mailer";

const { connect } = require("@/dbConfig/dbConfig");
const { default: User } = require("@/models/userModel");
const { NextResponse } = require("next/server");
connect();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {email} = reqBody;
        
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                error:"Invalid Email",
            },{status:400})
        }
        await sendEmail({email,emailType:"RESET",userId:user._id})
        return NextResponse.json({
            success:true,
            message:"Email sent successfully",
        })
    } catch (error) {
        console.log("Error From Forgot password",error);
        return NextResponse.json({error:"Something went wrong"},{status:500})
    }
}
