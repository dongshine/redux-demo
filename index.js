import React from 'react'
import { render } from 'react-dom';
import { createStore,combineReducers} from 'redux';
import { Provider} from 'react-redux';
import App from './app' 

// reducers *********************************************************************
function visibilityFilter(state = "SHOW_ALL", action) {
	switch (action.type) {
        case "CHANGE_FILTER":
            return action.filter
        default:
            return state
	}
}

function todos (state = [], action) {
	switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, 
                {
                    text: action.text,
                    deleted: false
                }
            ]
        case "DELE_TODO":
            return [
                ...state.slice(0, action.index),
                Object.assign({},state[action.index],{deleted: true}),...state.slice(action.index + 1)
            ]
        default:
            return state
	}
}

const todoApp = combineReducers({
	visibilityFilter,
    todos    
})
// reducers *********************************************************************



let store = createStore(todoApp); 
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)