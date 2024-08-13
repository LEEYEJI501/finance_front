export interface IPaging {
    page: number;
    pageSize: number;
}

export interface IApiResponse<T> {
    success: boolean;
    data?: T;
    error?: any;
}