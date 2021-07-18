import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Follow extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    followerId: number

    @Column()
    followeeId: number

    @Column()
    accepted: boolean

    @Column()
    activeRequest: boolean
}