console.log('this is node test');

const testVar = 100;
function test() {
    console.log(testVar)
}

module.exports.testVar = testVar;
module.exports.testFn = test;