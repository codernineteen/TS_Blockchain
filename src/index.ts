import crypto from "crypto";

interface BlockStructure {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockStructure {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(this.prevHash, this.height, this.data);
  }

  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("base64");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length, data);
    this.blocks.push(newBlock);
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }

  public getBlocks(): void {
    console.log(this.blocks);
  }
}

const YeChanBlockChain = new BlockChain();

YeChanBlockChain.addBlock("webdevissofun");
YeChanBlockChain.addBlock("NowifinishedTypescriptSoGonnaLearnReact");
YeChanBlockChain.addBlock("ThenMaybeNestjs?");
YeChanBlockChain.getBlocks();
