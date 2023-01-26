import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';
import IntlProviderWrapper from './IntlProviderWrapper'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import  data  from './createSlice'
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
    reducer: {
        items: data
    }
})

root.render(
    <Provider store={store}>
        <IntlProviderWrapper>
            <Routing />
        </IntlProviderWrapper>
    </Provider>

);



