import { Redirect } from "expo-router";
import { useUserStore } from "@/store";
import { APP_ROUTES, ROLE } from "@/navigation";

export default function PrivateIndex() {
    const { user } = useUserStore();
    const role = user.role;

    const notUser = APP_ROUTES.PUBLIC.LOGIN;
    const isValidRole = Object.values(ROLE).includes(role);
    const href = APP_ROUTES.PRIVATE.DASHBOARD[role as keyof typeof APP_ROUTES.PRIVATE.DASHBOARD];


    if (!user) {
        return <Redirect href={notUser} />
    }
    if (!isValidRole || !href) {
        return <Redirect href={APP_ROUTES.PUBLIC.LOGIN} />;
    }

    return <Redirect href={href} />;
}
