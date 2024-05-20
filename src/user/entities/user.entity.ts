import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        length: 100,
    })
    first_name: string;

    @Column({
        length: 100,
    })
    last_name: string;

    @Column()
    email: string;

    @Column("smallint")
    age: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
