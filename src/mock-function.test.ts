import { describe } from 'riteway';

import mockFunction from './mock-function';

describe('fn - the mock function', async assert => {
  const mockedFunction = mockFunction((a: number, b: number) => a + b);

  assert({
    given: 'calling a mocked function',
    should: 'should return the correct result',
    actual: mockedFunction(21, 21),
    expected: 42,
  });

  assert({
    given: "a mocked function's calls",
    should: 'return the correct args',
    actual: mockedFunction.calls,
    expected: [[21, 21]],
  });
});

describe('fn.hasBeenCalled()', async assert => {
  {
    const mockedFunction = mockFunction();

    assert({
      given: 'a mocked function that has NOT been called',
      should: 'return false',
      actual: mockedFunction.hasBeenCalled(),
      expected: false,
    });
  }

  {
    const mockedFunction = mockFunction();
    mockedFunction();

    assert({
      given: 'a mocked function that has been called',
      should: 'return true',
      actual: mockedFunction.hasBeenCalled(),
      expected: true,
    });
  }
});

describe('fn.hasBeenCalledWith()', async assert => {
  {
    const mockedFunction = mockFunction();

    assert({
      given: 'a mocked function that has NOT been called with the argument',
      should: 'return false',
      actual: mockedFunction.hasBeenCalledWith('foo'),
      expected: false,
    });
  }

  {
    const mockedFunction = mockFunction();

    assert({
      given:
        'a mocked function that has NOT been called with multiple arguments',
      should: 'return false',
      actual: mockedFunction.hasBeenCalledWith('foo', 'bar'),
      expected: false,
    });
  }

  {
    const mockedFunction = mockFunction();
    mockedFunction('lel', 'lol');
    mockedFunction('lol', 'bar');
    mockedFunction('foo', 'lol');
    mockedFunction(42);

    assert({
      given:
        'a mocked function that has NOT been called with multiple arguments',
      should: 'return false',
      actual: mockedFunction.hasBeenCalledWith('foo', 'bar'),
      expected: false,
    });
  }

  {
    const mockedFunction = mockFunction();
    mockedFunction('lel');
    mockedFunction(9001);
    mockedFunction('foo');

    assert({
      given: 'a mocked function that has been called with the argument',
      should: 'return true',
      actual: mockedFunction.hasBeenCalledWith('foo'),
      expected: true,
    });
  }

  {
    const mockedFunction = mockFunction();
    mockedFunction('lel', 'lol');
    mockedFunction('foo', 'bar');
    mockedFunction(42);

    assert({
      given: 'a mocked function that has been called with multiple arguments',
      should: 'return true',
      actual: mockedFunction.hasBeenCalledWith('foo', 'bar'),
      expected: true,
    });
  }

  {
    const mockedFunction = mockFunction();
    mockedFunction('lel', 'lol');
    mockedFunction('foo', 'bar');
    mockedFunction(42);
    mockedFunction('foo', 'bar');

    assert({
      given:
        'a mocked function that has been called with multiple arguments multiple times',
      should: 'return true',
      actual: mockedFunction.hasBeenCalledWith('foo', 'bar'),
      expected: true,
    });
  }
});
