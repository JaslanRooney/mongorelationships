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

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     {name: 'Goddes Melon', price: 4.99, season: 'Summer'},
//     {name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer'},
//     {name: 'Asparagus', price: 3.99, season: 'Spring'},
// ])

const addProduct = async () => {
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon)
    await farm.save();
    console.log(farm)
}

// makeFarm();

Farm.findOne({ name: 'Full Belly Farms' })
.populate('products')
.then(farm => console.log(farm))



