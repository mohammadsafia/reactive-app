import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {

}

const ActivityList: React.FC<Props> = (): JSX.Element => {
    const [target, setTarget] = useState('');
    const { activityStore } = useStore();

    async function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string): Promise<void> {
        setTarget(event.currentTarget.name);
        await activityStore.deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                { activityStore.activitiesByDate.map((activity): JSX.Element => (
                    <Item key={ activity.id }>
                        <Item.Content>
                            <Item.Header as="a">{ activity.title }</Item.Header>
                            <Item.Meta>{ activity.date }</Item.Meta>
                            <Item.Description>
                                <div>{ activity.description }</div>
                                <div>{ activity.city } ,{ activity.venue }</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={ (): void => activityStore.selectActivity(activity.id) } floated="right" content="View" color="blue" />
                                <Button
                                    name={ activity.id } loading={ activityStore.loading && target === activity.id }
                                    onClick={ (e): any => handleActivityDelete(e, activity.id) }
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

export default observer(ActivityList);
