/* eslint-disable comma-dangle */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './state/store';
import ColorButtons from './pages/testPage';
import ClippedDrawer from './components/clippedDrawer';
import ResponsiveAppBar from './components/appBar';
import ActionsPage from './pages/actionsPage';
import AboutPage from './pages/aboutPage';
import ExamplesPage from './pages/examplesPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/testPage" element={<ColorButtons />} />
          <Route path="/clippedDrawer" element={<ClippedDrawer />} />
          <Route path="/actionsPage" element={<ActionsPage />} />
          <Route path="/aboutPage" element={<AboutPage />} />
          <Route path="/examplesPage" element={<ExamplesPage />} />
          <Route path="/appBar" element={<ResponsiveAppBar />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
