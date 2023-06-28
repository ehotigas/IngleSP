import { Ranking } from "@/types/global";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params: { username } }: { params: { username: string } }
) => {
    const request = await Promise.resolve(
        fetch("http://ec2-3-95-171-50.compute-1.amazonaws.com/trails/1/rank")
    );
    const data: { ranking: Ranking[] } = await request.json();
    for (let rankingIndex = 0; rankingIndex < data.ranking.length; rankingIndex++) {
        if (data.ranking[rankingIndex].user === username) {
            console.log(data.ranking[rankingIndex])
            return NextResponse.json(
                data.ranking[rankingIndex],
                { status: 200 }
            );
        }
    }
    return NextResponse.json(
        null,
        { status: 400 }
    );
}