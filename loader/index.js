const compile = require('./binding')
const loaderUtils = require("loader-utils")
module.exports.raw = true
module.exports = function (source, map) {
    //this.cacheable();
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
    let output = `module.exports = function(){};`
    output = compile(source, file, dir)
    console.log('output:\n')
    console.log(output)
    output= 'return 1'
    output = `import xview from 'xview-react'
const render = context => {
    ${output}
}

export const { Component } = xview
Component.prototype.render = function () {
    return render(xview.createContext(this))
}

export const create = members => {
    members = members || {}
    members.render = Component.prototype.render
    return xview.React.createClass(members)
}

export default (props, context) => {
    context = context || xview.createContext({ props })
    return render(context)
}
    `


    this.callback(null, output, map)
}
