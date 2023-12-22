const getDistinctValues = async (model, field) => {
    try {
        return await model.distinct(field);
    } catch (error) {
        console.error(`Error fetching distinct values for ${field}: ${error.message}`);
        throw error;
    }
};

const searchedDataCount = async (model, key, value) => {
    const query = {};
    query[key] = value;
    const result = await model.find(query);
    return result.length
}


module.exports = { getDistinctValues, searchedDataCount }