import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";

type Connection = Awaited<ReturnType<typeof createConnection>>;

createConnection()
  .then(async (connection) => {
    await savingPhotoAndPhotoMetadataWithCascadeOption(connection);
  })
  .catch((error) => console.log(error));

async function savingPhotoAndPhotoMetadataWithCascadeOption(
  connection: Connection
) {
  const photo = new Photo(
    "Me and ducks",
    "I am near ducks",
    "photo-with-ducks.jpg",
    1,
    true
  );

  const metadata = new PhotoMetadata(
    640,
    480,
    "portrait",
    true,
    "historical photo"
  );

  photo.metadata = metadata; // we've connected objs

  const photoRepository = connection.getRepository(Photo);
  const savedRes = await photoRepository.save(photo);
  console.log("savedRes photo ", savedRes);
}

async function loadingObjectsWithTheirRelationsWithQueryBuilder(
  connection: Connection
) {
  const name = Photo.name.toLowerCase();

  const photos = await connection
    .getRepository(Photo)
    .createQueryBuilder(name)
    .innerJoinAndSelect("photo.metadata", "metadata")
    .getMany();
  console.log("photos with query builder", photos);
}

async function loadingObjectsWithTheirRelations(connection: Connection) {
  const photoRepository = connection.getRepository(Photo);
  const photos = await photoRepository.find({ relations: ["metadata"] });
  console.log("photos ", photos);
}

async function storeRelationShipBetweenPhotoAndPhotoMedatada(
  connection: Connection
) {
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
}
