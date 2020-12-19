import { describe } from 'riteway';

import mockFunction from './mock-function';

describe('fn - the mock function', async assert => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const functionToMock = (a: number, b: number) => a + b;
  const mockedFunction = mockFunction(functionToMock);

  assert({
    given: 'the mocked function was NOT called yet',
    should: 'have an empty calls array',
    actual: mockedFunction.calls,
    expected: [],
  });

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

  {
    const anotherMockedFunction = mockFunction(functionToMock);
    anotherMockedFunction(2000, 12);

    assert({
      given: 'mocking another function',
      should:
        'create a unique new mock and NOT interfere with the existing mock',
      actual: mockedFunction.calls,
      expected: [[21, 21]],
    });
  }

  mockedFunction(9000, 1);

  assert({
    given: 'calling the mocked function again',
    should: 'add the arguments to the calls array',
    actual: mockedFunction.calls,
    expected: [
      [21, 21],
      [9000, 1],
    ],
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

describe('fn.hasBeenCalledTimes', async assert => {
  {
    const mockedFunction = mockFunction();

    assert({
      given: 'the mocked function has never been called',
      should: 'return 0',
      actual: mockedFunction.hasBeenCalledTimes,
      expected: 0,
    });
  }

  {
    const mockedFunction = mockFunction();
    mockedFunction();

    assert({
      given: 'the mocked function has been called once',
      should: 'return 1',
      actual: mockedFunction.hasBeenCalledTimes,
      expected: 1,
    });
  }

  {
    const mockedFunction = mockFunction();
    mockedFunction();
    mockedFunction();
    mockedFunction();

    assert({
      given: 'the mocked function has been called three times',
      should: 'return 3',
      actual: mockedFunction.hasBeenCalledTimes,
      expected: 3,
    });
  }
});
