import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {store} from './store/store.jsx'
import {Provider} from 'react-redux' ;
import {BrowserRouter,Routes , Route} from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Toaster/>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
