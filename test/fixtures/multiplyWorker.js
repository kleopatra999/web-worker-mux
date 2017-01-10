import 'core-js/modules/es6.promise';
import onMessage from '../../onMessage';

onMessage(({ a, b }) => {
  return Promise.resolve(a * b);
});
