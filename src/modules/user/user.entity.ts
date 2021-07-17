import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username: string

    @Column()
    @Exclude()
    password: string

    @Column({ default: true })
    isPublic: boolean

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    phoneNum: string

    @Column()
    dateOfBirth: Date

    @Column()
    website: string

    @Column()
    biography: string
}