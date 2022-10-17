const SHA256 = require('crypto-js/sha256');

//definisco un blocco
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineblock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

//definisco la Blockchain
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock];
        this.difficulty = 6;
    }

    createGenesisBlock(){
        return new Block(0,"14/10/2022", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineblock(this.difficulty);
        this.chain.push(newBlock); //not so easy, it's a semplification
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }

}

let Bombo = new Blockchain();
console.log("Mining block 1.....");
Bombo.addBlock(new Block(1,"14/08/2022", "Ciao Bombone!!"));

console.log("Mining block 2.....");
Bombo.addBlock(new Block(2,"15/08/2022", "Ciao Bomboneeee 2!!"));

