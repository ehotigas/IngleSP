import { AiOutlineUser } from "react-icons/ai";
import { UserMenu } from "./Toolkit/UserMenu";
import styles from "./UserIcon.module.css";
import { User } from "@/types/global";
import { useState } from "react";


export const UserIcon = () => {
    const [ isActive, setActive ] = useState<boolean>(false);
    const handleClickButton = () => {
        setActive(true);
    }
    return (
        <div
            className={styles.container}
            onClick={handleClickButton}
        >
            <AiOutlineUser
                className={styles.icon}
            />
            <UserMenu
                isActive={isActive}
                setActive={setActive}
            />
        </div>
    );
}