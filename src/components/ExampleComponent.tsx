import * as React from 'react';

export interface IAppProps {
    children: React.ReactNode;
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface IAppState {
}

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);

        this.state = {
        };
    }
    componentDidMount() {

    }

    public render() {
        return (
            <div>

            </div>
        );
    }
}
