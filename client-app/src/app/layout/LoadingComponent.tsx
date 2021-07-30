import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

const LoadingComponent: React.FC<Props> = ({ inverted = true, content = 'Loading...' }): JSX.Element => {
    return (
        <Dimmer active inverted={ inverted }>
            <Loader content={ content } />
        </Dimmer>
    );
};
export default LoadingComponent;
