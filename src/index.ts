import "reflect-metadata";
import { createConnection } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { Album } from "./entity/Album";
import { Author } from "./entity/Author";

//more examples at https://typeorm.io/#/
// different samples with react, babel, mongoDb, GraphQL

type Connection = Awaited<ReturnType<typeof createConnection>>;

createConnection()
  .then(async (connection) => {
    await selectPhotosWithQueryBuilder(connection);
  })
  .catch((error) => console.log(error));

async function selectPhotosWithQueryBuilder(connection: Connection) {
  const photoRepository = connection.getRepository(Photo);
  const photos = await photoRepository
    .createQueryBuilder(Photo.name.toLocaleLowerCase())
    .innerJoinAndSelect("photo.metadata", "metadata")
    .leftJoinAndSelect("photo.albums", "album")
    .where("photo.isPublished = true")
    .andWhere("(photo.name = :photoName OR photo.name = :bearName)")
    .orderBy("photo.id", "DESC")
    .take(3)
    .setParameters({ photoName: "Me and bears", bearName: "Me and wolfs" })
    .getMany();

  console.log("photos with query builder \n", photos);
}

async function insertPhotosAndAlbumsInToDb(connection: Connection) {
  const photoRepository = connection.getRepository(Photo);
  // const albumRepository = connection.getRepository(Album);
  // const authorRepository = connection.getRepository(Author);

  // const album1 = new Album("Bears");
  // await albumRepository.save(album1);

  // const album2 = new Album("Swans");
  // await albumRepository.save(album2);

  // const author = new Author("serhi author");
  // await authorRepository.save(author);

  // const photo = new Photo(
  //   "Me and bears",
  //   "I am near bears for the second time",
  //   "photo-with-bears-2.jpg",
  //   1,
  //   true
  // );
  // photo.albums = [album1, album2];
  // photo.author = author;

  // await photoRepository.save(photo);

  const loadedPhoto = await photoRepository.findOne(
    { name: "Me and bears" },
    { relations: ["author", "albums"] }
  );

  console.log("loadedPhoto \n", loadedPhoto);
}

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
