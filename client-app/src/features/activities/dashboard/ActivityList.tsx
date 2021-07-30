import React, { SyntheticEvent, useState } from 'react';
import { Activity } from '../../../app/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
    activities: Activity[];
    submitting: boolean;
    selectActivity(id: string): void;
    deleteActivity(id: string): void;
}

const ActivityList: React.FC<Props> = ({ activities, selectActivity, deleteActivity, submitting }): JSX.Element => {
    const [target, setTarget] = useState('');

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string): void {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                { activities.map((activity): JSX.Element => (
                    <Item key={ activity.id }>
                        <Item.Content>
                            <Item.Header as="a">{ activity.title }</Item.Header>
                            <Item.Meta>{ activity.date }</Item.Meta>
                            <Item.Description>
                                <div>{ activity.description }</div>
                                <div>{ activity.city } ,{ activity.venue }</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={ (): void => selectActivity(activity.id) } floated="right" content="View" color="blue" />
                                <Button
                                    name={ activity.id } loading={ submitting && target === activity.id }
                                    onClick={ (e): void => handleActivityDelete(e, activity.id) }
                                    floated="right" content="Delete" color="red" />
                                <Label basic content={ activity.category } />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                )) }
            </Item.Group>
        </Segment>
    );
};

export default ActivityList;
