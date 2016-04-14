import { Template } from 'meteor/templating'
import service from '../service'

const getRatingId = (docId) => `rating-${docId}`

Template.starsRatingBox.onCreated(() => {
  const { id } = (Template.currentData() || {})

  if (!id) {
    throw new Error('id needs to be provided as parameter! (star-ratings-ui)');
  }

  Meteor.subscribe('star-ratings.rating', id)
})

Template.starsRatingBox.helpers({
  canRate: () => Meteor.userId(),
  ratingId: function () {
    return getRatingId(this.id)
  },
  rating: function () {
    const id = this.id
    const ratingForUser = service.getRatingForCurrentUser(id)

    if (!ratingForUser) {
      return {
        amount: service.getAverageRating(id).amount
      }
    }

    return {
      amount: ratingForUser.amount
    }
  }
})

Template.starsRatingBox.events({
  'click .stars-rating-box': (event) => {
    const docId = Template.currentData().id

    service.rate(docId, $(`#${getRatingId(docId)}`).find('.current-rating').length)
  }
})

export { service as starRatingService }
