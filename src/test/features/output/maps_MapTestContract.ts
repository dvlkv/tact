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
export type SetIntMap1 = {
    $$type: 'SetIntMap1';
    key: bigint;
    value: bigint | null;
}

export function storeSetIntMap1(src: SetIntMap1) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1510253336, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeInt(src.value, 257); } else { b_0.storeBit(false); }
    };
}

export function loadSetIntMap1(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1510253336) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    let _value = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'SetIntMap1' as const, key: _key, value: _value };
}

function loadTupleSetIntMap1(source: TupleReader) {
    let _key = source.readBigNumber();
    let _value = source.readBigNumberOpt();
    return { $$type: 'SetIntMap1' as const, key: _key, value: _value };
}

function storeTupleSetIntMap1(source: SetIntMap1) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserSetIntMap1(): DictionaryValue<SetIntMap1> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetIntMap1(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap1(src.loadRef().beginParse());
        }
    }
}
export type SetIntMap2 = {
    $$type: 'SetIntMap2';
    key: bigint;
    value: boolean | null;
}

export function storeSetIntMap2(src: SetIntMap2) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1629867766, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeBit(src.value); } else { b_0.storeBit(false); }
    };
}

export function loadSetIntMap2(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1629867766) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    let _value = sc_0.loadBit() ? sc_0.loadBit() : null;
    return { $$type: 'SetIntMap2' as const, key: _key, value: _value };
}

function loadTupleSetIntMap2(source: TupleReader) {
    let _key = source.readBigNumber();
    let _value = source.readBooleanOpt();
    return { $$type: 'SetIntMap2' as const, key: _key, value: _value };
}

function storeTupleSetIntMap2(source: SetIntMap2) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeBoolean(source.value);
    return builder.build();
}

function dictValueParserSetIntMap2(): DictionaryValue<SetIntMap2> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetIntMap2(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap2(src.loadRef().beginParse());
        }
    }
}
export type SetIntMap3 = {
    $$type: 'SetIntMap3';
    key: bigint;
    value: Cell | null;
}

export function storeSetIntMap3(src: SetIntMap3) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3613954633, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeRef(src.value); } else { b_0.storeBit(false); }
    };
}

export function loadSetIntMap3(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3613954633) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    let _value = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SetIntMap3' as const, key: _key, value: _value };
}

function loadTupleSetIntMap3(source: TupleReader) {
    let _key = source.readBigNumber();
    let _value = source.readCellOpt();
    return { $$type: 'SetIntMap3' as const, key: _key, value: _value };
}

function storeTupleSetIntMap3(source: SetIntMap3) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeCell(source.value);
    return builder.build();
}

function dictValueParserSetIntMap3(): DictionaryValue<SetIntMap3> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetIntMap3(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap3(src.loadRef().beginParse());
        }
    }
}
export type SetIntMap4 = {
    $$type: 'SetIntMap4';
    key: bigint;
    value: SomeStruct | null;
}

export function storeSetIntMap4(src: SetIntMap4) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(383013829, 32);
        b_0.storeInt(src.key, 257);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true); b_0.store(storeSomeStruct(src.value)); } else { b_0.storeBit(false); }
    };
}

export function loadSetIntMap4(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 383013829) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    let _value = sc_0.loadBit() ? loadSomeStruct(sc_0) : null;
    return { $$type: 'SetIntMap4' as const, key: _key, value: _value };
}

function loadTupleSetIntMap4(source: TupleReader) {
    let _key = source.readBigNumber();
    const _value_p = source.readTupleOpt();
    const _value = _value_p ? loadTupleSomeStruct(_value_p) : null;
    return { $$type: 'SetIntMap4' as const, key: _key, value: _value };
}

function storeTupleSetIntMap4(source: SetIntMap4) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    if (source.value !== null && source.value !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.value));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserSetIntMap4(): DictionaryValue<SetIntMap4> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetIntMap4(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap4(src.loadRef().beginParse());
        }
    }
}
export type SetIntMap5 = {
    $$type: 'SetIntMap5';
    key: bigint;
    value: SomeStruct;
}

export function storeSetIntMap5(src: SetIntMap5) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(240710017, 32);
        b_0.storeInt(src.key, 257);
        b_0.store(storeSomeStruct(src.value));
    };
}

export function loadSetIntMap5(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 240710017) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadIntBig(257);
    let _value = loadSomeStruct(sc_0);
    return { $$type: 'SetIntMap5' as const, key: _key, value: _value };
}

function loadTupleSetIntMap5(source: TupleReader) {
    let _key = source.readBigNumber();
    const _value = loadTupleSomeStruct(source.readTuple());
    return { $$type: 'SetIntMap5' as const, key: _key, value: _value };
}

function storeTupleSetIntMap5(source: SetIntMap5) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeTuple(storeTupleSomeStruct(source.value));
    return builder.build();
}

function dictValueParserSetIntMap5(): DictionaryValue<SetIntMap5> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetIntMap5(src)).endCell());
        },
        parse: (src) => {
            return loadSetIntMap5(src.loadRef().beginParse());
        }
    }
}
export type SetAddrMap1 = {
    $$type: 'SetAddrMap1';
    key: Address;
    value: bigint | null;
}

export function storeSetAddrMap1(src: SetAddrMap1) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1749966413, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeInt(src.value, 257); } else { b_0.storeBit(false); }
    };
}

export function loadSetAddrMap1(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1749966413) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadAddress();
    let _value = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'SetAddrMap1' as const, key: _key, value: _value };
}

function loadTupleSetAddrMap1(source: TupleReader) {
    let _key = source.readAddress();
    let _value = source.readBigNumberOpt();
    return { $$type: 'SetAddrMap1' as const, key: _key, value: _value };
}

function storeTupleSetAddrMap1(source: SetAddrMap1) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.key);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserSetAddrMap1(): DictionaryValue<SetAddrMap1> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetAddrMap1(src)).endCell());
        },
        parse: (src) => {
            return loadSetAddrMap1(src.loadRef().beginParse());
        }
    }
}
export type SetAddrMap2 = {
    $$type: 'SetAddrMap2';
    key: Address;
    value: boolean | null;
}

export function storeSetAddrMap2(src: SetAddrMap2) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(624157584, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeBit(src.value); } else { b_0.storeBit(false); }
    };
}

export function loadSetAddrMap2(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 624157584) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadAddress();
    let _value = sc_0.loadBit() ? sc_0.loadBit() : null;
    return { $$type: 'SetAddrMap2' as const, key: _key, value: _value };
}

function loadTupleSetAddrMap2(source: TupleReader) {
    let _key = source.readAddress();
    let _value = source.readBooleanOpt();
    return { $$type: 'SetAddrMap2' as const, key: _key, value: _value };
}

function storeTupleSetAddrMap2(source: SetAddrMap2) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.key);
    builder.writeBoolean(source.value);
    return builder.build();
}

function dictValueParserSetAddrMap2(): DictionaryValue<SetAddrMap2> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetAddrMap2(src)).endCell());
        },
        parse: (src) => {
            return loadSetAddrMap2(src.loadRef().beginParse());
        }
    }
}
export type SetAddrMap3 = {
    $$type: 'SetAddrMap3';
    key: Address;
    value: Cell | null;
}

export function storeSetAddrMap3(src: SetAddrMap3) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4276365062, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true).storeRef(src.value); } else { b_0.storeBit(false); }
    };
}

export function loadSetAddrMap3(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4276365062) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadAddress();
    let _value = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SetAddrMap3' as const, key: _key, value: _value };
}

function loadTupleSetAddrMap3(source: TupleReader) {
    let _key = source.readAddress();
    let _value = source.readCellOpt();
    return { $$type: 'SetAddrMap3' as const, key: _key, value: _value };
}

function storeTupleSetAddrMap3(source: SetAddrMap3) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.key);
    builder.writeCell(source.value);
    return builder.build();
}

function dictValueParserSetAddrMap3(): DictionaryValue<SetAddrMap3> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetAddrMap3(src)).endCell());
        },
        parse: (src) => {
            return loadSetAddrMap3(src.loadRef().beginParse());
        }
    }
}
export type SetAddrMap4 = {
    $$type: 'SetAddrMap4';
    key: Address;
    value: SomeStruct | null;
}

export function storeSetAddrMap4(src: SetAddrMap4) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1683777913, 32);
        b_0.storeAddress(src.key);
        if (src.value !== null && src.value !== undefined) { b_0.storeBit(true); b_0.store(storeSomeStruct(src.value)); } else { b_0.storeBit(false); }
    };
}

export function loadSetAddrMap4(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1683777913) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadAddress();
    let _value = sc_0.loadBit() ? loadSomeStruct(sc_0) : null;
    return { $$type: 'SetAddrMap4' as const, key: _key, value: _value };
}

function loadTupleSetAddrMap4(source: TupleReader) {
    let _key = source.readAddress();
    const _value_p = source.readTupleOpt();
    const _value = _value_p ? loadTupleSomeStruct(_value_p) : null;
    return { $$type: 'SetAddrMap4' as const, key: _key, value: _value };
}

function storeTupleSetAddrMap4(source: SetAddrMap4) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.key);
    if (source.value !== null && source.value !== undefined) {
        builder.writeTuple(storeTupleSomeStruct(source.value));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserSetAddrMap4(): DictionaryValue<SetAddrMap4> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetAddrMap4(src)).endCell());
        },
        parse: (src) => {
            return loadSetAddrMap4(src.loadRef().beginParse());
        }
    }
}
export type SetAddrMap5 = {
    $$type: 'SetAddrMap5';
    key: Address;
    value: SomeStruct;
}

export function storeSetAddrMap5(src: SetAddrMap5) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1358519521, 32);
        b_0.storeAddress(src.key);
        b_0.store(storeSomeStruct(src.value));
    };
}

export function loadSetAddrMap5(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1358519521) { throw Error('Invalid prefix'); }
    let _key = sc_0.loadAddress();
    let _value = loadSomeStruct(sc_0);
    return { $$type: 'SetAddrMap5' as const, key: _key, value: _value };
}

function loadTupleSetAddrMap5(source: TupleReader) {
    let _key = source.readAddress();
    const _value = loadTupleSomeStruct(source.readTuple());
    return { $$type: 'SetAddrMap5' as const, key: _key, value: _value };
}

function storeTupleSetAddrMap5(source: SetAddrMap5) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.key);
    builder.writeTuple(storeTupleSomeStruct(source.value));
    return builder.build();
}

function dictValueParserSetAddrMap5(): DictionaryValue<SetAddrMap5> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetAddrMap5(src)).endCell());
        },
        parse: (src) => {
            return loadSetAddrMap5(src.loadRef().beginParse());
        }
    }
}
export type SomeStruct = {
    $$type: 'SomeStruct';
    value: bigint;
}

export function storeSomeStruct(src: SomeStruct) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.value, 257);
    };
}

export function loadSomeStruct(slice: Slice) {
    let sc_0 = slice;
    let _value = sc_0.loadIntBig(257);
    return { $$type: 'SomeStruct' as const, value: _value };
}

function loadTupleSomeStruct(source: TupleReader) {
    let _value = source.readBigNumber();
    return { $$type: 'SomeStruct' as const, value: _value };
}

function storeTupleSomeStruct(source: SomeStruct) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserSomeStruct(): DictionaryValue<SomeStruct> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSomeStruct(src)).endCell());
        },
        parse: (src) => {
            return loadSomeStruct(src.loadRef().beginParse());
        }
    }
}
async function MapTestContract_init() {
    const __init = 'te6ccgEBBgEAUQABFP8A9KQT9LzyyAsBAgFiAgMCAs4EBQAJoUrd4AUAAUgAW0bW1tbW1tbW0IyMwIUHj0ABX0AAPI9AAS9AD0AALI9AAT9AAT9ADJWMzJAczJg=';
    const __code = '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';
    const __system = 'te6cckECSgEACgsAAQHAAQEFoMSDAgEU/wD0pBP0vPLICwMCAWI2BAIBIBMFAgEgCwYCAUgJBwGBsDl7UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYVQfbPCBukjBtmSBu8tCAbyFvAeIgbpIwbd6AIARg2XwQzgQEBMvAG2zwSAVWxbTtRNDUAfhi9AT0BNQB0PQE9AT0BNQw0PQE9AT0BDAQaBBnbBhVB9s8gCgA4NV8DbCIygQELAYEBAUEz9ApvoZQB1wAwkltt4gIBIA0MAE23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzACASAQDgFVsPk7UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYVQfbPIA8AKmxxgQEBZkEz9AxvoZQB1wAwkltt4gGBsa17UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYVQfbPCBukjBtmSBu8tCAbyFvAeIgbpIwbd6ARASZQhl8GgQELMln0C2+hkjBt39s8EgAgIG6SMG3g0IEBAdcAATFvAQIBICUUAgEgFxUBUbWsPaiaGoA/DF6AnoCagDoegJ6AnoCahhoegJ6AnoCGAg0CDO2DG2eQFgAIEDdfBwIBICAYAgEgHhkCA6KCHBoBUddqJoagD8MXoCegJqAOh6AnoCegJqGGh6AnoCegIYCDQIM7YMKoPtnkGwAuOF8GgQEBWHFBM/QMb6GUAdcAMJJbbeIBTWu1E0NQB+GL0BPQE1AHQ9AT0BPQE1DDQ9AT0BPQEMBBoEGdsGNs8h0ACBAnXwcBUa8RdqJoagD8MXoCegJqAOh6AnoCegJqGGh6AnoCegIYCDQIM7YMbZ5AHwAIEEdfBwIBbiMhAVOl6dqJoagD8MXoCegJqAOh6AnoCegJqGGh6AnoCegIYCDQIM7YMKoPtnkiACAxbGKBAQsBWfQLb6GSMG3fAU+mR9qJoagD8MXoCegJqAOh6AnoCegJqGGh6AnoCegIYCDQIM7YMbZ5JAAGF18HAgEgLiYCASAsJwIBICooAVGu4naiaGoA/DF6AnoCagDoegJ6AnoCahhoegJ6AnoCGAg0CDO2DG2eQCkABGxxAVGvcnaiaGoA/DF6AnoCagDoegJ6AnoCahhoegJ6AnoCGAg0CDO2DG2eQCsACBBnXwcBUbGxe1E0NQB+GL0BPQE1AHQ9AT0BPQE1DDQ9AT0BPQEMBBoEGdsGNs8gLQAIEFdfBwIBIDEvAVWyKTtRNDUAfhi9AT0BNQB0PQE9AT0BNQw0PQE9AT0BDAQaBBnbBhVB9s8gMAAUN18FMoEBAQHwBgIBIDQyAVWtqnaiaGoA/DF6AnoCagDoegJ6AnoCahhoegJ6AnoCGAg0CDO2DCqD7Z5AMwAwNFtsQoEBC1hxQTP0Cm+hlAHXADCSW23iAVGvQ/aiaGoA/DF6AnoCagDoegJ6AnoCahhoegJ6AnoCGAg0CDO2DG2eQDUABF8HAgLNOjcCAVg5OAAjCFulVtZ9Fkw4MgBzwBBM/RBgABEWfQNb6HcMG2AEodOBDrpOEPypgQa4WP7wFoaYGAuNhgAMi/yLhxAP0gESgzN4J8MIFIrfAQYAARa6TgkNhxgRBBCC0CUYxdcYEQQQgwkud7XXGBEEEIa7RJJN1ElHRjsE/I7mMO1E0NQB+GL0BPQE1AHQ9AT0BPQE1DDQ9AT0BPQEMBBoEGdsGAjTHwGCENdokkm68uCBgQEB1wDSAAGR1JJtAeJZMhCJEHgQZxBWEEUQNEMAECeBAQFZIG6VMFn0WjCUQTP0FeIF4CCCEBbUU8W64wIgghAOWPGBuuMCIEhDQjwE/oIQaE5eTbqO4DDtRNDUAfhi9AT0BNQB0PQE9AT0BNQw0PQE9AT0BDAQaBBnbBgI0x8BghBoTl5NuvLggfpAAQHSAAGVgQEB1wCSbQHiWTIQiRB4EGcQVhBFEDRDABAlgQELWYEBAfAHA+AgghAlM+OQuuMCIIIQ/uQnBrrjAiBIQUA9BP6CEGRcaXm6j2sw7UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYCNMfAYIQZFxpebry4IH6QAEB0gABmIEBAdcAAW8BkW3iEjIQiRB4EGcQVhBFEDRDAIEBCwHbPBIgbpUwWfRZMJRBM/QT4uCCEFD5XOG64wIwREg/PgAG8sCCAsLtRNDUAfhi9AT0BNQB0PQE9AT0BNQw0PQE9AT0BDAQaBBnbBgI0x8BghBQ+VzhuvLggfpAAQGBAQHXAAESMhCJEHgQZxBWEEUQNEMAgQELAds8EiBulTBZ9FkwlEEz9BPiRUgByjDtRNDUAfhi9AT0BNQB0PQE9AT0BNQw0PQE9AT0BDAQaBBnbBgI0x8BghD+5CcGuvLggfpAAQHSAAGR1JJtAeJZMhCJEHgQZxBWEEUQNEMAECOBAQtZIG6VMFn0WTCUQTP0E+IBSAG2MO1E0NQB+GL0BPQE1AHQ9AT0BPQE1DDQ9AT0BPQEMBBoEGdsGAjTHwGCECUz45C68uCB+kABAdIAAZLSAJJtAeJZMhCJEHgQZxBWEEUQNEMAECSBAQtZcfAHAkgCzDDtRNDUAfhi9AT0BNQB0PQE9AT0BNQw0PQE9AT0BDAQaBBnbBgI0x8BghAOWPGBuvLggYEBAdcAgQEB1wABEjIQiRB4EGcQVhBFEDRDAIEBAQHbPBA3EiBulTBZ9FowlEEz9BXiBEVIAt4w7UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYCNMfAYIQFtRTxbry4IGBAQHXANIAAZiBAQHXAAFvAZFt4hIyEIkQeBBnEFYQRRA0QwCBAQEB2zwQNxIgbpUwWfRaMJRBM/QV4gRESAEeIG6SMG3gIG7y0IBvIds8RQASyAEBgQEBzwDJAdgw7UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYCNMfAYIQYSXO9rry4IGBAQHXANIAAZLSAJJtAeJZMhCJEHgQZxBWEEUQNEMAECiBAQFZcSFulVtZ9FowmMgBzwBBM/RC4gZIAeAw7UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYCNMfAYIQWgSjGLry4IGBAQHXANIAAZWBAQHXAJJtAeJZMhCJEHgQZxBWEEUQNEMAgQEBIBBLQzAhbpVbWfRaMJjIAc8AQTP0QuIHSABUyPhCAcxVcFB49AAV9AADyPQAEvQA9AACyPQAE/QAE/QAyVjMyQHMye1UAJ5b7UTQ1AH4YvQE9ATUAdD0BPQE9ATUMND0BPQE9AQwEGgQZ2wYyPhCAcxVcFB49AAV9AADyPQAEvQA9AACyPQAE/QAE/QAyVjMyQHMye1UbHJbRA==';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (MapTestContract_errors[res.exitCode]) {
            throw new ComputeError(MapTestContract_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const MapTestContract_errors: { [key: number]: { message: string } } = {
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
}

export class MapTestContract implements Contract {
    
    static async init() {
        return await MapTestContract_init();
    }
    
    static async fromInit() {
        const init = await MapTestContract_init();
        const address = contractAddress(0, init);
        return new MapTestContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MapTestContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: MapTestContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetIntMap1 | SetIntMap2 | SetIntMap3 | SetIntMap4 | SetIntMap5 | SetAddrMap1 | SetAddrMap2 | SetAddrMap3 | SetAddrMap4 | SetAddrMap5) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetIntMap1') {
            body = beginCell().store(storeSetIntMap1(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetIntMap2') {
            body = beginCell().store(storeSetIntMap2(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetIntMap3') {
            body = beginCell().store(storeSetIntMap3(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetIntMap4') {
            body = beginCell().store(storeSetIntMap4(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetIntMap5') {
            body = beginCell().store(storeSetIntMap5(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAddrMap1') {
            body = beginCell().store(storeSetAddrMap1(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAddrMap2') {
            body = beginCell().store(storeSetAddrMap2(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAddrMap3') {
            body = beginCell().store(storeSetAddrMap3(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAddrMap4') {
            body = beginCell().store(storeSetAddrMap4(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAddrMap5') {
            body = beginCell().store(storeSetAddrMap5(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getIntMap1(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('intMap1', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
    async getIntMap1Value(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('intMap1Value', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getIntMap2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('intMap2', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Bool(), source.readCellOpt());
        return result;
    }
    
    async getIntMap2Value(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('intMap2Value', builder.build())).stack;
        let result = source.readBooleanOpt();
        return result;
    }
    
    async getIntMap3(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('intMap3', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
        return result;
    }
    
    async getIntMap3Value(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('intMap3Value', builder.build())).stack;
        let result = source.readCellOpt();
        return result;
    }
    
    async getIntMap4(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('intMap4', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserSomeStruct(), source.readCellOpt());
        return result;
    }
    
    async getIntMap4Value(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('intMap4Value', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleSomeStruct(result_p) : null;
        return result;
    }
    
    async getAddrMap1(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('addrMap1', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
    async getAddrMap1Value(provider: ContractProvider, key: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(key);
        let source = (await provider.get('addrMap1Value', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getAddrMap2(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('addrMap2', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
        return result;
    }
    
    async getAddrMap2Value(provider: ContractProvider, key: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(key);
        let source = (await provider.get('addrMap2Value', builder.build())).stack;
        let result = source.readBooleanOpt();
        return result;
    }
    
    async getAddrMap3(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('addrMap3', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Cell(), source.readCellOpt());
        return result;
    }
    
    async getAddrMap3Value(provider: ContractProvider, key: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(key);
        let source = (await provider.get('addrMap3Value', builder.build())).stack;
        let result = source.readCellOpt();
        return result;
    }
    
    async getAddrMap4(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('addrMap4', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserSomeStruct(), source.readCellOpt());
        return result;
    }
    
    async getAddrMap4Value(provider: ContractProvider, key: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(key);
        let source = (await provider.get('addrMap4Value', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleSomeStruct(result_p) : null;
        return result;
    }
    
}