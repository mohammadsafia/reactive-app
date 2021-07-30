import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import { NavBar } from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App = (): JSX.Element => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect((): void => {
        agent.Activities.list().then((response): void => {
            const activities: Activity[] = [];

            response.forEach((activity): void => {
                activity.date = activity.date.split('T')[0];
                activities.push(activity);
            });

            setActivities(activities);
            setLoading(false);
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
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then((): void => {
                setActivities([...activities.filter((x): boolean => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }
        else {
            activity.id = uuid();
            agent.Activities.create(activity).then((): void => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            });
        }
    }

    function handleDeleteActivity(id: string): void {
        setSubmitting(true);
        agent.Activities.delete(id).then((): void => {
            setActivities([...activities.filter((x): boolean => x.id !== id)]);
            setSubmitting(false);
        });
    }

    if (loading) return <LoadingComponent content="Loading App" />;

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
                    submitting={ submitting }
                />
            </Container>
        </>
    );
};

export default App;
