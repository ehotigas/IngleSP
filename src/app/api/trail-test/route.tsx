import { NextRequest, NextResponse } from "next/server";

interface ImageAnswer {
    text_id: number
    answer_number: number
}

interface FillBlankAnswer {
    blank_index: number
    answer_text: string
}

interface Answers {
    question_id: number
    answer_id?: number
    answer?: ImageAnswer[] | FillBlankAnswer[]
    question_type: string
}

interface PlacementTestPost {
    user: number
    trail: number
    user_response: Answers[]
}

export const GET = async (
    req: NextRequest
) => {
    const res = await Promise.resolve(
        fetch("http://ec2-3-95-171-50.compute-1.amazonaws.com/trails")
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
            "http://ec2-3-95-171-50.compute-1.amazonaws.com/trails/user-result",
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