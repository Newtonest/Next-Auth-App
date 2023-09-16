import { NextResponse } from "next/server";

export function GET() {
    console.log('goat')
    return NextResponse.json({message:'hola'});
}