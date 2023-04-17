const assert = require('assert');
const dedent = require('dedent-js');
const ini = require('../iniparser.js');

describe('ini.section', () => {
    it('should pass basic test', () => {
        const result = ini.parse(dedent`
            [MySection]
            MyValue=Hello
        `)
        assert.equal(result?.MySection?.MyValue, 'Hello');
    })
})

describe('ini.string.multiline', () => {
    it('should pass basic test', () => {
        const result = ini.parse(dedent`
            [MySection]
            MyValue=This is \\
            a test
        `)
        assert.equal(result?.MySection?.MyValue, 'This is a test');
    })
})
