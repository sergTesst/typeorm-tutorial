import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";

createConnection()
  .then(async (connection) => {
    const photoRepository = connection.getRepository(Photo);

    let allPhotos = photoRepository.find();
    console.log("all photos from db ", allPhotos);

    let firstPhoto = await photoRepository.findOne();
    console.log("first photo from db ", firstPhoto);

    let firstPhotoByName = await photoRepository.findOne({
      name: "User 1 name",
    });
    console.log("firstPhotoByName ", firstPhotoByName);

    let allViewedPhotos = await photoRepository.find({
      views: 1,
    });
    console.log("allViewedPhotos ", allViewedPhotos);

    let allPublishedPhotos = await photoRepository.find({
      isPublished: true,
    });
    console.log("allPublishedPhotos ", allPublishedPhotos);

    const [allPhotosCounted, count] = await photoRepository.findAndCount();
    console.log("allPhotosCounted ", allPhotosCounted);
    console.log("count ", count);
  })
  .catch((error) => console.log(error));
