import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

const App = (): JSX.Element => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    useEffect((): void => {
        axios.get<Activity[]>('http://localhost:5000/api/activities').then((res): void => {
            setActivities(res.data);
        });
    }, []);

    function handleSelectedActivity(id: string): void {
        setSelectedActivity(activities.find((x: Activity): boolean => x.id === id));
    }

    function handleCancelSelectActivity(): void {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string): void {
        id ? handleSelectedActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose(): void {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity): void {
        activity.id ? setActivities([...activities.filter((x): boolean => x.id !== activity.id), activity])
            : setActivities([...activities, { ...activity, id: uuid() }]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string): void {
        setActivities([...activities.filter((x): boolean => x.id !== id)]);
    }

    return (
        <>
            <NavBar openForm={ handleFormOpen } />
            <Container style={ { marginTop: '7em' } }>
                <ActivityDashboard
                    activities={ activities }
                    selectedActivity={ selectedActivity }
                    selectActivity={ handleSelectedActivity }
                    cancelSelectActivity={ handleCancelSelectActivity }
                    editMode={ editMode }
                    openForm={ handleFormOpen }
                    closeForm={ handleFormClose }
                    createOrEdit={ handleCreateOrEditActivity }
                    deleteActivity={ handleDeleteActivity }
                />
            </Container>
        </>
    );
};

export default App;
