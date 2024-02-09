import React, { Suspense, memo, useCallback } from 'react';
import { PageLoader } from 'app/components/loaders/page-loader';
import { routeConfig } from 'app/constants/route-config';
import { AppRoutesProps } from 'app/models/router';
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);

