import { connect } from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/mailer"
import User from "@/models/userModel"



import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { username, email, password } = reqBody;
        
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({
                error: "User already exists"
            }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        //verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser
        })
    } catch (error) {
        console.log("Response Backend route...", error);
        return NextResponse.json(
            { error: error.message }, { status: 500 })
    }
}