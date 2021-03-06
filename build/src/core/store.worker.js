import { actions } from './consts';
// create a web worker tailored for state management
export function createWorker(fn, initialState) {
    // create boilerplate worker
    // store default state
    // manages get state
    // assigns reducer
    var blob = new Blob([`
    self.state = ${JSON.stringify(initialState)};
    self.reducer = ${fn.toString()};
    self.onmessage = function (e) {
      if (e.data.type !== ${JSON.stringify(actions.GET_STATE)}) {
        self.state = self.reducer(self.state, e.data);
      }

      self.postMessage({
        type: e.data.type,
        data: self.state
      });
    }
  `], { type: 'text/javascript' });
    var url = URL.createObjectURL(blob);
    var worker = new Worker(url);
    // revoke the object url since we don't need it anymore
    URL.revokeObjectURL(url);
    return worker;
}
//# sourceMappingURL=store.worker.js.map