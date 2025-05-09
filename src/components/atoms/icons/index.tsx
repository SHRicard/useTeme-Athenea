import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useAppTheme } from "@/hooks";

interface IFontAwesome {
    color?: string;
    size: number;
    name: string;
    version?: number;
}

export const FontAwesomeIcon = ({
    color,
    size,
    name,
    version,
}: IFontAwesome) => {
    const theme = useAppTheme();
    if (version === 6) {
        return (
            <FontAwesome6
                size={size}
                name={name as any}
                color={color ? color : theme.colors.textOnPrimary}
            />
        );
    }
    return (
        <FontAwesome
            size={size}
            name={name as any}
            color={color ? color : theme.colors.textOnPrimary}
        />
    );
};
