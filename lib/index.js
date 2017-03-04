const ffi = require('ffi')
const ref = require('ref')

const lib = ffi.Library('target/debug/otpl_xview', {
    'complie': ['pointer', ["string", "string", "int", "int", "int"]],
    'drop_cstr': ['void', ['pointer']]
})

const complie = (template, filename, dir, line, column, readFromFile) => {
    readFromFile = readFromFile === true ? true : false
    template = readFromFile ? '' : template || ''
    filename = filename || ''
    const ptr = lib.complie(template, filename, readFromFile ? 1 : 0, line || 0, column || 0)
    const result = ref.readCString(ptr, 0)
    lib.drop_cstr(ptr)
    return result
}

module.exports = {
    complie,
    complieWithFile: (filename, dir, line, column) => {
        complie ('', filename, dir, line, column, true)
    }
}

var str = complie("{{hello}}中文中文中文中文中文中文", "test.xv", 2, 10, false);
console.log("done!", str);
