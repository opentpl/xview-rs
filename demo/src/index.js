import xview from 'xview-react'
import Button from './button'
import Input from './input'
import Hello from './Hello'
import 'element-theme-default'

xview.regisiter({ Button, Input })

const { render, createElement } = xview
render(
    createElement(Hello),
    document.getElementById('root')
)