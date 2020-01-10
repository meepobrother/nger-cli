import { Analytics } from './api';

/**
 * Analytics implementation that does nothing.
 */
export class NoopAnalytics implements Analytics {
  event() {}
  screenview() {}
  pageview() {}
  timing() {}
  flush(): Promise<void> { return Promise.resolve(); }
}
