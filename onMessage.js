export default function onMessage(func) {
  addEventListener('message', ({ data: { requestId, payload } }) => {
    func(payload)
    .then(payload => postMessage({ requestId, payload }))
    .catch(error =>  postMessage({ requestId, error: {
      // must expand error, as it can't be cloned with workers
      name: error.name,
      message: error.message,
      stack: error.stack
    } }));
  });
}
