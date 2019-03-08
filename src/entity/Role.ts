import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('express_demo_role')
export class Role {

    @PrimaryColumn()
    roleId: string;
    
    @Column()
    roleName: string;
}