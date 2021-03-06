const ffi = require('ffi')
const ref = require('ref')

const lib = ffi.Library('../target/debug/xview_rs', {
    'complie': ['pointer', ["string", "string", "string"]],
    'drop_cstr': ['void', ['pointer']]
})

module.exports = function(template, filename, dir) {
    filename = filename || ''
    dir = dir || ''
    const ptr = lib.complie(template, filename, dir)
    const result = ref.readCString(ptr, 0)
    lib.drop_cstr(ptr)
    return result
}