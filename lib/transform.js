const compile = require('./binding')

module.exports = function (template, filename, dir) {
    const output = compile(template, filename, dir)
    return `import { generate } from 'xview-react'
export const { Component, stateless } =  generate(${output})
export default stateless
    `
}