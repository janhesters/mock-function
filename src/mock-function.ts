import includes from 'ramda/src/includes';

/**
 * @param implementation The function that should be mocked.
 * @returns The mocked function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mockFunction<T extends (...arguments_: any[]) => any>(
  implementation?: T,
) {
  const mockedFunction = (...arguments_: Parameters<T>): ReturnType<T> => {
    mockedFunction.calls.push(arguments_);
    mockedFunction.hasBeenCalledTimes = mockedFunction.calls.length;
    return implementation?.(...arguments_);
  };

  mockedFunction.calls = [] as Parameters<T>[];
  mockedFunction.hasBeenCalledTimes = mockedFunction.calls.length;

  mockedFunction.hasBeenCalled = () => mockedFunction.calls.length > 0;
  mockedFunction.hasBeenCalledWith = (...arguments_: Parameters<T>) =>
    includes(arguments_, mockedFunction.calls);

  return mockedFunction;
}

export default mockFunction;
