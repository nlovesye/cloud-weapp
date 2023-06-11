import { DefaultContext, DefaultState } from 'koa';

export type Nullable<T> = T | null;

export type AppState = DefaultState;

export type ApplicationContext = DefaultContext;

export interface AppResponseBodyT<D = unknown> {
    status: AppStatusEnum;
    message: string;
    data?: D;
}

export enum AppStatusEnum {
    SUCCESS = 200,
    UN_AUTHORIZATION = 401,
    FAIL = 500,
}

export type JsonRecord<T = unknown> = Record<'id', string> & T;
