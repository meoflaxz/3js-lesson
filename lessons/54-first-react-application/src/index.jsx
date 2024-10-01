import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

root.render(
    <div>
        <h1>Hello React</h1>
        <p>Some content</p>
    </div>
)