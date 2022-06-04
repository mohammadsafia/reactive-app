import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {Activity} from '../models/activity';
import {history} from '../../index';
import {store} from 'app/stores/store';


axios.defaults.baseURL = 'http://localhost:5000/api';


const sleep = (delay: number): Promise<unknown> => {
    return new Promise((resolve): void => {
        setTimeout(resolve, delay);
    });
};

const badRequestHandler = (config: AxiosRequestConfig, data: any) => {
    if (typeof data === 'string') {
        toast.error(data)
    }

    if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/not-found')
    }

    if (data.errors) {
        const modalStateErrors = [];
        for (const key in data.errors) {
            if (data.errors[key]) {
                modalStateErrors.push(data.errors[key])
            }
        }
        throw modalStateErrors.flat();
    }
}

const errorHandler = (error: AxiosError<any>): void => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            badRequestHandler(config, data);
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
}


axios.interceptors.response.use(async (response): Promise<AxiosResponse<any>> => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    errorHandler(error);
    return Promise.reject(error);
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
