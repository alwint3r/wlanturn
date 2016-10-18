import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

export default [
  function executePromise(store) {
    return next => (action) => {
      const { types, promiseProducer, ...rest } = action;

      if (!promiseProducer) {
        return next(action);
      }

      const [REQUEST, SUCCESS, ERROR] = types;

      next({ type: REQUEST, ...rest });

      return promiseProducer(store).then(result =>
        next({ type: SUCCESS, result, ...rest })
      ).catch(ex =>
        next({ type: ERROR, error: ex, ...rest })
      );
    };
  },

  routerMiddleware(browserHistory),
];
