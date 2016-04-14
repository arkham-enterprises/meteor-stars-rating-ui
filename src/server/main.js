import collection from '../collection'
import service from '../service'

Meteor.publish('star-ratings.rating', function (documentId) {
  check(documentId, String)

  return collection.find({ documentId })
})


export { service as starRatingService }
