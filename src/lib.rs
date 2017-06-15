mod prelude;
mod compiler;
//use compiler;

use std::ffi::{CString, CStr};
use std::os::raw::c_char;

fn str_safe(src:*const c_char) -> String{
    unsafe { CStr::from_ptr(src).to_string_lossy().into_owned() }
}

#[allow(unused_variables)]
#[no_mangle]
pub extern "C" fn complie(src:*const c_char, filename:*const c_char, dir:*const c_char) -> *const c_char{
    let src = str_safe(src);
    let filename = str_safe(filename);
    let dir = str_safe(dir);
    let result:String = format!("{}, {}, {}", src,filename, dir);
    let cs = CString::new(result).unwrap();
    return cs.into_raw();
}

#[no_mangle]
pub extern "C" fn drop_cstr(ptr: *mut c_char) {
    unsafe{ CString::from_raw(ptr) };
    // 我不确定这个地址是正确的，所以可能存在内存泄露
    // https://doc.rust-lang.org/nightly/std/ffi/struct.CString.html#method.into_raw
}