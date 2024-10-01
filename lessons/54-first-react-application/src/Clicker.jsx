import { useEffect,useState } from 'react'


export default function Clicker()
{
    const [ count, setCount ] = useState(0)

    useEffect(() =>
    {
        localStorage.setItem('count', count)
    }, [ count ])

    const buttonClick = () => {
        setCount(count + 1)
        console.log(count)
    }
    return (
        <div>
            <div>Clicks count: {count}</div>
            <button onClick={ buttonClick}>Click me</button>
        </div>
    )
}
