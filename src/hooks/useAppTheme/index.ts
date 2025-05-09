import { useTheme } from "react-native-paper";
import { lightTheme } from "../../themes";

export type AppTheme = typeof lightTheme;
export const useAppTheme = () => useTheme<AppTheme>();
