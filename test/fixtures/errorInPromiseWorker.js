import 'core-js/modules/es6.promise';
import onMessage from '../../onMessage';

onMessage(() => {
  return Promise.reject(new Error('REJECTED'));
});
