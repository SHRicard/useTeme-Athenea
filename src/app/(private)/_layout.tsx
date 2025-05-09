import React from "react";
import { Slot } from "expo-router";
import { PrivateRoute } from "@/components";

export default function PrivateLayout() {
    return (
        <PrivateRoute>
            <Slot />
        </PrivateRoute>
    );
}
