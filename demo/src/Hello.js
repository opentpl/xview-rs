import { create } from './Hello.xv'
export default create({
    i: 0,
    getInitialState() {
        return {
            i: 1
        }
    }
})