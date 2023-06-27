import { AiOutlineUser } from "react-icons/ai";
import styles from "./Icon.module.css"

interface IconProps {
    color?: string
}

export const Icon = (
    {
        color="#bebebe"
    }: IconProps
) => {
    const borderColor = {
        "#bebebe": "#9b9b9b",
        "#b2e893": "#91da67",
        "#f2c656": "#f0b92f",
        "#f19198": "#ec6a72"
    }
    return (
        <div
            className={styles.container}
            style={{
                border: `solid 2px ${borderColor[color as keyof typeof borderColor]}`
            }}
        >
            <AiOutlineUser
                className={styles.icon}
                style={{
                    color: color
                }}
            />
        </div>
    );
}