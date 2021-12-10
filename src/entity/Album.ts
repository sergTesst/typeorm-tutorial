import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Album {
  constructor(name: string) {
    this.name = name;
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany((type) => Photo, (photo) => photo.albums)
  @JoinTable() // this is the owner side of the relationship
  photos: Photo[];
}
