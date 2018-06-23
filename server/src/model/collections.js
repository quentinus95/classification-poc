const database = require('../database')

exports.findAll = async () => {
  return database.getConnection().collection('collections').find({}).toArray()
}

const findOneByName = async (name) => {
  return database.getConnection().collection('collections').findOne({ name: { $eq: name } })
}

exports.findOneByName = findOneByName

exports.findOneImageByName = async (collection, image) => {
  return (await findOneByName(collection)).images.find(i => i.name === image)
}

exports.saveImageLabel = async (collectionName, imageName, author, label) => {
  const collection = await findOneByName(collectionName)
  const image = collection.images.find(image => image.name === imageName)

  image.label = {
    name: label,
    author: author
  }

  await database.getConnection().collection('collections').update({ name: { $eq: collectionName } }, collection)

  return collection
}

exports.saveImageAnnotation = async (collectionName, imageName, author, annotationName, type, coordinates) => {
  const collection = await findOneByName(collectionName)
  const image = collection.images.find(image => image.name === imageName)
  const annotation = image.annotations.find(annotation => annotation.name === annotationName)

  if (annotation) {
    annotation.coordinates = coordinates
  } else {
    image.annotations.push(
      {
        name: annotationName,
        coordinates,
        type,
        author
      }
    )
  }

  await database.getConnection().collection('collections').update({ name: { $eq: collectionName } }, collection)

  return collection
}
