import xview from 'xview-react'
import { AppContainer } from 'react-hot-loader'

import Button from '../src/button'
import Input from '../src/input'

// import 'core-js';

import 'element-theme-default';

// import './styles/base.scss';
// import './styles/prism.css';

import App from './app'

xview.regisiter({ Button, Input })

const { render, createElement } = xview


render(
    createElement(AppContainer, {}, createElement(App)),
    document.getElementById('app')
)

if (module.hot) {
    module.hot.accept('./app', () => {
        const App = require('./app').default;
        
        render(
            createElement(AppContainer, {}, createElement(App)),
            document.getElementById('app')
        )
    })
}