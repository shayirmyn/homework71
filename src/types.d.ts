export interface IGet {
    name: string;
    price: string;
    photo: string;
}

export interface IBasket extends IGet {
    id: string;
    amount: number;
}

export interface IOrderDish {
    [id: string]: number,
}

export interface IPut {
    id: string,
    data: IGet,
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

export interface IOrdersBasket {
    id: string;
    dishes: IBasket[];
}