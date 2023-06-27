import { Container } from "@/components/Container/Container";
import styles from "./SocialMediaProps.module.css";
import Link from "next/link";
import {
    AiFillInstagram,
    AiOutlineTwitter
} from "react-icons/ai";

interface SocialMediaProps {

}

export const SocialMedia = (
    {

    }: SocialMediaProps
) => {
    return (
        <Container
            style={{
                display: "block",
                width: "100%",
                float: "left",
            }}
        >
            <Link
                href=""
            >
                <AiOutlineTwitter
                    className={styles.icon}
                />
            </Link>
            <Link
                href=""
            >
                <AiFillInstagram
                    className={styles.icon}
                />
            </Link>
        </Container>
    );
}