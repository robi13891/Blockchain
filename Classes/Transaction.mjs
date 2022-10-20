export default class Transaction{
    constructor(fromAddress = "", toAddress = "", amount = 0){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}