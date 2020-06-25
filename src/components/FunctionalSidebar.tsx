import * as React from 'react';

interface IAppProps {
    title: string;
}

const App: React.FunctionComponent<IAppProps> = ({ children, title }) => {

    return (

        <input ref={searchInput}></input>;
    );
};

export default App;
