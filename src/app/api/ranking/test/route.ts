import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest
) => {
    const request = await Promise.resolve(
        fetch("http://ec2-3-95-171-50.compute-1.amazonaws.com/trails/1/rank")
    );
    const data = await request.json();
    return NextResponse.json(
        data,
        { status: 200 }
    );
}