import { Cell, Slice, Address, Builder, beginCell, ComputeError, TupleItem, TupleReader, Dictionary, contractAddress, ContractProvider, Sender, Contract, ContractABI, TupleBuilder, DictionaryValue } from 'ton-core';
import { ContractSystem, ContractExecutor } from 'ton-emulator';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}
export type Request = {
    $$type: 'Request';
    requested: Address;
    to: Address;
    value: bigint;
    timeout: bigint;
    bounce: boolean;
    mode: bigint;
    body: Cell | null;
}

export function storeRequest(src: Request) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4266760323, 32);
        b_0.storeAddress(src.requested);
        b_0.storeAddress(src.to);
        b_0.storeCoins(src.value);
        b_0.storeUint(src.timeout, 32);
        b_0.storeBit(src.bounce);
        b_0.storeUint(src.mode, 8);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
    };
}

export function loadRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4266760323) { throw Error('Invalid prefix'); }
    let _requested = sc_0.loadAddress();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    let _timeout = sc_0.loadUintBig(32);
    let _bounce = sc_0.loadBit();
    let _mode = sc_0.loadUintBig(8);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Request' as const, requested: _requested, to: _to, value: _value, timeout: _timeout, bounce: _bounce, mode: _mode, body: _body };
}

function loadTupleRequest(source: TupleReader) {
    let _requested = source.readAddress();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _timeout = source.readBigNumber();
    let _bounce = source.readBoolean();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    return { $$type: 'Request' as const, requested: _requested, to: _to, value: _value, timeout: _timeout, bounce: _bounce, mode: _mode, body: _body };
}

function storeTupleRequest(source: Request) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.requested);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.timeout);
    builder.writeBoolean(source.bounce);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    return builder.build();
}

function dictValueParserRequest(): DictionaryValue<Request> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRequest(src)).endCell());
        },
        parse: (src) => {
            return loadRequest(src.loadRef().beginParse());
        }
    }
}
export type Signed = {
    $$type: 'Signed';
    request: Request;
}

export function storeSigned(src: Signed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2213172633, 32);
        b_0.store(storeRequest(src.request));
    };
}

export function loadSigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2213172633) { throw Error('Invalid prefix'); }
    let _request = loadRequest(sc_0);
    return { $$type: 'Signed' as const, request: _request };
}

function loadTupleSigned(source: TupleReader) {
    const _request = loadTupleRequest(source.readTuple());
    return { $$type: 'Signed' as const, request: _request };
}

function storeTupleSigned(source: Signed) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTupleRequest(source.request));
    return builder.build();
}

function dictValueParserSigned(): DictionaryValue<Signed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSigned(src)).endCell());
        },
        parse: (src) => {
            return loadSigned(src.loadRef().beginParse());
        }
    }
}
async function MultisigSigner_init(master: Address, members: Dictionary<Address, bigint>, requiredWeight: bigint, request: Request) {
    const __init = 'te6ccgEBBwEAhAABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQANoUrc3k/gDQAB1AFjacHAMyMwMBwVQk1AIBkQUUMvPFhn0ABeBAQHPABWBAQHPABPKAMhGFxA1GNs8yQHMyYGAFSCEP5RmINQCMsfUAbPFlAEzxZY+gLLH8oAywchbrOVfwHKAMyUcDLKAOI=';
    const __code = 'te6ccgECFQEAAy0AART/APSkE/S88sgLAQIBYgIDAgLNBAUCAnUREgIBSAYHACPxC3Sq2s+iyYcGQA54AgmfogwCgztou37cCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgwAAi10nBIbDjAsAAkTDjDfLAgoAgJAAsIG7y0ICACslvtRNDUAfhi+kABAfQEgQEB1wCBAQHXANIA1AHQ2zw3EHwQexB6EHkQeFUFbBzI+EIBzFWwUMvPFhn0ABeBAQHPABWBAQHPABPKAMhGFxA1GNs8yQHMye1UExACqvkBgvAirubQptwUZXcnfdWNBq4wkKPN09iohWEYQgiuX26wObqPLe1E0NQB+GL6QAEB9ASBAQHXAIEBAdcA0gDUAdDbPDcQfBB7EHoQeRB4VQVsHOATCgPCgRKTJPgjvPL0ggCfaiiz8vT4QW8kECNfAyuBAQsigQEBQTP0Cm+hlAHXADCSW23i8AEcgQELUA1tgQEB8AdQq6BTCL6PGTd/cHCBAIJUeYdUeYdWEts8L1UgbW3bPAfeCQsMDQEiyFVgghCD6lWZUAjLHwfbPMkQAvbIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GORn8BygDIcAHKAHABygAkbrOafwHKAATwAVAEzJY0A3ABygDiJG6zmn8BygAE8AFQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrPjD8kB+wAODwFayPhCAcxVsFDLzxYZ9AAXgQEBzwAVgQEBzwATygDIRhcQNRjbPMkBzMntVNsxEAASfwHKAAHwAQHMAAoxcAHKAABUghD+UZiDUAjLH1AGzxZQBM8WWPoCyx/KAMsHIW6zlX8BygDMlHAyygDiAmOwv7tRNDUAfhi+kABAfQEgQEB1wCBAQHXANIA1AHQ2zw3EHwQexB6EHkQeFUFbBzbPIBMUAE2y9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmAAUNMfAYIQ/lGYg7ry4IH6QAEB+kABAfoA0x/SANMH0gABkdSSbQHiVWAABGxX';
    const __system = 'te6cckECFwEAAzcAAQHAAQEFoSdzAgEU/wD0pBP0vPLICwMCAWIIBAICdQYFAE2y9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmACY7C/u1E0NQB+GL6QAEB9ASBAQHXAIEBAdcA0gDUAdDbPDcQfBB7EHoQeRB4VQVsHNs8gFgcABGxXAgLNCgkAI/ELdKraz6LJhwZADngCCZ+iDAIBSAwLAAsIG7y0ICACgztou37cCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAIlBmbwT4YQKRW+AgwAAi10nBIbDjAsAAkTDjDfLAgoBQNAqr5AYLwIq7m0KbcFGV3J33VjQauMJCjzdPYqIVhGEIIrl9usDm6jy3tRNDUAfhi+kABAfQEgQEB1wCBAQHXANIA1AHQ2zw3EHwQexB6EHkQeFUFbBzgFg4DwoESkyT4I7zy9IIAn2oos/L0+EFvJBAjXwMrgQELIoEBAUEz9ApvoZQB1wAwkltt4vABHIEBC1ANbYEBAfAHUKugUwi+jxk3f3BwgQCCVHmHVHmHVhLbPC9VIG1t2zwH3gkTEA8BWsj4QgHMVbBQy88WGfQAF4EBAc8AFYEBAc8AE8oAyEYXEDUY2zzJAczJ7VTbMRUC9shxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5GfwHKAMhwAcoAcAHKACRus5p/AcoABPABUATMljQDcAHKAOIkbrOafwHKAATwAVAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFus+MPyQH7ABIRAAoxcAHKAAASfwHKAAHwAQHMASLIVWCCEIPqVZlQCMsfB9s8yRUCslvtRNDUAfhi+kABAfQEgQEB1wCBAQHXANIA1AHQ2zw3EHwQexB6EHkQeFUFbBzI+EIBzFWwUMvPFhn0ABeBAQHPABWBAQHPABPKAMhGFxA1GNs8yQHMye1UFhUAVIIQ/lGYg1AIyx9QBs8WUATPFlj6AssfygDLByFus5V/AcoAzJRwMsoA4gBQ0x8BghD+UZiDuvLggfpAAQH6QAEB+gDTH9IA0wfSAAGR1JJtAeJVYBGAmTI=';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(master);
    builder.writeCell(members.size > 0 ? beginCell().storeDictDirect(members, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeNumber(requiredWeight);
    builder.writeTuple(storeTupleRequest(request));
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (MultisigSigner_errors[res.exitCode]) {
            throw new ComputeError(MultisigSigner_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const MultisigSigner_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    4429: { message: `Invalid sender` },
    4755: { message: `Timeout` },
    40810: { message: `Completed` },
    46307: { message: `Not a member` },
}

export class MultisigSigner implements Contract {
    
    static async init(master: Address, members: Dictionary<Address, bigint>, requiredWeight: bigint, request: Request) {
        return await MultisigSigner_init(master,members,requiredWeight,request);
    }
    
    static async fromInit(master: Address, members: Dictionary<Address, bigint>, requiredWeight: bigint, request: Request) {
        const init = await MultisigSigner_init(master,members,requiredWeight,request);
        const address = contractAddress(0, init);
        return new MultisigSigner(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MultisigSigner(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: MultisigSigner_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'YES') {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'YES') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getRequest(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('request', builder.build())).stack;
        const result = loadTupleRequest(source);
        return result;
    }
    
}