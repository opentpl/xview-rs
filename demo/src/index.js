// import { Component } from './index.xview'
import xview from 'xview-react'
let { render, createElement } = xview
import Hello from './Hello'
// console.log(Component)

// class Hello extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             i: 1
//         }
//     }
//     get i() { return 0 }
// }

render(
    createElement(Hello),
    document.getElementById('root')
)