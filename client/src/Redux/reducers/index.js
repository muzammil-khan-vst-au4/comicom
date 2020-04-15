import { createStore, applyMiddleware, compose, combineReducers,  } from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth"
import {productReducer} from './product'
import {featureReducer} from './feature'

const rootReducers = combineReducers({
    auth: authReducer,
    product:productReducer,
    feature: featureReducer

});

const saveToLocalStorage = (state) =>{
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("featureState", serializedState)
    } catch (error) {
        console.log(error)
    }
}

const loadFromLocalStorage = () =>{
    try {
        const serializedState = localStorage.getItem("featureState")
        if(serializedState===null){
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        console.log(error)
        return undefined
    }
}
const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducers,
    persistedState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => {
    saveToLocalStorage({
        feature : store.getState().feature  //this will only save feature state
    })
});

export default store;