import { NextRequest, NextResponse } from "next/server";

interface Answers {
    question_id: number
    answer_id: number
    question_type: string
}


interface PlacementTestPost {
    user: number,
    placement: number,
    user_response: Answers[],
    time_taken: number
}

export const GET = async (
    req: NextRequest
) => {
    const res = await Promise.resolve(
        fetch("hhttp://ec2-3-95-171-50.compute-1.amazonaws.com/placement-tests/get-placement")
    );
    const data = await res.json();
    return NextResponse.json(
        data,
        { status: 200 }
    );
}

export const POST = async (
    req: NextRequest
) => {
    const body: PlacementTestPost = await req.json();
    const request = await Promise.resolve(
        fetch(
            "http://ec2-3-95-171-50.compute-1.amazonaws.com/placement-tests/user-result",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        )
    );
    const data = await request.json();
    return NextResponse.json(
        data,
        { status: 200 }
    );
}