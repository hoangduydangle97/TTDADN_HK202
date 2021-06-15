// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

// core styles
import './scss/volt.scss';

// vendor styles
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-datetime/css/react-datetime.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';
import { Connector } from 'mqtt-react-hooks';
import { __ADAFRUIT_KEY__, __ADAFRUIT_USER__ } from 'share/environments';

dotenv.config();
const queryClient = new QueryClient();
ReactDOM.render(
  <Connector
    brokerUrl="wss://io.adafruit.com:443"
    options={{
      username: __ADAFRUIT_USER__,
      password: __ADAFRUIT_KEY__,
      connectTimeout: 60 * 1000,
      keepalive: 3600,
    }}
  >
    {/* <QueryClientProvider client={queryClient}> */}

    <HashRouter>
      <ScrollToTop />
      <HomePage />
    </HashRouter>
    {/* </QueryClientProvider> */}
  </Connector>,
  document.getElementById('root')
);
