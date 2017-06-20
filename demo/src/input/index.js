import PropTypes from 'prop-types'
import { Component } from './Input'
export default class Input extends Component {
    get value() {
        return this.props.value
    }
    set value(value) {
        const { onChange } = this.props
        if (onChange) {
            onChange(value)
        }
        return this
    }
    handleChange(e) {
        this.value = e.target.value
        //this.resizeTextarea()
    }
    onClick(e) {
        console.log('onClick', e)
    }
}

Input.defaultProps = {
    type: 'text',
    value: undefined,
}

Input.propTypes = {
  // base
  type: PropTypes.string,
}