import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { ChatProvider } from './context/ChatProvider.jsx';

createRoot(document.getElementById('root')).render(
   
   <BrowserRouter>
   <ChatProvider >
   <App />
   </ChatProvider>
   </BrowserRouter> 
   
    
)
