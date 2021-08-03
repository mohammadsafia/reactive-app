import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

interface Props {
}

const ActivityDashboard: React.FC<Props> = (): JSX.Element => {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect((): void => {
        if (activityRegistry.size <= 1) loadActivities().then();
    }, [activityRegistry.size, loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading App" />;
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    );
};
export default observer(ActivityDashboard);
