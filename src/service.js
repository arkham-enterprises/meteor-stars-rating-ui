import collection from './collection'

const service = {
  rate: (...args) => Meteor.call('star-ratings.rate', ...args),
  getRating: (userId, documentId) => collection.findOne({ userId, documentId }),
  getRatingForCurrentUser: (documentId) => service.getRating(Meteor.userId(), documentId),
  getRatings: (documentId) => collection.find({ documentId }).fetch(),
  getAverageRating: (documentId) => {
    const ratings = service.getRatings(documentId)

    const averageRating = _.reduce(ratings, (averageRating, rating) => {
      if (!averageRating) {
        return rating.amount / ratings.length
      }

      return averageRating + (rating.amount / ratings.length)
    }, null)

    if (averageRating) {
      return { amount: averageRating }
    }

    return { amount: 0 }
  }
}

export default service
