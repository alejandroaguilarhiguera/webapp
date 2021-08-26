export interface User {
    _id: number;
    displayName: string;
    avatar: string;
    phoneNumber: string;
    email: string;
    enabled: boolean;
    confirmed: boolean;
    password?: string;
}

export default User;
