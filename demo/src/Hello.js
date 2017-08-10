import { Component } from './Hello.xv'
export default class Hello extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
    }
    onClick(e) {
        console.log('onClick hello:', this.refs.input)
        this.refs.input.value = 1234
        
        //this.setState({ value: parseInt(this.state.value+'') + 1 })
    }
    onClick2(e) {
        console.log('onClick hello2:', this.refs.input.value)
    }
}