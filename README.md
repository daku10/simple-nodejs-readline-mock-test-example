Simple Node.js readline test with mock example
---

This is a simple mock example of a node.js readline using jest.

The sample program takes multiple strings separated by a single space and outputs them in json format with the key before the space and the value after the space. However, if there are duplicate keys, the first string will be used as the result.

environment

- node.js 15.14.0
- npm 7.11.1
- typescript 4.2.4
- ts-node 9.1.1
- jest 26.6.3
- ts-jest 26.5.5

test.txt
```
hello world
foo baz
hoge fuga
hoge piyo
```

```
ts-node --silent index.ts < test.txt > result.json
```

result.json
```
{"hello":"world","foo":"baz","hoge":"fuga"}
```

test code
```
let sendLine: (line: string) => void;
let sendClose: () => void;

jest.mock("readline", () => {
  return {
    createInterface: () => {
      return {
        on: (event: string, callback: (...args: any) => void) => {
          switch (event) {
            case "line":
              sendLine = callback;
              break;
            case "close":
              sendClose = callback;
              break;
          }
        },
      };
    },
  };
});

test("input lines has duplicate key", () => {
  // given
  const spyConsoleLog = jest.spyOn(console, "log");

  // when
  require("./index");
  sendLine("hello world");
  sendLine("foo baz");
  sendLine("hoge fuga");
  sendLine("hoge piyo");
  sendClose();

  // then
  expect(spyConsoleLog).toBeCalledWith(
    '{"hello":"world","foo":"baz","hoge":"fuga"}'
  );
});
```