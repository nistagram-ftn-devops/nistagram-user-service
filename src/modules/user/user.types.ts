export class UserRegistrationDto {
    username!: string
    password!: string
    name: string
    email: string
    phoneNum: string
    dateOfBirth: Date
    website: string
    biography: string
    isAgent: boolean
}

export enum UserRole {
    user = 'user',
    admin = 'admin', 
    agent = 'agent'
}