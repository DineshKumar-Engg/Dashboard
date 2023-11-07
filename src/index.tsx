import { createRoot } from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/styles.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/themeContext';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import './i18n';


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
createRoot(container as Element).render(children);
reportWebVitals();
