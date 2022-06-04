import React, {useEffect, useState} from 'react';
import {Button, Header, Segment} from 'semantic-ui-react';
import {Activity} from 'app/models/activity';
import {useStore} from 'app/stores/store';
import {observer} from 'mobx-react-lite';
import {Link, useHistory, useParams} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

import LoadingComponent from 'app/layout/LoadingComponent';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {MyTextInput, MyTextArea, MySelectInput, categoryOptions, MyDateInput} from 'app/common';

interface Props {
}

const ActivityForm: React.FC<Props> = (): JSX.Element => {
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: '',
    });

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        category: Yup.string().required(),
    })

    useEffect((): void => {
        if (id) loadActivity(id).then((activity: Activity | undefined): void => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit(activity: Activity): void {
        if (activity.id.length === 0) {
            const newActivity = {...activity, id: uuid()};
            createActivity(newActivity).then((): void => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then((): void => history.push(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..."/>;

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal"/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={handleSubmit}
            >
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" autoComplete="off">
                        <MyTextInput name="title" placeholder="Title"/>
                        <MyTextArea rows={4} placeholder="Description" name="description"/>
                        <MySelectInput options={categoryOptions} placeholder="Category" name="category"/>
                        <MyDateInput
                            placeholderText="Date" name="date" showTimeSelect timeCaption='time' dateFormat="MMMM d, yyyy, h:mm aa"/>
                        <Header content="Location Details" sub color="teal"/>
                        <MyTextInput placeholder="City" name="city"/>
                        <MyTextInput placeholder="Venue" name="venue"/>
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated="right"
                            positive
                            type="submit"
                            content="Submit"
                        />
                        <Button as={Link} to="/activities" floated="right" type="button" content="Cancel"/>
                    </Form>
                )}
            </Formik>
        </Segment>
    );
};
export default observer(ActivityForm);
