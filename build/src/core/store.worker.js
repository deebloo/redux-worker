"use strict";
var actions_1 = require('./actions');
// create a web worker tailored for state management
function createWorker(fn, initialState) {
    // create boilerplate worker
    // store default state
    // manages get state
    // assigns reducer
    var blob = new Blob([("\n    self.state = " + JSON.stringify(initialState) + ";\n\n    self.reducer = " + fn.toString() + ";\n\n    self.onmessage = function (e) {\n      if (e.data.type !== " + JSON.stringify(actions_1.actions.GET_STATE) + ") {\n        self.state = self.reducer(self.state, e.data);\n      }\n\n      self.postMessage({\n        type: e.data.type,\n        data: self.state\n      });\n    }\n  ")], { type: 'text/javascript' });
    var url = URL.createObjectURL(blob);
    var worker = new Worker(url);
    URL.revokeObjectURL(url);
    return worker;
}
exports.createWorker = createWorker;
