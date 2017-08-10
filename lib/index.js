const transform = require('./transform')
const loaderUtils = require("loader-utils")
module.exports.raw = true
module.exports = function (source, map) {
    this.cacheable()
    const file = this.resourcePath
    const dir = this.options.context
    const options = loaderUtils.getOptions(this)
    console.log('xview-loader:\n')
    console.log('file:\n')
    console.log(file)
    console.log('source:\n')
    console.log(source)
    // console.log('map:\n')
    //console.log(map)
    try {
        const output = transform(source, file, dir)
        console.log('output:\n')
        console.log(output)
        this.callback(null, output, map)
    } catch (err) {
        this.callback(err)
    }
}