import React from 'react';
import {Route, Switch, useLocation} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from 'features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite';
import HomePage from 'features/home/HomePage';
import TestErrors from 'features/errors/TestError';
import ActivityForm from 'features/activities/form/ActivityForm';
import ActivityDetails from 'features/activities/details/ActivityDetails';
import {ToastContainer} from 'react-toastify';
import NotFound from 'features/errors/NotFound';
import ServerError from 'features/errors/ServerError';

const App = (): JSX.Element => {

    const location = useLocation();
    return (
        <>
            <ToastContainer position="bottom-right"/>
            <Route path="/" component={HomePage} exact/>
            <Route path={'/(.+)'} render={(): JSX.Element => (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route path="/activities" component={ActivityDashboard} exact/>
                            <Route path="/activities/:id" component={ActivityDetails}/>
                            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
                            <Route path="/errors" component={TestErrors}/>
                            <Route path="/server-error" component={ServerError}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </>
            )}/>
        </>
    );
};

export default observer(App);
