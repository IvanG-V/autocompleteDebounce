import { useLayoutEffect, useRef } from 'react';

export default function useLatest<T>(value: T): React.MutableRefObject<T> {
  const latestValue = useRef(value);

  useLayoutEffect(() => {
    latestValue.current = value;
  });

  return latestValue;
}
