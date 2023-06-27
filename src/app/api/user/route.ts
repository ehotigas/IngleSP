import { newUser } from "@/types/global";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (
    req: NextRequest
) => {
    const csrfToken: RequestCookie | undefined = req.cookies.get("next-auth.csrf-token");
    const user: newUser =  await req.json();
    const body = JSON.stringify(
        {
            "username": user.username,
            "full_name": user.name,
            "segment": user.segment,
            "school_name": user.school,
            "email": user.email,
            "password": user.password,
            "confirm_password": user.confirmPassword
        }
    );
    console.log(body)
    console.log(`Token: ${csrfToken?.value}`)
    const response = await fetch(
        "http://ec2-3-95-171-50.compute-1.amazonaws.com/registrar-se/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken ? csrfToken.value : ""
            },
            body: body
        }
    );
    console.log(response)

    if (response.ok) {
        return NextResponse.json(
            { csrfToken: csrfToken },
            { status: 200 }
        );
    }

    return NextResponse.json(
        null,
        { status: 400 }
    );
}