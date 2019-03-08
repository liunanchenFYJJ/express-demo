import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Role } from './Role'

@Entity('express_demo_user')
export class User {

    @PrimaryColumn()
    id: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    // @OneToOne(type => Role)
    // @JoinColumn()
    @Column()
    roleId: number;

}
