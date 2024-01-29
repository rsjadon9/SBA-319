// models/post.js
const { ObjectId } = require('mongodb');

class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    static findById(id, db) {
        return db.collection('posts').findOne({ _id: ObjectId(id) });
    }

    static findAll(db) {
        return db.collection('posts').find().toArray();
    }

    static create(post, db) {
        return db.collection('posts').insertOne(post);
    }

    static update(id, updatedPost, db) {
        return db.collection('posts').updateOne({ _id: ObjectId(id) }, { $set: updatedPost });
    }

    static delete(id, db) {
        return db.collection('posts').deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = Post;
