export default function create(Worker, options = {}) {
  let worker;
  let nextRequestId;
  let requests;

  function destroy() {
    if (worker) {
      worker.terminate();
      worker = undefined;
    }
  }

  function post(payload) {
    if (!worker) {
      nextRequestId = 0;
      requests = {};

      worker = new Worker();

      worker.addEventListener('error', options.onError);

      worker.addEventListener('message', (ev) => {
        const req = requests[ev.data.requestId];
        delete requests[ev.data.requestId];

        if (ev.data.error) {
          // error is proxied as it cannot be passed in posetMessage
          const proxyError = new Error(ev.data.error.message);
          proxyError.name = ev.data.error.name;
          proxyError.stack = ev.data.error.stack;
          req.reject(proxyError);
        }
        else {
          req.resolve(ev.data.payload);
        }

        if (Object.keys(requests).length === 0) {
          destroy();
        }
      });
    }

    return new Promise((resolve, reject) => {
      const requestId = nextRequestId++;
      requests[requestId] = { resolve, reject };
      worker.postMessage({ requestId, payload });
    });
  }

  return {
    post,
    destroy
  };
}
