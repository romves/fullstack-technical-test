export interface IPaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export interface IPaginationResponse<T> {
    currentPage: number;
    data: T[];
    firstPageUrl: string;
    from: number;
    lastPage: number;
    lastPageUrl: string;
    links: IPaginationLinks[];
    nextPageUrl: string | null;
    path: string;
    perPage: number;
    prevPageUrl: string | null;
    to: number;
    total: number;
}
