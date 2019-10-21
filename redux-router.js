import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, match, RouterContext, applyRouterMiddleware,
         hashHistory, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import useScroll from '@sketchpixy/react-router-scroll';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware as origApplyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import { FetchData, fetchDataOnServer, reducer as fetching } from '@sketchpixy/redux-fetch-data';
import { flattenComponents } from '@sketchpixy/redux-fetch-data/lib/utils';

import onRouterSetup from '@sketchpixy/rubix/lib/node/onRouterSetup';
import onRouterUpdate from '@sketchpixy/rubix/lib/node/onRouterUpdate';
import checkScroll from '@sketchpixy/rubix/lib/node/checkScroll';

import isBrowser from '@sketchpixy/rubix/lib/isBrowser';

if (isBrowser()) {
  onRouterSetup();
}

class WrapperComponent extends React.Component {
  render() {
    return this.props.children;
  }
}

var isRouterSet = false, history, reducer, store, routes;

export function setupReducers(reducers) {
  const appReducer = combineReducers({
    ...reducers,
    fetching: fetching,
    routing: routerReducer,
  });

  reducer = (state, action) => {
    if(!state){
      state = {}
    }
    if (action.type === 'USER_LOGOUT') {
      const { fetching, routing } = state;
      // we reset the state here!
      state = { fetching, routing };
    }

    return appReducer(state, action);
  };
}

export function replaceReducers(reducers) {
  setupReducers(reducers);
  store.replaceReducer(reducer);
}

function preloadedData() {
  return document.getElementById('preloadedData');
}

function getData() {
  let element = preloadedData();
  return element ? JSON.parse(element.textContent || "{}") : '';
}

var middlewares = [ thunk ];
export function applyMiddleware(...args) {
  if (args.length) {
    middlewares = middlewares.concat(args);
  }
}

function createStoreWithMiddleware() {
  return compose(
    origApplyMiddleware(...middlewares),
    isBrowser() && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);
}

export function createReduxStore(initialState) {
  return (createStoreWithMiddleware())(reducer, initialState);
}

function onFetchData(props) {
  // onRouterUpdate();
  var container = document.getElementById('container');
  if (container) {
    container.scrollTop = 0;
  }
  return <FetchData {...props} />;
}

export default function render(Component, onRender) {
  if (!onRender) onRender = function() {};

  if (isBrowser()) {
    // in browser

    if (!isRouterSet) {
      isRouterSet = true;
      history = (Modernizr.history
                        ? browserHistory
                        : hashHistory);

      const initialState = getData();
      store = createReduxStore(initialState);
      history = syncHistoryWithStore(history, store);

      routes = (
        <Provider store={store} key='provider'>
          <Router history={history}
                  render={onFetchData}>
            {Component}
          </Router>
        </Provider>
      );
    }

    ReactDOM.render(<AppContainer><WrapperComponent>{routes}</WrapperComponent></AppContainer>,
      document.getElementById('app-container'),
      onRender);
  }
}

export function renderHTMLString(routes, req, callback) {
  const store = createReduxStore();

  // in server
  match({ routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (!renderProps) {
      if (error) {
        callback(error);
      } else if (redirectLocation) {
        callback(null, redirectLocation);
      } else {
        callback('renderProps not defined!');
      }
      return;
    }

    fetchDataOnServer(renderProps, store).then(() => {
      if (error) {
        callback(error);
      } else if (redirectLocation) {
        callback(null, redirectLocation);
      } else if (renderProps) {
        let content = null;

        try {
          content = ReactDOMServer.renderToString(
                    <AppContainer>
                      <Provider store={store} key='provider'>
                        <RouterContext {...renderProps} />
                      </Provider>
                    </AppContainer>
                  );
        } catch(e) {
          // do nothing
        }

        callback(null, null, {
          content: content,
          data: store.getState()
        });
      } else {
        callback({
          message: 'Not found'
        });
      }
    }).catch(callback);
  });
}