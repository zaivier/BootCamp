import React from 'react';


//Children e padrao do react, nele tem o html informado na tag onde foi declarada.
    export default function Header({title, children}) {
    return (
        <header>
            <h1>{title}</h1>
            {children}

        </header>
    );
}
