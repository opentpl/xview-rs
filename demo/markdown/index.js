import xview from 'xview-react'
const { render, createElement } = xview
import marked from 'marked'
import Canvas from './Canvas'
export default class Markdown extends xview.Component {
    constructor(props) {
        super(props)

        this.components = new Map

        this.renderer = new marked.Renderer()
        this.renderer.table = (header, body) => {
            return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`
        }
    }

    componentDidMount() {
        this.renderDOM()
    }

    componentDidUpdate() {
        this.renderDOM()
    }

    renderDOM() {
        for (const [id, component] of this.components) {
            const div = document.getElementById(id)

            if (div instanceof HTMLElement) {
                xview.render(component, div)
            }
        }
    }

    render() {
        const document = this.document(localStorage.getItem('DOC_LANGUAGE') || 'zh-CN')

        if (typeof document === 'string') {
            this.components.clear()

            const html = marked(document.replace(/:::\s?demo\@(\w+)\s?([^]+?):::/g, (match, id, desc, offset) => {
                //const id = offset.toString(36)
                console.log(':::::::\n', id,'\n',desc,'\n',offset)
                this.components.set(id, createElement(Canvas, Object.assign({
                    id,
                    name: this.constructor.name.toLowerCase(),
                    demo: this.demo()
                }, this.props), desc))

                return `<div id=${id}></div>`
            }), { renderer: this.renderer })

            return createElement('div',{dangerouslySetInnerHTML:{__html:html}})
        } else {
            return createElement('span')
        }
    }
}