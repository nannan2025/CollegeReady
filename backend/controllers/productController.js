
const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    pname: String,
    pdesc: String,
    price: String,
    category: String,
    pimage: String,
    pimage2: String,
    addedBy: mongoose.Schema.Types.ObjectId,
    pLoc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number]
        }
    }
})

schema.index({ pLoc: '2dsphere' });

const Products = mongoose.model('Products', schema);


module.exports.search = (req, res) => {
    // Extract the 'search' query parameter from the request
    const search = req.query.search;

    // Check if the 'search' parameter exists and is not empty
    if (!search || typeof search !== 'string') {
        return res.status(400).send({ message: 'Invalid search query' });
    }

    // Create a search query using regex for each field
    const searchQuery = {
        $or: [
            { pname: { $regex: search, $options: 'i' } },
            { pdesc: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } }
        ]
    };

    // Find products matching the search query
    Products.find(searchQuery)
        .then((results) => {
            res.send({ message: 'success', products: results });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: 'server error', error: err.message });
        });
};

module.exports.addProduct = (req, res) => {

    console.log(req.files);
    console.log(req.body);


    const plat = req.body.plat;
    const plong = req.body.plong;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimage = req.files.pimage[0].path;
    const pimage2 = req.files.pimage2[0].path;
    const addedBy = req.body.userId;

    const product = new Products({
        pname, pdesc, price, category, pimage, pimage2, addedBy, pLoc: {
            type: 'Point', coordinates: [plat, plong]
        }
    });
    product.save()
        .then(() => {
            res.send({ message: 'saved success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })
}
module.exports.deleteProduct = (req, res) => {
    const _id = req.params.pId; // Correctly accessing the product ID

    Products.findByIdAndRemove(_id)
        .then(result => {
            if (result) {
                res.send({ message: 'Product deleted successfully', product: result });
            } else {
                res.status(404).send({ message: 'Product not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'Server error', error: err.message });
        });
};




module.exports.getProducts = (req, res) => {

    const catName = req.query.catName;
    let _f = {}

    if (catName) {
        _f = { category: catName }
    }

    Products.find(_f)
        .then((result) => {
            res.send({ message: 'success', products: result })

        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}

module.exports.getProductsById = (req, res) => {
    console.log(req.params);

    Products.findOne({ _id: req.params.pId })
        .then((result) => {
            res.send({ message: 'success', product: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}

module.exports.myProducts = (req, res) => {
    const userId = req.params.userId; // Get userId from URL parameters

    // Find products where 'addedBy' matches the userId provided in the URL
    Products.find({ addedBy: userId })
        .then((products) => {
            if (products.length > 0) {
                res.send({ message: 'Success', products: products });
            } else {
                res.status(404).send({ message: 'No products found for this user.' });
            }
        })
        .catch((err) => {
            console.error(err); // It's good practice to log the error for debugging
            res.status(500).send({ message: 'Server error', error: err.message });
        });
};