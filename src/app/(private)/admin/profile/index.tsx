import { TempleProfile, HeaderApp } from '@/components';
import { router } from "expo-router";


export default function ProfileScreen() {
    return (
        <>
            <HeaderApp
                direction="left"
                viewType="Profile"
                onPress={() => router.back()}
            />
            <TempleProfile />
        </>
    );
}
