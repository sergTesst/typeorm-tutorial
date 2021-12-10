import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Photo } from "./Photo";

@Entity()
export class Author {
  constructor(name: string) {
    this.name = name;
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany((type) => Photo, (photo) => photo.author)
  photos: Photo[];
}
