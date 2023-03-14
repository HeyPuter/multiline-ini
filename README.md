# Multi-Line INI Parser

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

## Contributions

### In-Scope

- support for systemd INI files
- parser configuration for edge-cases (unconventional INI files)
