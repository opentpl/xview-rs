'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generate = exports.flattenChildren = exports.createElement = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _iterator4 = require('babel-runtime/core-js/symbol/iterator');

var _iterator5 = _interopRequireDefault(_iterator4);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArray = function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
var generatorToArray = function generatorToArray(iter) {
    var arr = [];
    if (!iter) return arr;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(iter), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            arr.push(item);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return arr;
};

var procProperties = function procProperties(props, _ref) {
    var owner = _ref.owner;

    if (props.hasOwnProperty("class")) {
        var obj = {};
        for (var key in props) {
            if (key != "class") {
                obj[key] = props[key];
            } else {
                obj["className"] = props[key];
            }
        }
        props = obj;
    }
    if (props.style && typeof props.style == 'string') {
        var styles = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = (0, _getIterator3.default)(props.style.split(',')), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                var i = item.indexOf(':');
                if (i > 0) {
                    styles[item.substr(0, i)] = item.substr(i + 1);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        props.style = styles;
    }
    var rst = {};
    for (var _key in props) {
        if (isArray(props[_key])) {
            var arr = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(props[_key]), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var val = _step3.value;

                    if (!(val === undefined || val === null)) {
                        arr.push(val);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (_key === 'className') {
                props[_key] = arr.join(' ');
            } else {
                props[_key] = arr;
            }
        }
        if (_key.startsWith('::')) {
            var name = _key.substr(2);
            var value = 'owner.' + props[_key];
            // if(value.startsWith("props")){
            //     value='owner.'+value
            // }
            if (value.indexOf('(') < 0) {
                value += '.bind(owner)';
            }
            rst[name] = eval(value);
        } else if (_key.startsWith(':')) {
            var _name = _key.substr(1);
            var _value = props[_key];
            //console.log('twoWay:',name, value, key, props[key])
            rst[_name] = eval('owner.' + _value);
            rst['onChange'] = owner.setPropertyChangeEvent(_value).bind(owner);
        } else {
            rst[_key] = props[_key];
        }
    }
    //console.log(rst)
    return rst;
};

var _createElement = _react2.default.createElement;

exports.createElement = _createElement;
var flattenChildren = exports.flattenChildren = function flattenChildren(children, isWrapper) {
    var arr = void 0;
    if (children === undefined) return undefined;else if (isArray(children)) {
        arr = children;
    } else if (children[_iterator5.default]) {
        arr = generatorToArray(children);
    } else {
        return children;
    }
    if (arr.length === 0 || !arr[0]) {
        return undefined;
    } else if (arr.length == 1 && arr[0].$$typeof) return arr[0];else if (isWrapper === false) return arr;
    return _createElement('div', null, arr);
};
var components = {};

var Context = function () {
    function Context(owner) {
        (0, _classCallCheck3.default)(this, Context);

        this.owner = owner || {};
    }

    (0, _createClass3.default)(Context, [{
        key: 'getDenined',
        value: function getDenined(type) {
            //TODO
            if (components[type]) {
                return components[type];
            }
            return type;
        }
    }, {
        key: 'get',
        value: function get(name, obj) {
            obj = obj || this.owner;
            return obj[name];
        }
    }, {
        key: 'createElement',
        value: function createElement(type, props, children) {
            props = procProperties(props, this
            //console.log(flattenChildren(children, false))
            );return _createElement(this.getDenined(type, props), props, flattenChildren(children, false));
        }
    }, {
        key: 'transOutput',
        value: function transOutput(obj, escape, toIter) {
            if (toIter === true) {
                if (obj === null || obj === undefined) return [];else if (obj[_iterator5.default] || isArray(obj)) return obj;else if (typeof obj === 'string') return [obj]; //escape
                else return [obj];
            }
            if (typeof obj === 'string') return [obj]; //escape
            return obj;
        }
    }, {
        key: 'nullValue',
        value: function nullValue(test, value) {
            if (typeof test === 'undefined' || test === null) {
                test = null;
            }
            if (test === null) return value;
            return test;
        }
    }, {
        key: 'trueValue',
        value: function trueValue(test, value) {
            if (typeof test === 'undefined' || typeof test === 'null') {
                test = false;
            } else if (test === true || test === false) {} else {
                test = !!test;
            }
            if (!test) return undefined;
            return value;
        }
    }]);
    return Context;
}();

var generate = exports.generate = function generate(_render) {
    var Component = function (_React$Component) {
        (0, _inherits3.default)(Component, _React$Component);

        function Component() {
            (0, _classCallCheck3.default)(this, Component);
            return (0, _possibleConstructorReturn3.default)(this, (Component.__proto__ || (0, _getPrototypeOf2.default)(Component)).apply(this, arguments));
        }

        (0, _createClass3.default)(Component, [{
            key: 'setPropertyChangeEvent',

            // constructor(props) {
            //     super(props)
            // }
            value: function setPropertyChangeEvent(name) {
                var bindings = this.bindings;

                if (bindings && bindings[name]) {
                    return bindings[name];
                }

                return function (value) {
                    if (name.startsWith('state.')) {
                        eval('this.setState(state => ' + name + ' = value)');
                    } else {
                        eval('this.' + name + ' = value)');
                    }
                };
                //console.error('binding error: not unimplemented setPropertyChangeEvent with:', name)
            }
        }, {
            key: 'render',
            value: function render() {
                return flattenChildren(_render(new Context(this)));
            }
        }]);
        return Component;
    }(_react2.default.Component);

    return {
        Component: Component,
        stateless: function stateless(props, context) {
            var ctx = context || new Context({ props: props });
            return flattenChildren(_render(ctx));
        }
    };
};

exports.default = {
    React: _react2.default,
    ReactDom: _reactDom2.default,
    createElement: _createElement,
    Component: _react2.default.Component,
    render: _reactDom2.default.render,
    createContext: function createContext(component) {
        return new Context(component);
    },
    regisiter: function regisiter(registrations) {
        registrations = registrations || {};
        for (var name in registrations) {
            components[name] = registrations[name];
        }
    }
};