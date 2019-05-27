export class User {
    Id :number;
    FirstName :string;
    LastName :string;
    Email :string;
     Address:string;
}
export interface IUser {
    Id :number;
    FirstName :string;
    LastName :string;
    Email :string;
    Address:string;
    TotalCount:number;
    PageSize:number;
    PageNumber:number;
}

export interface IUserList {
    User:User[]
    TotalCount:number;
    PageSize:number;
    PageNumber:number;
}