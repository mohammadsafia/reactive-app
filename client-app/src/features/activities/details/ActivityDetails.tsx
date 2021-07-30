import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
    cancelSelectActivity(): void;
    openForm(id: string): void;
}

const ActivityDetails: React.FC<Props> = ({ activity, cancelSelectActivity, openForm }): JSX.Element => {
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
                    <Button onClick={ (): void => openForm(activity.id) } basic color="blue" content="Edit" />
                    <Button onClick={ cancelSelectActivity } basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};
export default ActivityDetails;
