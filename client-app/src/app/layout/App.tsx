import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App = (): JSX.Element => {
    const location = useLocation();
    return (
        <>
            <Route path="/" component={ HomePage } exact />
            <Route path={ '/(.+)' } render={ (): JSX.Element => (
                <>
                    <NavBar />
                    <Container style={ { marginTop: '7em' } }>

                        <Route path="/activities" component={ ActivityDashboard } exact />
                        <Route path="/activities/:id" component={ ActivityDetails } />
                        <Route key={ location.key } path={ ['/createActivity', '/manage/:id'] } component={ ActivityForm } />
                    </Container>
                </>
            ) } />
        </>
    );
};

export default observer(App);
