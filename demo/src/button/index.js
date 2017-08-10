import { Component } from './Button'
import { Component as Group } from './Group'
import PropTypes from 'prop-types'

export default class Button extends Component {
    /**
     * @private 
     */
    handleClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }
    click(e) {
        this.handleClick(e)
    }
}

Button.Group = Group

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    nativeType: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    plain: PropTypes.bool
}

Button.defaultProps = {
    type: 'default',
    nativeType: 'button',
    loading: false,
    disabled: false,
    plain: false
}