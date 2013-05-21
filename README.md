# clean-console

Quickly loads a remote page using [phantomjs](http://phantomjs.org/)
to check if there are any JavaScript console errors.

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