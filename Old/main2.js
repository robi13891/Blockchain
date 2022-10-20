const  SHA256  = require("crypto-js/sha256");

class Transaction{
    constructor(fromAddress = "", toAddress = "", amount = 0){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(transaction){        
        this.transaction = transaction;
        this.timestamp = new Date().toString();
        this.hash = this.calculateHash();
        this.previousHash = "";
    }

    calculateHash(){
        return SHA256(this.timestamp + JSON.stringify(this.transaction) + this.previousHash).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.genesisBlock()];
    }

    genesisBlock(){
        return new Block(new Transaction() , "0");
    }

    getPreviousBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getPreviousBlock().calculateHash();
        return this.chain.push(newBlock);
    }

}



//TEST CODE

const ADPee = new Blockchain();

let tran = new Transaction("address-1", "address-2", 100)
let b = new Block(tran);
// console.log(b);


//console.log(ADPee.chain);

// ADPee.chain = b; 
// console.log(ADPee.chain);
ADPee.addBlock(b);
console.log(ADPee.chain);
