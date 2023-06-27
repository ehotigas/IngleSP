"use client"
import { Container } from "@/components/Container/Container";
import { Button } from "@/components/Input/Button/Button";
import { ProjectText } from "./Toolkit/ProjectText";
import { HomeImage } from "./Toolkit/HomeImage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { User } from "@/types/global";
import { NextPage } from "next";


const Home: NextPage = () => {
    const { data: session } = useSession();
    const user: User | undefined = session?.user;
    const router = useRouter();

    const handleClickButton = (
        href: string
    ) => () => {
        router.push(href)
    }
    
    const borderColor = {
        "#bebebe": "#9b9b9b",
        "#b2e893": "#91da67",
        "#f2c656": "#f0b92f",
        "#f19198": "#ec6a72"
    }

    return (
            <Container
                style={{
                    width: "80%",
                    justifyContent: "space-between",
                    textAlign: "justify"
                }}
            >
                <HomeImage />
                {
                    user ?
                    <Container
                        style={{
                            width: "50%",
                            float: "left",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "17vh",
                            textAlign: "center"
                    }}>
                        <h2 
                            className={styles.title}
                        >
                            Bem vindo de volta, {user.username}!
                        </h2>
                        <Container
                            style={{
                                marginTop: "100px"
                            }}
                        >
                            <Button
                                onClick={handleClickButton("/trail")}
                                text="Trilha"
                            />
                        </Container>
                        <Container
                            style={{
                                marginTop: "10px"
                            }}
                        >
                            <Button
                                onClick={handleClickButton("/ranking")}
                                text="Ranking"
                            />
                        </Container>
                    </Container> :
                    <ProjectText />
                }
                
            </Container>
    );
}

export default Home;


// import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import { signOut, useSession } from 'next-auth/react';
// import { getServerSession } from 'next-auth';
// import styles from './page.module.css';
// import Link from 'next/link';

// const Home = () => {
//   const { data: session } = useSession(
//     {
//       required: true
//     }
//   )

//   console.log(session)
//   return (
//     <main className={styles.main}>
//       <Link
//         href='/signin'
//       >
//         Login
//       </Link>
//       <button
//         onClick={
//           () => {
//             signOut()
//           }
//         }
//       >
//         Signout
//       </button>
//     </main>
//   )
// }

// export const getServerSideProps = async (
//   context: any
// ) => {
//   const session = getServerSession(context.req, context.res, authOptions);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {

//     }
//   }
// }

// export default Home;
