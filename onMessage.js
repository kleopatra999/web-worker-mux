export default function onMessage(func) {
  addEventListener('message', ({ data: { requestId, payload } }) => {
    func(payload)
    .then(payload => postMessage({ requestId, payload }))
    // must expand error, as it can't be cloned with workers
    .catch(({ name, message, stack })=>  postMessage({
      requestId,
      error: {
        name,
        message,
        stack
      }
    }));
  });
}
