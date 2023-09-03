import Product from "../models/product.js";
const getAllProductStatic = async (req, res, next) => {

    const products = await Product.find({ price: { $lt: 30 } });

    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res, next) => {
    const { featured, company, name, select, sort, numericFilters } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const regex = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(regex, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];

        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (select) {
        const selectItems = select.split(',').join(' ');
        result = result.select(selectItems);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    result.skip(skip).limit(limit);

    const products = await result;

    res.status(200).json({ products, nbHits: products.length });
}

export { getAllProductStatic, getAllProducts };