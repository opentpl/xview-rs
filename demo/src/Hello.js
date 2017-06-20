import { Component } from './Hello.xv'
console.log('Component', Component)
export default class Hello extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1
        }
        this.bindingsxxx={
            "state.value": value=>{
                console.log(typeof value)
                this.setState({value})
            }
        }
    }
    setPropertyChangeEventxxx(name) {
        return value=>{
            console.log(typeof value)
            this.setState({value})
        }
    }
    onClick(e) {
        console.log('onClick hello:', this.refs.input)
        this.refs.input.value = 1234
        
        //this.setState({ value: parseInt(this.state.value+'') + 1 })
    }
    onClick2(e) {
        console.log('onClick hello2:', this.refs.input.value)
        // this.refs.input.value = 1234
        
        //this.setState({ value: parseInt(this.state.value+'') + 1 })
    }
}