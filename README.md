# xview-rs
An rust-lang implements for xview.


--
https://users.rust-lang.org/t/issues-when-linking-cross-compiled-binaries/6290
https://users.rust-lang.org/t/how-crossplatform-is-rust-really/6331
https://github.com/tpoechtrager/osxcross
https://www.reddit.com/r/rust/comments/5k8uab/crosscompiling_from_ubuntu_to_windows_with_rustup/
apt install mingw-w64
[target.x86_64-pc-windows-gnu]
linker = "x86_64-w64-mingw32-gcc"
ar = "x86_64-w64-mingw32-gcc-ar"






 = note: "gcc" "-Wl,--enable-long-section-names" "-fno-use-linker-plugin" "-Wl,--nxcompat" "-nostdlib" "-m64" "/root/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/x86_64-pc-windows-gnu/
lib/dllcrt2.o" "/root/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/x86_64-pc-windows-gnu/lib/rsbegin.o" "-L" "/root/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/x86_64
-pc-windows-gnu/lib" "/workspace/xview-rs/target/x86_64-pc-windows-gnu/debug/deps/otpl_xview.0.o" "-o" "/workspace/xview-rs/target/x86_64-pc-windows-gnu/debug/deps/otpl_xview.dll" "/workspace/xview-rs/ta
rget/x86_64-pc-windows-gnu/debug/deps/otpl_xview.metadata.o" "-nodefaultlibs" "-L" "/workspace/xview-rs/target/x86_64-pc-windows-gnu/debug/deps" "-L" "/workspace/xview-rs/target/debug/deps" "-L" "/root/.
rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/x86_64-pc-windows-gnu/lib" "-Wl,-Bstatic" "-Wl,-Bdynamic" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/libstd-2552e7df15c9fb68.rlib" "-Wl,-
-no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/librand-922f14c6c06fa38e.rlib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/libcollections-fa763888bb715af8.rl
ib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/libstd_unicode-425480962e0d0404.rlib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/libpanic_unwind-6
a1e0d1dbeafd6e2.rlib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/libunwind-f68e43a1e89bc0f9.rlib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/libl
ibc-72343f2c6d58d279.rlib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/liballoc-3ac1800e55dc88aa.rlib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/
liballoc_system-95d71b27db0ba72f.rlib" "-Wl,--no-whole-archive" "-Wl,--whole-archive" "/tmp/rustc.dq7APckR8jvF/libcore-a0bb2439f0343129.rlib" "-Wl,--no-whole-archive" "/tmp/rustc.dq7APckR8jvF/libcompiler
_builtins-558a6da79faba1ce.rlib" "-l" "advapi32" "-l" "ws2_32" "-l" "userenv" "-l" "shell32" "-l" "gcc_eh" "-shared" "-lmingwex" "-lmingw32" "-lgcc" "-lmsvcrt" "-luser32" "-lkernel32" "/root/.rustup/tool
chains/stable-x86_64-unknown-linux-gnu/lib/rustlib/x86_64-pc-windows-gnu/lib/rsend.o"
  = note: /usr/bin/ld: unrecognized option '--enable-long-section-names'
/usr/bin/ld: use the --help option for usage information
collect2: error: ld returned 1 exit status
