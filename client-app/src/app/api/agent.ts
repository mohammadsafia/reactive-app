import axios, {AxiosResponse} from 'axios';
import {Activity} from '../models/activity';

const sleep = (delay: number): Promise<unknown> => {
    return new Promise((resolve): void => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async (response): Promise<AxiosResponse<any>> => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
});

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const requests = {
    get: <T>(url: string): Promise<T> => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}): Promise<T> => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}): Promise<T> => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string): Promise<T> => axios.delete<T>(url).then(responseBody),
};

const Activities = {
    list: (): Promise<Activity[]> => requests.get<Activity[]>('/activities'),
    details: (id: string): Promise<Activity> => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity): Promise<void> => requests.post<void>('/activities', activity),
    update: (activity: Activity): Promise<void> => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string): Promise<void> => requests.delete<void>(`/activities/${id}`),
};

const agent = {
    Activities,
};

export default agent;
