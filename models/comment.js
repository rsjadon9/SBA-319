// models/comment.js
const { ObjectId } = require('mongodb');

class Comment {
    constructor(text, userId, postId) {
        this.text = text;
        this.userId = userId;
        this.postId = postId;
    }

    static findById(id, db) {
        return db.collection('comments').findOne({ _id: ObjectId(id) });
    }

    static findAll(db) {
        return db.collection('comments').find().toArray();
    }

    static create(comment, db) {
        return db.collection('comments').insertOne(comment);
    }

    static update(id, updatedComment, db) {
        return db.collection('comments').updateOne({ _id: ObjectId(id) }, { $set: updatedComment });
    }

    static delete(id, db) {
        return db.collection('comments').deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = Comment;
