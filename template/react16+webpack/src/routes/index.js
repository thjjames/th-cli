import { lazy } from 'react';

export default [
    {
        path: '/demo',
        component: lazy(() => import('@/views/demo'))
    }
];