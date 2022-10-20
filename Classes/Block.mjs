export default class Block{
    constructor(){
        this.timestamp = new Date().toString();
        this.transaction = new Transaction();
    }
}