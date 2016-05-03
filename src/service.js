import collection from './collection'

let currentConfig = {
  canRate: () => Meteor.userId(),
  getUserId: () => Meteor.userId()
}

const service = {
  rate: (...args) => Meteor.call('star-ratings.rate', ...args),
  removeRating: (...args) => Meteor.call('star-ratings.remove-rating', ...args),
  getRating: (userId, documentId) => collection.findOne({ userId, documentId }),
  getRatingForCurrentUser: (documentId) => service.getRating(service.config().getUserId(), documentId),
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
  },
  config(newConfig) {
    if (!newConfig) {
      return currentConfig
    }

    currentConfig = Object.assign({}, currentConfig, newConfig)
  },
  _collection: collection
}

export default service
