import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { ChatProvider } from './context/ChatProvider.jsx';
import {Provider} from "react-redux"
import { store } from './store/Store.jsx';
import AuthLoader from './components/AuthLoader.jsx';

createRoot(document.getElementById('root')).render(
   
   <Provider store ={store}>
   <BrowserRouter>
   <ChatProvider >
      <AuthLoader>
   <App />
   </AuthLoader>
   </ChatProvider>
   </BrowserRouter> 
   </Provider>
   
    
)
