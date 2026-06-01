import "@testing-library/jest-dom/vitest";

class ResizeObserverMock {
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentRect: {
            width: 960,
            height: 640,
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            right: 960,
            bottom: 640,
            toJSON: () => undefined
          },
          borderBoxSize: [],
          contentBoxSize: [],
          devicePixelContentBoxSize: []
        }
      ],
      this as unknown as ResizeObserver
    );
  }

  unobserve() {
    return undefined;
  }

  disconnect() {
    return undefined;
  }
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
