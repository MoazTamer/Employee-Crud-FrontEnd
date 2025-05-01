export interface Employee {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
}

export interface CreateEmployee {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
}

export interface UpdateEmployee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
}
