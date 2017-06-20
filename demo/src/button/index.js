import { Component } from './Button'
export default class Button extends Component {
    constructor(props) {
        super(props)
    }
    onClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }
}

import { Component as GroupComponent } from './Group'
class Group extends GroupComponent {
    constructor(props) {
        super(props)
    }
}

Button.Group = Group

