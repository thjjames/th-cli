// import 'core-js/stable'; // useBuiltIns: 'usage' does not required
// import 'regenerator-runtime/runtime';
import routes from '@/routes';
import '@/apis';
import './env-log';
import './event-bus';
import '@/assets/style/index.less';
import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

render(
    <BrowserRouter>
        <Routes>
            {
                routes.map(item => (
                    <Route key={item.path} path={item.path} element={
                        <Suspense fallback={null}>
                            <item.component />
                        </Suspense>
                    } />
                ))
            }
        </Routes>
    </BrowserRouter>,
    document.getElementById('app')
);
