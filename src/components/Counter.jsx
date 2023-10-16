import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState('text');
    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        setCount(count - 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <h1>{value}</h1>
            <input
                type='text'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;