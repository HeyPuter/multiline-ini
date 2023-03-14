class INIParser {
    static parse (str) {
        // Parser constants
        const WHITESPACE = '\n\t \r';

        // Parser memory
        const sections = {};
        let currentSection;
        const stack = [];
        let buffer = '';

        // Parser actions
        const actions = {};
        actions.put = () => {
            const value = stack.pop();
            const key = stack.pop();
            currentSection[key] = value;
        }

        // Parser execution state
        const states = {};
        let state;
        states.Ready = {
            fn: pos => {
                const c = str[pos];
                if ( c === '[' ) {
                    const endOfSectionName = str.indexOf(']', pos + 1);
                    const sectionName = str.slice(pos+1, endOfSectionName);
                    currentSection = sections[sectionName] = {};
                    return endOfSectionName + 1;
                }
                if ( WHITESPACE.includes(c) ) return pos + 1;
                state = states.Key;
                return pos;
            }
        }
        states.Key = {
            fn: pos => {
                const c = str[pos];
                if ( c === '=' ) {
                    stack.push(buffer);
                    buffer = '';
                    state = states.Value;
                    return pos + 1;
                }
                if ( c === '\n' ) {
                    stack.push(buffer);
                    buffer = '';
                    stack.push(true);
                    actions.put();
                    return pos + 1;
                }
                buffer += c;
                return pos + 1;
            }
        }
        states.Value = {
            fn: pos => {
                const c = str[pos];
                if ( c === '\\' && str[pos+1] == '\n' ) {
                    return pos + 2;
                }
                if ( c === '\n' ) {
                    stack.push(buffer);
                    buffer = '';
                    actions.put();
                    state = states.Ready;
                    return pos + 1;
                }
                buffer += c;
                return pos + 1;
            },
            onEnd: () => {
                stack.push(buffer);
                buffer = '';
                actions.put();
            }
        }

        state = states.Ready;
        let pos = 0;
        for ( ; pos < str.length ; ) {
            pos = state.fn(pos);
        }
        if ( state.onEnd ) state.onEnd();
        return sections;
    }
}

module.exports = INIParser;
