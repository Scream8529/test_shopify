import React from 'react';
import MainPage from 'app/pages/main';
import { AppRoutesProps } from 'app/models/router';

export enum AppRoutes {
    MAIN = 'main',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
};
