'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var procProperties = function procProperties(props) {
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
    return props;
};

var Context = function () {
    function Context(component) {
        (0, _classCallCheck3.default)(this, Context);

        this.component = component;
    }

    (0, _createClass3.default)(Context, [{
        key: 'getDenined',
        value: function getDenined() {}
    }, {
        key: 'get',
        value: function get(name, obj) {
            console.log(this.component, name, obj);
            obj = obj || this.component;
            return obj[name];
        }
    }, {
        key: 'createElement',
        value: function createElement(type, props, children) {
            children = generatorToArray(children
            //
            //if (arr.length == 0) return undefined
            );return _react2.default.createElement(type, procProperties(props), children.length == 0 ? undefined : children);
        }
    }, {
        key: 'root',
        value: function root(iter) {
            var arr = generatorToArray(iter);
            if (!arr || arr.length == 0) return null;
            if (arr.length == 1 && (0, _typeof3.default)(arr[0]) == 'object' && arr[0].$$typeof) return arr[0];
            return _react2.default.createElement('div', null, arr);
        }
    }]);
    return Context;
}();

exports.default = {
    React: _react2.default,
    ReactDom: _reactDom2.default,
    Component: _react2.default.Component,
    createElement: _react2.default.createElement,
    render: _reactDom2.default.render,
    createContext: function createContext(component) {
        return new Context(component);
    }
};