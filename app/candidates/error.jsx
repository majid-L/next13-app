'use client';

import { useEffect } from "react";

const Error = ({error, reset}) => {

useEffect(() => {
console.log('>>>>>****HERE IS THE ERROR:', error);
}, [error]);

return (<main>
    <h2>Something went wrong...</h2>
    <button onClick={() => reset()}>Retry</button>
    <p>{}</p>
</main>);
};

export default Error;