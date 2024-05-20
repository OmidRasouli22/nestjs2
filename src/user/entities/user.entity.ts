import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        length: 100,
        nullable: true,
    })
    first_name: string;

    @Column({
        length: 100,
        nullable: true
    })
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    age: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
