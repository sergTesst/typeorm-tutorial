import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";

createConnection()
  .then(async (connection) => {
    const photoRepository = connection.getRepository(Photo);

    let firstPhotoByNameToUpdate = await photoRepository.findOne({
      name: "User 1 name",
    });
    firstPhotoByNameToUpdate.description = "Me, updating the description";

    const savedResult = await photoRepository.save(firstPhotoByNameToUpdate);
    console.log("savedResult", savedResult);

    console.log("firstPhotoByNameToUpdate", firstPhotoByNameToUpdate);
  })
  .catch((error) => console.log(error));
