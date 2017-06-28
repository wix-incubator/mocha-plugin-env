# ![Mocha](http://mochajs.org/favicon.ico "Mocha") mocha-plugin-env

[![Greenkeeper badge](https://badges.greenkeeper.io/wix/mocha-plugin-env.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/wix/mocha-plugin-env.svg?branch=master)](https://travis-ci.org/wix/mocha-plugin-env)


A [mocha](https://github.com/mochajs/mocha) plugin to opt out of specific tests in specific cases. 

## Installation
* `npm install --save-dev mocha-plugin-env`
* just add `-r mocha-plugin-env/register` in your mocha loader or command line npm script in `package.json`
```json
{
  "scripts" : {
    "test:nodejs": "mocha -r mocha-plugin-env/register",
    "test:browser": "webpack --module-bind mocha-plugin-env/register --module-bind 'mocha-loader!./test'"
  }
}
```

## Example Usage
```javascript

function inBrowser(){ 
	return (typeof window !== 'undefined'); 
}

describe('sometest', function () {
    
	it.assuming(!inBrowser(), 'not in browser')('will never run in browser', () => {
        require('fs').existsSync(require('path').join('..', 'dataFile.txt'));
    });
	
    it.assuming(inBrowser())('will only run in browser', () => {
        window.document.body.innerHTML('hi');
    });
    
    describe.if(inBrowser(), 'only in browser')('will only run in browser', () => {
        it('will only run in browser', function (done) {
            setTimeout(done, 2000);
            console.log('All good');
        });
    });
});
```

## How It Works

The module monkey patches Mocha's global `describe`, `it`, `xdescribe`, `xit` to enable the extra verb. Inspired by [mocha-plugin-highland](https://github.com/robertstettner/mocha-plugin-highland).

## Extras
The module also exports an `inBrowser` to save time writing your own, and `globalObject`, the global context of the current execution environment (window or global).

## License

MIT

## developer documentation
how to build and test:
 - clone the repository
 - in the cloned folder, run `yarn`
 - run `yarn test` to build and test the code in both nodejs and browser

how to debug (browser):
 - run `yarn start` to run a development server
 - open `http://localhost:8080/webtest.bundle` to run live tests that will update while you change the source code
