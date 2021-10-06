import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';


import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter basename='/limor-abv-03-10-2021'>
        <Provider store={store}>
            <App />
        </Provider>  
    </BrowserRouter>, 
    document.getElementById('root')
);
