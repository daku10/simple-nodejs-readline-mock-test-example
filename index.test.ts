import { sendLine, sendClose } from "./mock-stdin";

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
