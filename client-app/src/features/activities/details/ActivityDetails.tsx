import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

interface Props {
}

const ActivityDetails: React.FC<Props> = (): JSX.Element => {
    const { activityStore } = useStore();
    const activity = activityStore.selectedActivity!;

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
                    <Button onClick={ (): void => activityStore.openForm(activity.id) } basic color="blue" content="Edit" />
                    <Button onClick={ activityStore.cancelSelectedActivity } basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
export default ActivityDetails;
