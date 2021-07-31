import React, { useEffect } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

interface Props {
}

const ActivityDetails: React.FC<Props> = (): JSX.Element => {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect((): void => {
        if (id) loadActivity(id).then();
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Card fluid>
            <Image src={ `/assets/categoryImages/${ activity.category }.jpg` } />
            <Card.Content>
                <Card.Header>{ activity.title }</Card.Header>
                <Card.Meta>
                    <span>{ activity.date }</span>
                </Card.Meta>
                <Card.Description>
                    { activity.description }
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group fluid>
                    <Button as={ Link } to={ `/manage/${ activity.id }` } basic color="blue" content="Edit" />
                    <Button as={ Link } to={ '/activities' } basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
export default observer(ActivityDetails);
