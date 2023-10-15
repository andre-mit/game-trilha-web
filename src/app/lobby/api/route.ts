import { NextRequest, NextResponse } from "next/server";

// TODO: implement lobby logic
export async function POST(request: NextRequest){
    console.log(request.body);
    console.log(request.headers);
    
    // redirect to game
    return NextResponse.redirect("/game/1?color=0");
}