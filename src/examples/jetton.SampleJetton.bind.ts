import { Cell, Slice, StackItem, Address, Builder, InternalMessage, CommonMessageInfo, CellMessage, beginCell, serializeDict } from 'ton';
import { ContractExecutor } from 'ton-nodejs';
import BN from 'bn.js';
import { deploy } from '../abi/deploy';

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: BigInt;
    mode: BigInt;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function packSendParameters(src: SendParameters): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounce);
    b_0 = b_0.storeAddress(src.to);
    b_0 = b_0.storeInt(new BN(src.value.toString(10), 10), 257);
    b_0 = b_0.storeInt(new BN(src.mode.toString(10), 10), 257);
    if (src.body !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.body);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.code !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.code);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.data !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.data);
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: BigInt;
}

export function packContext(src: Context): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounced);
    b_0 = b_0.storeAddress(src.sender);
    b_0 = b_0.storeInt(new BN(src.value.toString(10), 10), 257);
    return b_0.endCell();
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function packStateInit(src: StateInit): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeRef(src.code);
    b_0 = b_0.storeRef(src.data);
    return b_0.endCell();
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: BigInt;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
}

export function packJettonData(src: JettonData): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeInt(new BN(src.totalSupply.toString(10), 10), 257);
    b_0 = b_0.storeBit(src.mintable);
    b_0 = b_0.storeAddress(src.owner);
    b_0 = b_0.storeRef(src.content);
    b_0 = b_0.storeRef(src.walletCode);
    return b_0.endCell();
}

export type Burned = {
    $$type: 'Burned';
    amount: BigInt;
    owner: Address;
    cashback: Address | null;
}

export function packBurned(src: Burned): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(2078119902, 32);
    b_0 = b_0.storeInt(new BN(src.amount.toString(10), 10), 257);
    b_0 = b_0.storeAddress(src.owner);
    if (src.cashback !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeAddress(src.cashback);
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export type TokenReceived = {
    $$type: 'TokenReceived';
    amount: BigInt;
}

export function packTokenReceived(src: TokenReceived): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(421783706, 32);
    b_0 = b_0.storeInt(new BN(src.amount.toString(10), 10), 257);
    return b_0.endCell();
}

export type JettonUpdateContent = {
    $$type: 'JettonUpdateContent';
    content: Cell | null;
}

export function packJettonUpdateContent(src: JettonUpdateContent): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3551049822, 32);
    if (src.content !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.content);
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function packChangeOwner(src: ChangeOwner): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3067051791, 32);
    b_0 = b_0.storeAddress(src.newOwner);
    return b_0.endCell();
}

export type Mint = {
    $$type: 'Mint';
    amount: BigInt;
}

export function packMint(src: Mint): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(2737462367, 32);
    b_0 = b_0.storeInt(new BN(src.amount.toString(10), 10), 257);
    return b_0.endCell();
}

export function SampleJetton_init(owner: Address, content: Cell | null) {
    const __code = 'te6ccgECLwEABBMAART/APSkE/S88sgLAQIBYgIDAgLKBAUCASApKgIBIAYHAgHOJSYCAUgICQIBIA8QAgFICgsAR2chwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQgOXHAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QDBUQRVvA/hhApFb4CCCEKMqXF+64wIgghDTqLheuuMCghB73ZfeuuMCMPLAZIAwNDgAJCBu8k6AAtjDtRNDUAfhi+gD6QAFtAtIAAZLUMd7SAARQM2wUBNMfAYIQoypcX7ry4GSBAQHXAAExEDRBMPAgyPhCAcxVMFBD+gIBzxYibpUycFjKAJZ/AcoAEsziygDJ7VQAvjDtRNDUAfhi+gD6QAFtAtIAAZLUMd7SAARQM2wUBNMfAYIQ06i4Xrry4GRtAdIAAZLUMd4BMRA0QTDwIcj4QgHMVTBQQ/oCAc8WIm6VMnBYygCWfwHKABLM4soAye1UANjtRNDUAfhi+gD6QAFtAtIAAZLUMd7SAARQM2wUBNMfAYIQe92X3rry4GSBAQHXAPpAAW0C0gABlPpAATDeQxMzEFYQRRA0WPAiyPhCAcxVMFBD+gIBzxYibpUycFjKAJZ/AcoAEsziygDJ7VQCAVgREgIBIBcYAgEgExQCASAVFgAVJR/AcoA4HABygCAA6zIcQHKARfKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjjV/8BTIcPAUcPAUJG6zlX/wFBTMlTQDcPAU4iRus5V/8BQUzJU0A3DwFOJw8BQCf/AUAslYzJYzMwFw8BTiIW6zmX8BygAB8AEBzJRwMsoA4skB+wCAAIxwA8jMA1rPFljPFoEBAc8AyYAA5ALQ9AQwggDOUwGAEPQPb6Hy4GRtyPQAyUAD8BaACASAZGgIBIB8gAgEgGxwCASAdHgBDHB/BMjMQzRQQ/oCAc8WIm6VMnBYygCWfwHKABLM4soAyYAAPPhC+ChY8BeAAWRRVaBVMPAZcFMh8AVwcFIKyAGCEBkj6JpYyx+BAQHPAMleMhQQOkCq8BVVAoAAvPhBbyMwMVVA8BlwWfAFUAXHBfLgZFUCgAgEgISICASAjJAAVPAZbCIycDMB8AWAADz4KPAZMEMwgABk+EFvIzAxI8cF8uBkgAAkECNfA4AIBICcoABlDAVFEMw8BtQNKFQI4ABM+EFvIzAxAfAagAA8VTDwHjFBMIABBvijvaiaGoA/DF9AH0gALaBaQAAyWoY72kAAigZtgp4D8AgEgKywCAWYtLgAJudw/AYgARa289qJoagD8MX0AfSAAtoFpAADJahjvaQACKBm2CiqB+A5AAEGvFvaiaGoA/DF9AH0gALaBaQAAyWoY72kAAigZtgp4DsA=';
    const depends = new Map<string, Cell>();
    depends.set('52819', Cell.fromBoc(Buffer.from('te6ccgEBDQEA+QABFP8A9KQT9LzyyAsBAgFiAgMCAswEBQIBSAsMAffbgQ66ThD8qYEGuFj+8BaGmBgLjYYADIv8i4cQD9IBgqIIq3gfwwgUit8EEIDJH0TV1HI3aiaGoA/DF9IACA/SAAgMCAgOuAKpA2CYHpj4DBCAyR9E1deXAyQICA64AAmKCYeAZkfCEA5iqQLWeLLGeLQICA54Bk9qpwGEBgIBIAcIAAbywGQCAVgJCgAb0YfCC3kZgYkeOC+XAyQAIxwA8jMA1rPFljPFoEBAc8AyYAAFDAxgAAm47j8AqAA5uFHe1E0NQB+GL6QAEB+kABAYEBAdcAVSBsE/ALg=', 'base64'))[0]);
    let systemCell = beginCell().storeDict(serializeDict(depends, 16, (src, v) => v.refs.push(src))).endCell();
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: systemCell });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(owner).endCell() });
    if (content !== null) {
        __stack.push({ type: 'cell', cell: content });
    } else {
        __stack.push({ type: 'null' });
    }
    return deploy(__code, 'init_SampleJetton', __stack); 
}

export class SampleJetton {
            
    readonly executor: ContractExecutor; 
    constructor(executor: ContractExecutor) { this.executor = executor; } 
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: Mint | JettonUpdateContent | Burned) {
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = packMint(message);
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonUpdateContent') {
            body = packJettonUpdateContent(message);
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Burned') {
            body = packBurned(message);
        }
        if (body === null) { throw new Error('Invalid message type'); }
        return await this.executor.internal(new InternalMessage({
            to: this.executor.address,
            from: args.from || this.executor.address,
            bounce: false,
            value: args.amount,
            body: new CommonMessageInfo({
                body: new CellMessage(body!)
            })
        }), { debug: args.debug });
    }
    async getGetWalletAddress(owner: Address) {
        let __stack: StackItem[] = [];
        __stack.push({ type: 'slice', cell: beginCell().storeAddress(owner).endCell() });
        let result = await this.executor.get('get_wallet_address', __stack);
        return result.stack.readAddress()!;
    }
    async getGetJettonData() {
        let __stack: StackItem[] = [];
        let result = await this.executor.get('get_jetton_data', __stack);
    }
    async getOwner() {
        let __stack: StackItem[] = [];
        let result = await this.executor.get('owner', __stack);
        return result.stack.readAddress()!;
    }
}