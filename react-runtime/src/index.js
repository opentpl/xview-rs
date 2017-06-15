import React from 'react'
import ReactDom from 'react-dom'

const generatorToArray = iter => {
    let arr = []
    if (!iter) return arr
    for (let item of iter) {
        arr.push(item)
    }
    return arr
}

const procProperties = props => {
    if (props.hasOwnProperty("class")) {
        let obj = {}
        for (var key in props) {
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
    return props
}

class Context {
    constructor(component) {
        this.component = component
    }
    getDenined() { }
    get(name, obj) {
        console.log(this.component, name, obj)
        obj = obj || this.component
        return obj[name]
    }
    createElement(type, props, children) {
        children = generatorToArray(children)
        //
        //if (arr.length == 0) return undefined
        return React.createElement(type, procProperties(props), children.length == 0 ? undefined : children)
    }
    root(iter) {
        let arr = generatorToArray(iter)
        if (!arr || arr.length == 0) return null
        if (arr.length == 1 && typeof arr[0] == 'object' && arr[0].$$typeof) return arr[0]
        return React.createElement('div', null, arr)
    }
}

export const createElement = React.createElement
export default {
    React,
    ReactDom,
    Component: React.Component,
    createElement,
    render: ReactDom.render,
    createContext(component) {
        return new Context(component)
    }
}