import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";
import { Author } from "./Author";

@Entity()
export class Photo {
  constructor(
    name: string,
    description: string,
    filename: string,
    views: number,
    isPublished: boolean = false
  ) {
    this.name = name;
    this.description = description;
    this.filename = filename;
    this.views = views;
    this.isPublished = isPublished;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column({ type: "double precision" })
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne((type) => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
    cascade: true, // allows us to save a photo object and the metadata object will be saved automatically because of cascade options
  })
  metadata: PhotoMetadata;

  @ManyToOne((type) => Author, (author) => author.photos)
  author: Author;
}
