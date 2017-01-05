import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// AppContainer is a necessary wrapper component for HMR
import { AppContainer } from 'react-hot-loader';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('content')
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
}
