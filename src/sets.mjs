import { types } from './types/types.mjs';

//type SetsFunc = () => (Range | Char)[]
//export type SetFunc = () => Set

const INTS = () => [{ type: types.RANGE, from: 48, to: 57 }];

const WORDS = () => [
    { type: types.CHAR, value: 95 },
    { type: types.RANGE, from: 97, to: 122 },
    { type: types.RANGE, from: 65, to: 90 },
    { type: types.RANGE, from: 48, to: 57 },
];

const WHITESPACE = () => [
    { type: types.CHAR, value: 9 },
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 11 },
    { type: types.CHAR, value: 12 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 32 },
    { type: types.CHAR, value: 160 },
    { type: types.CHAR, value: 5760 },
    { type: types.RANGE, from: 8192, to: 8202 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
    { type: types.CHAR, value: 8239 },
    { type: types.CHAR, value: 8287 },
    { type: types.CHAR, value: 12288 },
    { type: types.CHAR, value: 65279 },
];

const NOTANYCHAR = () => [
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
];

// Predefined class objects.
export const words = () => ({ type: types.SET, set: WORDS(), not: false });
export const notWords = () => ({ type: types.SET, set: WORDS(), not: true });
export const ints = () => ({ type: types.SET, set: INTS(), not: false });
export const notInts = () => ({ type: types.SET, set: INTS(), not: true });
export const whitespace = () => ({ type: types.SET, set: WHITESPACE(), not: false });
export const notWhitespace = () => ({ type: types.SET, set: WHITESPACE(), not: true });
export const anyChar = () => ({ type: types.SET, set: NOTANYCHAR(), not: true });