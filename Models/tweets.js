const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo',
{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO Connection Open")
    })
    .catch(err => {
        console.log("OH NO, MONGO Connection ERROR")
        console.log(err)
    })


const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'chickenfan99', age: 61 })
//     const user = await User.findOne({ username: 'chickenfan99' })
//     const tweet2 = new Tweet({ text: 'bock bock bock my chicken noises', likes: 1239 });
//     tweet2.user = user;
//     tweet2.save();
// }


// makeTweets();

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}

findTweet();







const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

