import {Component} from './app.xv'
// const { render, createElement } = xview

import Page from './Page'

export default class App extends Component {
    
    constructor(props) {
        super(props)
    }
    // render() {
    //     return createElement(Page)
    //     // return (<div className="app">hello</div>)
    // }
}
App.components={Page}