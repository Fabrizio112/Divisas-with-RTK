import React from 'react'
import ReactDOM from 'react-dom/client'
import CurrencyApp from './components/CurrencyApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import "./assets/css/styles.css"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrencyApp />
    </Provider>
  </React.StrictMode>,
)
