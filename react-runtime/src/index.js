import React from 'react'
import ReactDom from 'react-dom'
const isArray = obj => (Object.prototype.toString.call(obj) === '[object Array]')
const generatorToArray = iter => {
    let arr = []
    if (!iter) return arr
    for (let item of iter) {
        arr.push(item)
    }
    return arr
}

const procProperties = (props, { owner }) => {
    if (props.hasOwnProperty("class")) {
        let obj = {}
        for (let key in props) {
            if (key != "class") {
                obj[key] = props[key]
            } else {
                obj["className"] = props[key]
            }
        }
        props = obj
    }
    if (props.style && typeof props.style == 'string') {
        let styles = {}
        for (let item of props.style.split(',')) {
            let i = item.indexOf(':')
            if (i > 0) {
                styles[item.substr(0, i)] = item.substr(i + 1)
            }
        }
        props.style = styles
    }
    let ret = {}
    for (let key in props) {
        if (isArray(props[key])) {
            let arr = []
            for (let val of props[key]) {
                if (!(val === undefined || val === null)) {
                    arr.push(val)
                }
            }
            if (key === 'className') {
                props[key] = arr.join(' ')
            } else {
                props[key] = arr
            }
        }
        if (key.startsWith('@')) {
            let name = key.substr(1)
            let value = 'owner.' + props[key]
            // if(value.startsWith("props")){
            //     value='owner.'+value
            // }
            if (value.indexOf('(') < 0) {
                value += '.bind(owner)'
            }
            ret[name] = eval(value)
        } else if (key.startsWith(':')) {
            let name = key.substr(1)
            let value = props[key]
            //console.log('twoWay:',name, value, key, props[key])
            ret[name] = eval('owner.' + value)
            ret['onChange'] = owner.getValueChangeEvent(value).bind(owner)
        } else {
            ret[key] = props[key]
        }
    }
    //console.log(ret)
    return ret
}

export const createElement = React.createElement

export const flattenChildren = (children, isWrapper) => {
    let arr
    if (children === undefined) return undefined
    else if (isArray(children)) {
        arr = children
    } else if (children[Symbol.iterator]) {
        arr = generatorToArray(children)
    } else {
        return children
    }
    if (arr.length === 0 || !arr[0]) {
        return undefined
    } else if (arr.length == 1 && arr[0].$$typeof) return arr[0]
    else if (isWrapper === false) return arr
    return createElement('div', null, arr)
}
const components = {}
class Context {
    constructor(owner) {
        this.owner = owner || {}
    }
    getDenined(type) {
        let index = type.indexOf('.')
        if (index > 0) {
            let host = this.getDenined(type.substr(0, index))
            let suffix = type.substr(index + 1)
            index = suffix.indexOf('.')
            while (index > 0 && host && typeof host !== 'string') {
                host = host[suffix.substr(0, index)]
                suffix = suffix.substr(index + 1)
                index = suffix.indexOf('.')
            }
            while (host && typeof host !== 'string') {
                if (suffix.length > 0) {
                    host = host[suffix]
                    suffix = ''
                } else {
                    return host
                }
            }
        }

        if (this.owner.constructor && this.owner.constructor.components && this.owner.constructor.components[type]) {
            return this.owner.constructor.components[type]
        }
        if (this.owner.components && this.owner.components[type]) {
            return this.owner.components[type]
        }
        if (components[type]) {
            return components[type]
        }
        if (this.owner.componentName && this.owner.componentName() === type) {
            return this.owner.constructor
        }

        return type
    }
    get(name, obj) {
        obj = obj || this.owner
        return obj[name]
    }
    createElement(type, props, children) {
        props = procProperties(props, this)
        return createElement(this.getDenined(type, props), props, flattenChildren(children, false))
    }
    transOutput(obj, escape, toIter) {
        if (escape && typeof obj === 'string') {
            //TODO: escape...
        }
        if (toIter === true) {
            if (obj === null || obj === undefined) return []
            else if (typeof obj === 'string') return [obj]            
            else if (obj[Symbol.iterator] || isArray(obj)) return obj
            else return [obj]
        }
        return obj
    }
    nullValue(test, value) {
        if (typeof test === 'undefined' || test === null) {
            test = null
        }
        if (test === null) return value
        return test
    }
    trueValue(test, value) {
        if (typeof test === 'undefined' || typeof test === 'null') {
            test = false
        } else if (test === true || test === false) {

        } else {
            test = !!test
        }
        if (!test) return undefined
        return value
    }
}

const regisiter = registrations => {
    registrations = registrations || {}
    for (var name in registrations) {
        components[name] = registrations[name]
    }
}

export const generate = render => {
    class Component extends React.Component {
        getValueChangeEvent(name) {
            let { bindings } = this
            if (bindings && bindings[name]) {
                return bindings[name]
            }

            return value => {
                // TODO: 干掉 eval
                if (name.startsWith('state.')) {
                    eval(`this.setState(state => ${name} = value)`)
                } else {
                    eval(`this.${name} = value)`)
                }
            }
        }
        render() {
            return flattenChildren(render(new Context(this)))
        }
    }
    Component.prototype.componentName = function () {
        let val = this.toString().match(/function\s*([^(]*)\(/)
        if (val && val.length > 1) {
            return val[1]
        }
        return undefined
    }
    return {
        Component,
        regisiter,
        stateless(props, context) {
            let ctx = context || new Context({ props })
            return flattenChildren(render(ctx))
        }
    }
}


export default {
    React,
    ReactDom,
    createElement,
    Component: React.Component,
    render: ReactDom.render,
    regisiter,
    createContext(component) {
        return new Context(component)
    }
}