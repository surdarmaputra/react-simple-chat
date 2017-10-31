import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import windowReducer from './reducers/windowReducer';
import contactsReducer from './reducers/contactsReducer';
import messagesReducer from './reducers/messagesReducer';
import openedMessageReducer from './reducers/openedMessageReducer';
import notesReducer from './reducers/notesReducer';
import searchReducer from './reducers/searchReducer';

const reducers = combineReducers({
	window: windowReducer,
	contacts: contactsReducer,
	messages: messagesReducer,
	openedMessage: openedMessageReducer,
	notes: notesReducer,
	search: searchReducer
});

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger();
	middlewares.push(logger)
}

const configureStore = () => createStore(
	reducers,
	applyMiddleware(...middlewares)
);

export default configureStore;
