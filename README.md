# Web Worker Mux [![Build Status](https://img.shields.io/travis/behance/web-worker-mux.svg)](http://travis-ci.org/behance/web-worker-mux)

Allows many clients to send messages to a single web worker and only get their own responses.


### Usage

Outside of worker (assuming the use of [webpack/worker-loader](https://github.com/webpack/worker-loader)):
```js
import Worker from 'worker-loader!./worker';
import create from 'web-worker-mux';

const worker = create(Worker, {
  // optional
  onError(error) {
    console.error('[web-worker] error', error);
  }
});

export default function multiply(a, b) {
  return worker.post({ a, b });
}
```

Inside the `./worker` code:
```js
import onMessage from 'web-worker-mux/onMessage';

onMessage(({ a, b }) => {
  return Promise.resolve(a * b);
});
```


### Assumptions

Your client code must bring its own `Promise` polyfill, if needed (aka BYOP?).


## License

[Apache-2.0](/LICENSE)
