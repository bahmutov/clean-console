# clean-console

Quickly loads a remote page using [phantomjs](http://phantomjs.org/)
to check if there are any JavaScript console errors.

[![NPM][clean-console-icon]][clean-console-url]

[![Build status][clean-console-ci-image]][clean-console-ci-url]
[![dependencies][clean-console-dependencies-image]][clean-console-dependencies-url]
[![devdependencies][clean-console-devdependencies-image]][clean-console-devdependencies-url]
[![endorse][endorse-image]][endorse-url]

## Install and use

    npm install -g clean-console
    // assumes phantomjs is installed
    clean-console -i <url>

***Note:*** only actual exceptions will be logged, failed `console.assert` statements ***DO NOT***
cause a true browser error (unlike nodejs).

A good pattern to unify nodejs/browser assertion handling
is to wrap assertions into helper method:

    function really(condition, message) {
        console.assert(condition, message); // stops nodejs execution
        if (!condition) {
            // stop execution in a browser
            throw new Error(condition.toString() + ' failed, ' + message);
        }
    }

## Small print

Author: Gleb Bahmutov &copy; 2013

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet / open issue on Github

[clean-console-icon]: https://nodei.co/npm/clean-console.png?downloads=true
[clean-console-url]: https://npmjs.org/package/clean-console
[clean-console-ci-image]: https://travis-ci.org/bahmutov/clean-console.png?branch=master
[clean-console-ci-url]: https://travis-ci.org/bahmutov/clean-console
[clean-console-dependencies-image]: https://david-dm.org/bahmutov/clean-console.png
[clean-console-dependencies-url]: https://david-dm.org/bahmutov/clean-console
[clean-console-devdependencies-image]: https://david-dm.org/bahmutov/clean-console/dev-status.png
[clean-console-devdependencies-url]: https://david-dm.org/bahmutov/clean-console#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
