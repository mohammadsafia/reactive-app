import React from 'react';
import {Button, Container, Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

interface Props {
}

const NavBar: React.FC<Props> = (): JSX.Element => {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name="Activities"/>
                <Menu.Item>
                    <Button as={NavLink} to="/createActivity" position="true" color="green" content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default NavBar
