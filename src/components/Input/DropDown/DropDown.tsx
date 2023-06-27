import styles from "./DropDown.module.css";
import { ChangeEventHandler, Key } from "react";

interface DropDownProps {
    onChange?: ChangeEventHandler<HTMLSelectElement>
    values: string[],
    style?: React.CSSProperties
    value?: string
}


export const DropDown = (
    {
        onChange,
        values,
        style,
        value
    }: DropDownProps
) => {
    return (
        <select
            className={styles.dropDown}
            style={style}
            defaultValue={value}
            onChange={onChange}
        >
            {
                values.map((element: string, index: number) => 
                    <option
                        value={element}
                        key={index as Key}
                    >
                        {element}
                    </option>
                )
            }
            
        </select>
    );
}