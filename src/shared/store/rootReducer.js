import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app/reducer';
import demo from './demo/reducer';

const rootReducer = combineReducers({
    app,
    router,
    demo,
});

export default rootReducer;
