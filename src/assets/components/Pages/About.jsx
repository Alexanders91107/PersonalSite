import React, { useState } from 'react';

function About(){
    const [count, setCount] = useState(0);

    return (
        <div className="main-container">
            <p>This is the about page</p>
            <p>You have clicked the button {count} times.</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default About;