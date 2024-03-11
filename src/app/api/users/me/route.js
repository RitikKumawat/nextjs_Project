const { connect } = require("@/dbConfig/dbConfig");
const { getDataFromToken } = require("@/helpers/getDataFromToken");
const { default: User } = require("@/models/userModel");

const { NextResponse, NextRequest } = require("next/server");

connect();
export async function GET(req){
    try {
        const userId = await getDataFromToken(req)
        const user =  await User.findOne({_id: userId}).
        select("-password");
        return NextResponse.json({
            message:"User found.",
            data:user
        })
    } catch (error) {
        return NextResponse.json({error:error.message},
            {status:400})
    }
}
