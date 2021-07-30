import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm(): void;
}

export const NavBar: React.FC<Props> = ({ openForm }): JSX.Element => {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={ { marginRight: '10px' } } />
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={ openForm } position="true" color="green" content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    );
};
