import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';

interface Props {

}

const ActivityList: React.FC<Props> = (): JSX.Element => {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;


    return (
        <>
            { groupedActivities.map(([group, activities]): JSX.Element => (
                <Fragment key={ group }>
                    <Header sub color="teal">{ group }</Header>
                    { activities.map((activity): JSX.Element => (
                        <ActivityListItem key={ activity.id } activity={ activity } />
                    )) }
                </Fragment>
            )) }
        </>

    );
};

export default observer(ActivityList);
