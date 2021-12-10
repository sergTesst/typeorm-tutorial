import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";

createConnection()
  .then(async (connection) => {
    const photoRepository = connection.getRepository(Photo);
    const photoMetadataRepository = connection.getRepository(PhotoMetadata);

    const photoWithRelation = new Photo(
      "Me and wolfs",
      "I am near wall",
      "photo-with-snotes.jpg",
      1,
      true
    );

    const metadata = new PhotoMetadata(
      640,
      480,
      "portrait",
      true,
      "amazing photo",
      photoWithRelation
    );

    // //first we should save a photo
    await photoRepository.save(photoWithRelation);

    // //when the photo is saved we can save a photo metadata
    await photoMetadataRepository.save(metadata);

    console.log("all photos", await photoRepository.find());
    console.log("all photo metadatas", await photoMetadataRepository.find());
  })
  .catch((error) => console.log(error));
