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

  @OneToOne((type) => Photo, (photo) => photo.metadata)
  @JoinColumn()
  photo: Photo;
}
