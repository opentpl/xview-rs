import Markdown from '../markdown'
import demos from './src'
export default class Page extends Markdown {
    document(locale) {
        return require(`./src/${locale}/${this.props.src}`)
    }

    demo(){
        return demos['zh-CN']['test/1']
    }

}