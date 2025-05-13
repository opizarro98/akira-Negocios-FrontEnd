export interface RegisterDto {
    // USER
    username: string;
    password: string;
    roleUser: string;

    // PERSON
    identification: string;
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    landlinePhone: string;
    mobilePhone: string;
    email: string;
    birthDate: string;
    address: string;
    type: string;
}