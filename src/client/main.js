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

const canRateOnComponent = data => service.config().canRate() && !data.viewOnly

Template.starsRatingBox.helpers({
  canRate: () => canRateOnComponent(Template.currentData()),
  ratingId: () => getRatingId(Template.currentData().id),
  rating: function () {
    if (_.isNumber(this.stars)) {
      return {
        amount: this.stars
      }
    }

    const id = this.id
    const ratingForUser = service.getRatingForCurrentUser(id)

    if (!ratingForUser || Template.currentData().viewOnly) {
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
  'click .stars-rating-box': () => {
    if (canRateOnComponent(Template.currentData())) {
      const docId = Template.currentData().id
      service.rate(docId, $(`#${getRatingId(docId)}`).find('.current-rating').length)
    }
  }
})

export { service as starRatingService }
