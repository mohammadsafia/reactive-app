import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

interface Props {
}

const NavBar: React.FC<Props> = (): JSX.Element => {
    const { activityStore } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={ { marginRight: '10px' } } />
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={ (): void => activityStore.openForm() } position="true" color="green" content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default NavBar
