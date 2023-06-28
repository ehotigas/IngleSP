import styles from "./Container.module.css"

interface ContainerProps {
    style?: React.CSSProperties
    children: React.ReactNode
    key?: React.Key
    onClick?: (event: React.MouseEvent<HTMLElement>)=>void
    ref?: React.RefObject<HTMLDivElement>
}

export const Container = (
    {
        style,
        children,
        key,
        onClick,
        ref
    }: ContainerProps
) => {
    return (
        <div
            className={styles.container}
            style={style}
            onClick={
                (event: React.MouseEvent<HTMLElement>) => {
                    onClick && onClick(event);
                }
            }
            ref={ref}
        >
            {children}
        </div>
    );
}