const { ObjectId } = require('mongodb');

class User {
    constructor(username, email, age) {
        this.username = username;
        this.email = email;
        this.age = age;
    }

    static findById(id, db) {
        return db.collection('users').findOne({ _id: ObjectId(id) });
    }

    static findAll(db) {
        return db.collection('users').find().toArray();
    }

    static create(user, db) {
        return db.collection('users').insertOne(user);
    }

    static update(id, updatedUser, db) {
        return db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: updatedUser });
    }

    static delete(id, db) {
        return db.collection('users').deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = User;