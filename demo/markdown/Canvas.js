import xview from 'xview-react'
import { Component } from './layout'
import marked from 'marked'
import Prism from 'prismjs'

export default class Canvas extends Component {
    constructor(props) {
        super(props)
        this.playerId = `${parseInt(Math.random() * 1e9).toString(36)}`
        this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
        Canvas.components.Description = () => {
            return xview.createElement('div', { className: 'description', dangerouslySetInnerHTML: { __html: marked(this.props.children) } })
        }

        Canvas.components.Demo = this.props.demo.default




        // console.log(this.document, '\n===============================')
        // this.jsSource = this.props.children.match(/```\s?js\s?\n([^```]+)```/)
        // console.log('\n===============================', this.jsSource ? this.jsSource[1] : 'js null')

        // //this.cssSource = this.props.children.match(/```\s?css\s?\n([^```]+)```/)
        // //console.log('\n===============================', this.cssSource ? this.cssSource[1] : 'css null')

        // this.htmlSource = this.props.children.match(/```\s?html\s?\n([^```]+)```/)
        // console.log('\n===============================', this.htmlSource ? this.htmlSource[1] : 'html null')


        this.state = {
            showBlock: false,
            src: '',
            document:this.document
        }
    }

    componentDidMount() {
        this.renderSource(this.htmlSource ? this.htmlSource[1] : '', this.jsSource ? this.jsSource[1] : '')
    }

    renderSource(tpl, js) {
        fetch('../src/zh-CN/test_1.js').then(resp => {
            return resp.text()
        }).then(src => {
            src = Prism.highlight(src.toString(), Prism.languages.javascript)
            this.setState({ src })
        })
    }
}

class Source extends xview.Component {
    render() {
        return xview.createElement('pre', { 
            className: `language-${this.props.type}`,//line-numbers 
            //'data-src':"https://cdn.bootcss.com/prism/9000.0.1/plugins/line-numbers/prism-line-numbers.js"
         }, xview.createElement('code', {
            dangerouslySetInnerHTML: { __html: this.props.children }
        }))
    }
}


Canvas.components = { Source }