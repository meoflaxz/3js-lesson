import './style.css'
import App from './App.jsx'
import Clicker from './Clicker.jsx'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

const toto = 'tata'
root.render(
    <div>
        <App/>
        <Clicker/>
    </div>
)