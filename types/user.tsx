export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    enabled: boolean;
    confirmed: boolean;
    password?: string;
}

export default User;
