import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";

createConnection()
  .then(async (connection) => {
    const photoRepository = connection.getRepository(Photo);

    const photoToDelete = new Photo(
      "User to delete",
      "delete me",
      "delete.jpg",
      2,
      true
    );
    await photoRepository.save(photoToDelete);

    console.log("all photos", await photoRepository.find());
    console.log(
      "deleted result ",
      await photoRepository.remove(
        await photoRepository.findOne({ name: photoToDelete.name })
      )
    );
    console.log("all photos after deletion", await photoRepository.find());
  })
  .catch((error) => console.log(error));
