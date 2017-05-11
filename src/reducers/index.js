import { combineReducers } from 'redux';

import repos from './repos';
import user from './user';

const rootReducer = combineReducers({
    repos,
    user,
});

export default rootReducer;
