import { Redirect } from "expo-router";
import { useUserStore } from "../store";
import { APP_ROUTES, ROLE } from "../navigation";

export default function Index() {
    const { user } = useUserStore();

    const role = user?.role;
    const notUser = APP_ROUTES.PUBLIC.LOGIN;
    const isValidRole = Object.values(ROLE).includes(role as string);
    const href = APP_ROUTES.PRIVATE.DASHBOARD[role as keyof typeof APP_ROUTES.PRIVATE.DASHBOARD];

    if (user) {
        return <Redirect href={href} />;
    } else {
        return <Redirect href={notUser} />;
    }
}
