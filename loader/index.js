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
    // console.log(output)
    // output= 'return 1'
    output = `import { generate } from 'xview-react'
export const { Component, stateless } =  generate(${output})
export default stateless
    `
    console.log(output)

    this.callback(null, output, map)
}

// const render = context => (flattenChildren((${output})(context)))
// //deprecated
// //export const { PropTypes } = xview.React
// export class Component extends xview.Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         return render(xview.createContext(this))
//     }
// }
// //deprecated
// export const create = members => {
//     members = members || {}
//     members.render = Component.prototype.render
//     return xview.React.createClass(members)
// }

// export default (props, context) => {
//     context = context || xview.createContext({ props })
//     return render(context)
// }