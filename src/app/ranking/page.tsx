"use client"
import { Container } from "@/components/Container/Container";
import { UserCard } from "@/components/Ranking/UserCard";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Ranking } from "@/types/global";

const Ranking: NextPage = () => {
    const [rankingArray, setRankingArray] = useState<Ranking[]>([]);
    useEffect(() => {
        const getPosition = async () => {
            const req = await Promise.resolve(
                fetch(`https://ingle-sp.vercel.app/api/ranking/placement-test`)
            );
            const { ranking }: { ranking: Ranking[] } = await req.json();
            setRankingArray(ranking);
        }
        getPosition();
    }, []);
    return (
        <Container
            style={{
                width: "70%",
                height: "900px",
                marginLeft: "15%",
                backgroundColor: "#eceeee",
                marginTop: "20px",
                overflow: "hidden",
                marginBottom: "20px",
                borderBottom: "solid 5px #76dcc2",
                borderRadius: "10px 10px 0 0"
            }}
        >
            <Container
                style={{
                    height: "50px",
                    backgroundColor: "#76dcc2",
                    borderTop: "solid 5px #76dcc2",
                    marginBottom: "20px",
                    borderBottom: "solid 5px #76dcc2",
                }}
            >
                <Container
                    style={{
                        color: "#fff",
                        fontSize: "28px",
                        marginTop: "10px",
                        width: "20%",
                        marginLeft: "15px",
                        float: "left"
                    }}
                >
                    Ranking
                </Container>
            </Container>
            {
                rankingArray.length > 0 &&
                <UserCard
                    score={rankingArray[0].score}
                    style={{
                        backgroundColor: "#f19198"
                    }}
                    username={`1. ${rankingArray[0].user}`}
                />
            }
            {
                rankingArray.length > 1 &&
                <UserCard
                    score={rankingArray[1].score}
                    style={{
                        marginTop: "10px",
                        backgroundColor: "#f2c656"
                    }}
                    username={`2. ${rankingArray[1].user}`}
                />
            }
            {
                rankingArray.length > 2 &&
                <UserCard
                    score={rankingArray[2].score}
                    style={{
                        marginTop: "10px",
                        backgroundColor: "#b2e893"
                    }}
                    username={`3. ${rankingArray[2].user}`}
                />
            }
            
            {
                rankingArray.map(
                    (rankingPosition: Ranking, index: number) => {
                        if (index > 2 && index < 9) {
                            return (
                                <UserCard
                                    key={`usercardranking-${index}`}
                                    score={rankingPosition.score}
                                    style={{
                                        marginTop: "10px",
                                    }}
                                    username={`${index + 1}. ${rankingPosition.user}`}
                                />
                            )
                        }
                    }
                )
            }
        </Container>
    );
}

export default Ranking;