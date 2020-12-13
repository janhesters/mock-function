# mock-function

A simple mock function to mock functions.

Inspired by
[`jest.fn`](https://jestjs.io/docs/en/jest-object#jestfnimplementation).

## Installation

Install the package.

```
# NPM
npm i --save-dev mock-function
# yarn
yarn add --dev mock-function
```

Import it in your tests.

```ts
import fn from 'mock-function';
```

## Usage

```ts
import mockFunction from 'mock-function';

const add = (a: number, b: number) => a + b;
const mockedAdd = mockFunction(add);

mockedAdd.hasBeenCalled();
// ↵ false

mockedAdd(21, 21);
// ↵ 42
mockedAdd(9000, 1);
// ↵ 9001 (😱 OVER 9000)

mockedAdd.hasBeenCalled();
// ↵ true

mockedAdd.hasBeenCalledWith(2000, 12);
// ↵ false
mockedAdd.hasBeenCalledWith(21, 21);
// ↵ true

mockedAdd.calls;
// ↵ [[21, 21], [9000, 1]]
```

## Caveats

[Mocking is a code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)
for tight coupling and as such a surface indication that you might be able to
improve your tests and / or underlying code. Think about whether you can isolate
your side-effects or non-deterministic functions and make your code more
modular. Mocking can be okay, for example in integration tests.

For example, the pure function `add` in [Usage](#usage) should be tested using
plain unit tests that
[assert the actual and expected output](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f).
I chose `add` to simplify the example, but it is generally a bad use-case for
mocking.
