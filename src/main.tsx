import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider  } from 'react-redux'
import Reducers from './Store.tsx'

createRoot(document.getElementById('root')!).render(

  

  <StrictMode>
    <BrowserRouter>
    <Provider store={Reducers}>
            <App />
      </Provider>    
    </BrowserRouter>
  </StrictMode>,

  
)
