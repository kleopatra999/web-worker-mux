import MultiplyWorker from 'worker-loader!../fixtures/multiplyWorker';
import ErrorInPromiseWorker from 'worker-loader!../fixtures/errorInPromiseWorker';
import ErrorThrownInWorker from 'worker-loader!../fixtures/errorThrownInWorker';
import create from '../../';

describe('web-worker-mux', function() {
  let windowError;

  beforeEach(function() {
    windowError = jasmine.createSpy('window.onerror');
    window.onerror = (err) => windowError(err);
  });

  it('should multiply via the worker', function(done) {
    const worker = create(MultiplyWorker);
    Promise.all([
      worker.post({ a: 2, b: 2 }),
      worker.post({ a: 3, b: 2 }),
    ]).then(([r1, r2]) => {
      expect(r1).toBe(4);
      expect(r2).toBe(6);
      worker.destroy();
      done();
    });
  });

  it('should reject a worker-rejected error', function(done) {
    const worker = create(ErrorInPromiseWorker);
    worker.post()
    .then(() => {
      done.fail(new Error('should have rejected'));
    }, (error) => {
      expect(error.message).toMatch(/REJECTED/);
      worker.destroy();
      done();
    });
  });

  it('should pass worker-error to common onError', function(done) {
    const worker = create(ErrorThrownInWorker, {
      onError(error) {
        expect(error.message).toMatch(/THROWN/);
        worker.destroy();
        done();
      }
    });
    worker.post()
    .then(
      () => done.fail(new Error('expected onError and not resolved')),
      () => done.fail(new Error('expected onError and not rejected'))
    );
  });
});
