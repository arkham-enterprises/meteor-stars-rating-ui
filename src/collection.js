import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

const collection = new Mongo.Collection('star-ratings')

collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
})

Meteor.methods({
  'star-ratings.rate': (documentId, amount) => {
    check(documentId, String);
    check(amount, Number);

    const userId = Meteor.userId()

    if (amount > 5 || amount < 1) {
      throw new Error('Amount is not in between 1 or 5: ' + amount)
    }

    if (userId) {
      const docToFind = {
        documentId,
        userId
      }

      collection.update(docToFind, Object.assign({}, docToFind, { amount }), {
        upsert: true
      })
    }
  }
})

export default collection
