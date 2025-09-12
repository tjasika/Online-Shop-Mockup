import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TestSizes() {
    const [sizes, setSizes] = useState([]);
    
    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sizes');
                setSizes(response.data);
            } catch (err) {
                console.error('Error:', err)
            }
        }
        fetchSizes();
    }, [])

    return (
        <div>
            <h1>Sizes:</h1>
            <ul>
                {sizes.map((size)=> (
                    <li key={size.Id}>
                        ID: {size.Id}, SIZE: {size.Name}
                    </li>
                ))}
            </ul>
        </div>
    )
}