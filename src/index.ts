import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";

createConnection()
  .then(async (connection) => {
    const photoRepository = connection.getRepository(Photo);

    const photo = new Photo(
      "User 1 name",
      "I am near polar bears",
      "photo-with-bears.jpg",
      1,
      true
    );

    const photoExists = await photoRepository.findOne({ name: photo.name });
    console.log("photoExists from db", photoExists);

    if (!photoExists) {
      const savedResult = await photoRepository.save(photo);
      console.log("savedResult ", savedResult);
      console.log("Photo has been saved. Photo id is ", photo.id);
    }
  })
  .catch((error) => console.log(error));
