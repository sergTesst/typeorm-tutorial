import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
  constructor(
    height: number,
    width: number,
    orientation: string,
    compressed: boolean,
    comment: string,
    photo: Photo
  ) {
    this.height = height;
    this.width = width;
    this.orientation = orientation;
    this.compressed = compressed;
    this.comment = comment;
    this.photo = photo;
  }
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("int")
  height: number;

  @Column("int")
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  @OneToOne((type) => Photo) // it allows us to create a one-to-one relationship between two entities
  @JoinColumn() //this side of the relationship will own the relationship
  photo: Photo;
}
