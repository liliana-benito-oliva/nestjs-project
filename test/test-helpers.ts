export const mocked = <T extends (...args: any[]) => any>(
  fn: T,
): jest.Mock<ReturnType<T>, Parameters<T>> => fn as any;
