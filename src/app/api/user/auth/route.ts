import { 
    User,
    UserLoginReq,
    UserLoginRes
} from "@myTypes/global";
import {
    NextRequest,
    NextResponse
} from "next/server";

export const POST = async (
    request: NextRequest
) => {
    const reqBody = await request.json() as UserLoginReq;
    let credentials = JSON.stringify({
        "username": reqBody.email,
        "password": reqBody.password
    });

    const response = await Promise.resolve(
        fetch(
            'http://ec2-3-95-171-50.compute-1.amazonaws.com/entrar/',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: credentials
            }
        )
    );
    const loginRes: UserLoginRes = await response.json();
    console.log(loginRes);
    if (!loginRes) {
        return NextResponse.json(
            null,
            { status: 400 }
        );
    }

    const getUserResponse = await Promise.resolve(
        fetch(`http://ec2-3-95-171-50.compute-1.amazonaws.com/users/${loginRes.user_id}`)
    );
    const user: User = await getUserResponse.json();
    if (!user.detail) {
        return NextResponse.json(
            user,
            { status: 201 }
        );
    }

    return NextResponse.json(
        null,
        { status: 400 }
    );
}