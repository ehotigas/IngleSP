import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest
) => {
    const res = await Promise.resolve(
        // fetch("http://ec2-3-95-171-50.compute-1.amazonaws.com/placement-tests")
        fetch("http://ec2-3-95-171-50.compute-1.amazonaws.com/placement-tests")
    );
    const data = await res.json();
    return NextResponse.json(
        data,
        { status: 200 }
    );
}