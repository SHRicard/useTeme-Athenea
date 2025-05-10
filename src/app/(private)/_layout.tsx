import React from "react";
import { Slot } from "expo-router";
import { PrivateRoute } from "@/components";
import { Siderbar } from "../../components/organisms";

export default function PrivateLayout() {
    return (
        <PrivateRoute>
            <Slot />
            <Siderbar />
        </PrivateRoute>
    );
}
