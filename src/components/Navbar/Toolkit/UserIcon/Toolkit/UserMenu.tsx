"use client"
import styles from "./UserMenu.module.css";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import {
    useEffect,
    useRef
} from "react";
import { signOut, useSession } from "next-auth/react";

interface UserMenuProps {
    isActive: boolean
    setActive: (active: boolean)=>void
}

export const UserMenu = (
    {
        isActive,
        setActive,
    }: UserMenuProps
) => {
    const { data: session } = useSession();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive]);

    return (
        <div
            ref={wrapperRef}
            className={styles.container}
            hidden={!isActive}
        >
            <Button
                onClick={
                    () => {
                        router.push("/");
                    }
                }
                title="Home"
            />

            <Button
                onClick={
                    () => {
                        router.push("/profile");
                    }
                }
                title="Profile"
            />

            <Button
                onClick={
                    () => {
                        router.push("/ranking");
                    }
                }
                title="Ranking"
            />

            {
                session?.user.is_superuser &&
                <Button
                    onClick={
                        () => {
                            router.push("/adm/profile");
                        }
                    }
                    title="Administrator"
                />
            }

            <Button
                onClick={
                    () => {
                        signOut();
                        router.push("/");
                    }
                }
                title="Sign Out"
            />
        </div>
    );
}