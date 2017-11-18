import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import appMiddleware from './middlewares/app_middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(appMiddleware)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
