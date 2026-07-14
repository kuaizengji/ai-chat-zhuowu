const test = require("node:test");
const assert = require("node:assert/strict");

const { normalizeMessages } = require("../server");

test("normalizeMessages filters invalid records and trims content", () => {
  const result = normalizeMessages([
    null,
    { role: "user", content: "  hello  " },
    { role: "assistant", content: "  hi " },
    { role: "bad-role", content: "skip" },
    { role: "user", content: "   " }
  ]);

  assert.deepEqual(result, [
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi" }
  ]);
});

test("normalizeMessages returns an empty array for non-arrays", () => {
  assert.deepEqual(normalizeMessages(undefined), []);
  assert.deepEqual(normalizeMessages({ messages: [] }), []);
});
