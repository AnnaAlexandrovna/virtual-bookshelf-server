export interface User extends Express.User{
    username?: string;
    emails?: [
        {
            key: string,
            value: string
        }
    ];
};