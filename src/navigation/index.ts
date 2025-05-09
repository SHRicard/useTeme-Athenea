// routes.constants.js
export const ROLE = {
    ADMIN: 'admin',
    USER: 'user',
    BUSINESS: 'business'
}


export const APP_ROUTES = {
    PUBLIC: {
        LANDING: '/',
        LOGIN: '/signin',
    },
    PRIVATE: {
        DASHBOARD: {
            [ROLE.ADMIN]: '/admin/dashboard',
            [ROLE.USER]: '/user/dashboard',
            [ROLE.BUSINESS]: '/business/dashboard'
        },
        PROFILE: {
            [ROLE.ADMIN]: '/admin/profile',
            [ROLE.USER]: '/user/profile',
            [ROLE.BUSINESS]: '/business/profile'

        },
    }
} as const;