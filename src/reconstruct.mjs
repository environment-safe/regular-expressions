import { types } from './types/index.mjs';
import { writeSetTokens, setChar } from './write-set-tokens.mjs';
const reduceStack = (stack) => stack.map(reconstruct).join('');

const createAlternate = (token) => {
    if ('options' in token) {
        return token.options.map(reduceStack).join('|');
    } else if ('stack' in token) {
        return reduceStack(token.stack);
    } else {
        throw new Error('options or stack must be Root or Group token');
    }
};

export const reconstruct = (token) => {
    switch (token.type) {
        case types.ROOT:
            return createAlternate(token);
        case types.CHAR: {
            const c = String.fromCharCode(token.value);
            // Note that the escaping for characters inside classes is handled
            // in the write-set-tokens module so '-' and ']' are not escaped here
            return (/[[\\{}$^.|?*+()]/.test(c) ? '\\' : '') + c;
        }
        case types.POSITION:
            if (token.value === '^' || token.value === '$') {
                return token.value;
            } else {
                return `\\${token.value}`;
            }
        case types.REFERENCE:
            return `\\${token.value}`;
        case types.SET:
            return writeSetTokens(token);
        case types.GROUP: {
            // Check token.remember
            const prefix =
                token.name ? `?<${token.name}>` :
                    token.remember ? '' :
                        token.followedBy ? '?=' :
                            token.notFollowedBy ? '?!' :
                                '?:';
            return `(${prefix}${createAlternate(token)})`;
        }
        case types.REPETITION: {
            const { min, max } = token;
            let endWith;
            if (min === 0 && max === 1) {
                endWith = '?';
            } else if (min === 1 && max === Infinity) {
                endWith = '+';
            } else if (min === 0 && max === Infinity) {
                endWith = '*';
            } else if (max === Infinity) {
                endWith = `{${min},}`;
            } else if (min === max) {
                endWith = `{${min}}`;
            } else {
                endWith = `{${min},${max}}`;
            }
            return `${reconstruct(token.value)}${endWith}`;
        }
        case types.RANGE:
            return `${setChar(token.from)}-${setChar(token.to)}`;
        default:
            throw new Error(`Invalid token type ${token}`);
    }
};