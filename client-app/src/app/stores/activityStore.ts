import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';
import { v4 as uuid } from 'uuid';

import agent from '../api/agent';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();

    selectedActivity: Activity | undefined = undefined;

    editMode = false;

    loading = false;

    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate(): Activity[] {
        return Array.from(this.activityRegistry.values()).sort((a, b): number => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async (): Promise<void> => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity): void => {
                activity.date = activity.date.split('T')[0];

                this.activityRegistry.set(activity.id, activity);
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            this.setLoadingInitial(false);
        }
    };

    setLoadingInitial = (state: boolean): void => {
        this.loadingInitial = state;
    };

    selectActivity = (id: string): void => {
        this.selectedActivity = this.activityRegistry.get(id);
    };

    cancelSelectedActivity = (): void => {
        this.selectedActivity = undefined;

    };

    openForm = (id?: string): void => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    };

    closeForm = (): void => {
        this.editMode = false;
    };

    createActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction((): void => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }
        catch (error) {
            console.error(error);
            runInAction((): void => {
                this.loading = false;
            });
        }
    };

    updateActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);

            runInAction((): void => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }
        catch (error) {
            console.error(error);
            runInAction((): void => {
                this.loading = false;
            });
        }
    };

    deleteActivity = async (id: string): Promise<void> => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction((): void => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        }
        catch (error) {
            console.error(error);
            runInAction((): void => {
                this.loading = false;
            });
        }
    };
}
