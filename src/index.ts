import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";

createConnection()
  .then(async (connection) => {
    const photos = await connection.manager.find(Photo);
    if (!photos.length) {
      const photo = new Photo(
        "User 1 name",
        "I am near polar bears",
        "photo-with-bears.jpg",
        1,
        true
      );
      const savedResult = await connection.manager.save(photo);
      console.log("savedResult ", savedResult);
      console.log("Photo has been saved. Photo id is ", photo.id);
    }
  })
  .catch((error) => console.log(error));
