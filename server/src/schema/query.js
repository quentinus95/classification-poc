const collections = [
  {
    name: 'collection1',
    images: [
      {
        name: 'image1.png'
      },
      {
        name: 'image2.png'
      }
    ]
  },
  {
    name: 'collection2',
    images: [
      {
        name: 'image1.png'
      },
      {
        name: 'image2.png'
      }
    ]
  }
]

exports.getCollections = async () => {
  return collections
}
