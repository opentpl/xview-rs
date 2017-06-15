const ffi = require('ffi')
const ref = require('ref')

const lib = ffi.Library('target/debug/xview_rs', {
    'complie': ['pointer', ["string", "string", "string"]],
    'drop_cstr': ['void', ['pointer']]
})

const complie = (template, filename, dir) => {
    filename = filename || ''
    dir = dir || ''
    const ptr = lib.complie(template, filename, dir)
    const result = ref.readCString(ptr, 0)
    lib.drop_cstr(ptr)
    return result
}

module.exports = complie

var str = complie("{{hello}}中文中文中文中文中文中文", "test.xv", 'dir');
console.log("done!", str);
