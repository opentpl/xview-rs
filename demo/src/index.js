import xview from 'xview-react'
let { render, createElement } = xview

import Hello from './Hello'
import Button from './button'
import Input from './input'
xview.regisiter({ Button, Input })

import 'element-theme-default'

render(
    createElement(Hello),
    document.getElementById('root')
)