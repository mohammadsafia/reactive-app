import { makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../models/activity';

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

    get groupedActivities(): [string, Activity[]][] {
        return Object.entries(this.activitiesByDate.reduce((activities, activity): { [p: string]: Activity[] } => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] }),
        );
    }

    loadActivities = async (): Promise<void> => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach((activity): void => {
                this.setActivity(activity);
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

    loadActivity = async (id: string): Promise<Activity | undefined> => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);

                runInAction((): void => {
                    this.selectedActivity = activity;
                });

                this.setLoadingInitial(false);
                return activity;
            }
            catch (error) {
                console.error(error);
                this.setLoadingInitial(false);
            }
        }
    };

    createActivity = async (activity: Activity): Promise<void> => {
        this.loading = true;
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

    private getActivity = (id: string): Activity | undefined => {
        return this.activityRegistry.get(id);
    };

    private setActivity = (activity: Activity): void => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    };
}
