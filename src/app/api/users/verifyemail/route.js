const { connect } = require("@/dbConfig/dbConfig");
const { default: User } = require("@/models/userModel");
const { NextResponse } = require("next/server");

connect();
export async function POST(req){
    try {
        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token);
        const user = await User.findOne({verifyToken:token,
        verifyTokenExpiry:{$gt:Date.now()}});

        if(!user){
            return NextResponse.json({error:"Invalid token"},
            {status:400})
        }
        // console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message:"Email Verified Successfully",
            success:true,
        })



    } catch (error) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}