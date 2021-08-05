import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
    const [name, setName] = useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('name', name);

        history.push('/face');
    }

    const showWelcomeMessage = ({name}) =>
    {
        return (
            <div className="mb-8 text-gray-300 text-2xl lg:text-3xl text-center font-sans capitalize">
                Welcome <span>{name}!</span>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center items-center h-screen">
            <div className="w-1/2">
                <div>
                    {name && showWelcomeMessage({name})}
                </div>
                <form onSubmit={handleSubmit}>
                    <img src={process.env.PUBLIC_URL + '/human_icon.png'}
                        className="mb-8 w-28 mx-auto"
                        alt="Human"
                    />
                    <div className="mx-auto text-center flex justify-center">
                        <input 
                            type="text" 
                            autoComplete="false" 
                            placeholder="Your name" 
                            className="p-2 border-2 focus:border-yellow-400 outline-none rounded-l-sm text-gray-700 font-bold capitalize" 
                            onChange={(e) => setName(e.currentTarget.value)} />
                        <button type="submit" className="p-2 bg-yellow-300 rounded-r-sm font-bold">Go!</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HomePage;