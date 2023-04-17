# Multi-Line INI Parser

<h3 align="center"><img width="300" alt="KV.JS logo"
    src="./doc/icon-with-text.svg"
></h3>
<p align="center">The first javascript INI parser supporting multiline strings.</p>
<hr>

**multiline-ini** is a fast INI parser meant to support multiline strings
and other syntax. It uses a state-machine parser which makes it possible
to support features missing from other ini parsers that use the naive
"split-by-line then regex match" approach.

The syntax of INI files is not standardized, so our approach is to treat
systemd's [config parser](https://github.com/systemd/systemd/blob/main/src/shared/conf-parser.c)
as a reference implementation.

## Installation
```bash
npm install --save @heyputer/multiline-ini
```

## Usage
```javascript
// Require the module
const ini = require('@heyputer/multiline-ini');

// Example: systemd-like input
const result = ini.parse(`
[Service]
Type=simple
ExecStart=/bin/sh -c 'exec /usr/bin/my-exe \
>>/var/log/my-app/out.log \
2>>/var/log/my-app/err.log'
Environment=NODE_ENV=production-linux
`);

console.log(JSON.stringify(result, null, '  ')); /*
{
  Service: {
    Type: 'simple',
    ExecStart: "/bin/sh -c 'exec /usr/bin/my-exe >>/var/log/my-app/out.log 2>>/var/log/my-app/err.log'",
    Environment: 'NODE_ENV=production-linux'
  }
}
*/
```

## Why `multiline-ini`?

This INI parser was created out of a need to parse systemd unit files.
INI is not a standardized file format, but there is precedent for
[escaping line feeds in INI values](https://en.wikipedia.org/wiki/INI_file#cite_note-multiline-entry-13).
This is supported by systemd.

The following INI parsers were tested and do not support multi-line values:

| module name | problem | is regex | complexity |
| ----------- | ------- | -------- | ---------- |
| ini         | subsequent lines become keys with a value of true | yes | very over-engineered |
| ini-parser  | subsequent lines ignored | yes | under 40 lines |
| iniparser   | subsequent lines ignored | yes | under 70 lines |
| node-ini    | this module contains a typo and doesn't even work | yes | moderately over-engineered |

These parsers are all implemented using regex, and are designed to process each
line individually searching for a `[section]` or `key=value` pair.
This makes it more challenging to add multiline support to an existing parser.

## Contributing

### In-Scope

The following items are in scope and contributions in these areas are
welcome.
- support for all INI syntax supported by systemd with zero configuration
  - i.e. we use systemd as a reference implementation for an INI standard
- plugin support for handling other INI conventions

## License
Distributed under the MIT License. See [./LICENSE](./LICENSE) for more information.