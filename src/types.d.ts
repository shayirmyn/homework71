export interface ISubmit {
    name: string;
    price: string;
    photo: string;
}

export interface IGet {
    name: string;
    price: string;
    photo: string;
}

export interface IPut {
    id: string,
    data: ISubmit,
}

export interface IGet2 {
    id: string;
    name: string;
    price: string;
    photo: string;
}

export interface IApiGet {
    [id: string]: IGet;
}