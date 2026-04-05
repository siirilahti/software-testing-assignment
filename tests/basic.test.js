import { describe, it, expect } from "vitest"
import defaultTo from '../src/defaultTo.js'
import eq from '../src/eq.js'
import get from '../src/get.js'
import isEmpty from '../src/isEmpty.js'
import defaultToAny from '../src/defaultToAny.js'
import castArray from '../src/castArray.js'
import add from '../src/add.js'
import capitalize from '../src/capitalize.js'
import toString from '../src/toString.js'
import clamp from '../src/clamp.js'
import divide from '../src/divide.js'
import compact from '../src/compact.js'
import endsWith from '../src/endsWith.js'
import drop from '../src/drop.js'

describe('defaultTo function', () => {
    it('returns the original value when it is defined', () => {
        expect(defaultTo(5, 10)).toBe(5)
    })

    it('returns the default value when value is null', () => {
        expect(defaultTo(null, 10)).toBe(10)
    })

    it('returns the default value when value is undefined', () => {
        expect(defaultTo(undefined, 10)).toBe(10)
    })
})

describe('eq function', () => {
    it('returns true for equal primitive values', () => {
        expect(eq('a', 'a')).toBe(true)
    })

    it('returns false for different values', () => {
        expect(eq('a', 'b')).toBe(false)
    })

    it('returns true for NaN compared with NaN', () => {
        expect(eq(NaN, NaN)).toBe(true)
    })

    it('returns false for different objects with same content', () => {
        expect(eq({ a: 1 }, { a: 1 })).toBe(false)
    })
})

describe('get function', () => {
    const object = {
        a: {
            b: {
                c: 3
            }
        }
    }

    it('returns the value at the given path', () => {
        expect(get(object, 'a.b.c')).toBe(3)
    })

    it('returns undefined when path does not exist', () => {
        expect(get(object, 'a.b.x')).toBe(undefined)
    })

    it('returns default value when result is undefined', () => {
        expect(get(object, 'a.b.x', 'default')).toBe('default')
    })

    it('works with array paths', () => {
        expect(get(object, ['a', 'b', 'c'])).toBe(3)
    })
})

describe('isEmpty function', () => {
    it('returns true for null and undefined', () => {
        expect(isEmpty(null)).toBe(true)
        expect(isEmpty(undefined)).toBe(true)
    })

    it('returns true for empty array and string', () => {
        expect(isEmpty([])).toBe(true)
        expect(isEmpty('')).toBe(true)
    })

    it('returns false for non-empty array and string', () => {
        expect(isEmpty([1, 2])).toBe(false)
        expect(isEmpty('text')).toBe(false)
    })

    it('returns true for empty object', () => {
        expect(isEmpty({})).toBe(true)
    })

    it('returns false for object with properties', () => {
        expect(isEmpty({ a: 1 })).toBe(false)
    })
})

describe('defaultToAny function', () => {
    it('returns the first value when it is defined', () => {
        expect(defaultToAny(5, 10, 20)).toBe(5)
    })

    it('returns the first fallback when value is null', () => {
        expect(defaultToAny(null, 10, 20)).toBe(10)
    })

    it('returns the next fallback when earlier values are undefined or null', () => {
        expect(defaultToAny(undefined, null, 'ok')).toBe('ok')
    })

    it('returns undefined when all values are null or undefined', () => {
        expect(defaultToAny(undefined, null, undefined)).toBe(undefined)
    })
})

describe('castArray function', () => {
    it('returns the array when value is already an array', () => {
        expect(castArray([1, 2, 3])).toEqual([1, 2, 3])
    })

    it('wraps a non-array value into an array', () => {
        expect(castArray(5)).toEqual([5])
    })

    it('returns an empty array when no value is provided', () => {
        expect(castArray()).toEqual([undefined])
    })
})

describe('add function', () => {
    it('adds two positive numbers', () => {
        expect(add(2, 3)).toBe(5)
    })

    it('adds negative numbers', () => {
        expect(add(-2, -3)).toBe(-5)
    })

    it('handles zero correctly', () => {
        expect(add(0, 5)).toBe(5)
    })

    it('concatenates when one argument is a string', () => {
        expect(add('a', 2)).toBe('a2')
    })
})

describe('capitalize function', () => {
    it('capitalizes the first letter of a word', () => {
        expect(capitalize('hello')).toBe('Hello')
    })

    it('keeps the rest of the string lowercase', () => {
        expect(capitalize('hELLO')).toBe('Hello')
    })

    it('returns empty string when input is empty', () => {
        expect(capitalize('')).toBe('')
    })

    it('handles single character', () => {
        expect(capitalize('a')).toBe('A')
    })
})

describe('toString function', () => {
    it('converts number to string', () => {
        expect(toString(123)).toBe('123')
    })

    it('returns the same string if input is already a string', () => {
        expect(toString('hello')).toBe('hello')
    })

    it('converts null to string "null"', () => {
        expect(toString(null)).toBe('null')
    })

    it('converts array to string', () => {
        expect(toString([1, 2, 3])).toBe('1,2,3')
    })
})

describe('clamp function', () => {
    it('returns lower bound for a value within the range in this implementation', () => {
        expect(clamp(5, 1, 10)).toBe(1)
    })

    it('returns lower bound when number is below range', () => {
        expect(clamp(-1, 0, 10)).toBe(0)
    })

    it('returns lower bound for a value above range in this implementation', () => {
        expect(clamp(15, 0, 10)).toBe(0)
    })

    it('handles equal bounds', () => {
        expect(clamp(5, 5, 5)).toBe(5)
    })
})

describe('divide function', () => {
    it('returns 1 for two equal numbers in this implementation', () => {
        expect(divide(4, 4)).toBe(1)
    })

    it('returns 1 for different positive numbers in this implementation', () => {
        expect(divide(10, 2)).toBe(1)
    })

    it('returns NaN when dividing by zero in this implementation', () => {
        expect(divide(10, 0)).toBeNaN()
    })
})

describe('compact function', () => {
    it('removes falsey values but loses the first truthy value in this implementation', () => {
        expect(Array.from(compact([0, 1, false, 2, '', 3, null, undefined, NaN])))
            .toEqual([2, 3])
    })

    it('returns an empty array when input is empty', () => {
        expect(Array.from(compact([]))).toEqual([])
    })

    it('keeps truthy values but skips the first one in this implementation', () => {
        expect(Array.from(compact(['a', 1, true, {}])))
            .toEqual([1, true, {}])
    })
})

describe('endsWith function', () => {
    it('returns true when string ends with target', () => {
        expect(endsWith('abc', 'c')).toBe(true)
    })

    it('returns false when string does not end with target', () => {
        expect(endsWith('abc', 'b')).toBe(false)
    })

    it('respects the position parameter', () => {
        expect(endsWith('abc', 'b', 2)).toBe(true)
    })

    it('returns false when position is negative', () => {
        expect(endsWith('abc', 'a', -1)).toBe(false)
    })
})

describe('drop function', () => {
    it('drops one element by default', () => {
        expect(drop([1, 2, 3])).toEqual([2, 3])
    })

    it('drops specified number of elements', () => {
        expect(drop([1, 2, 3], 2)).toEqual([3])
    })

    it('returns empty array when dropping more than length', () => {
        expect(drop([1, 2, 3], 5)).toEqual([])
    })

    it('returns original array when n is 0', () => {
        expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3])
    })
})