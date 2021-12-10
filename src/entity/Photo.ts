import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { PhotoMetadata } from "./PhotoMetadata";

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

  @OneToOne((type) => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
  metadata: PhotoMetadata;
}
