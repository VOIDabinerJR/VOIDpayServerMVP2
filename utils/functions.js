

function populateUpdatedFields(source, target) {
    for (const key in source) {
        if (source.hasOwnProperty(key) && source[key] !== '') {
            target[key] = source[key];
        }
    }
}


module.exports = { populateUpdatedFields };