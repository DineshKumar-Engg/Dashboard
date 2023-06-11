import React,{useEffect,useContext} from 'react';
// import ReactDOM from 'react-dom'; // For React 17
import { createRoot } from 'react-dom/client'; // For React 18
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import './styles/styles.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/themeContext';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import './i18n';


// const {auth} = useContext(AuthContexts)
//     useEffect(()=>{
//         if(auth!==null && auth?.length !==0)
//         {
//             navigate('../auth-pages/login')
//         }
//         else{
//             navigate('/')
//         }
//     },[])

const children = (
	<Provider store={store}>
		<ThemeContextProvider>
			<Router>
						<App />
			</Router>
		</ThemeContextProvider>
		</Provider>

);

const container = document.getElementById('root');

// ReactDOM.render(children, container); // For React 17
createRoot(container as Element).render(children); // For React 18

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
