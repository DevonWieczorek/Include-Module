# Include-Module
Replicates CSS's "@import" functionality for front-end JS

Similar to ES6's experimental "import" feature


@src - string, source of the script to 'include'
@callback - function, callback to be executed after the script is loaded

@options - JSON object
- @before - string, source of script to 'include' before
- @after - string, source of script to 'include' after
- @replace - string, script source or regex of source to replace with our new script
- @async - boolean, whether or not our new script should be async

Options should only include ONE of the three destination selectors (before, after, replace), 
otherwise the first argument is the one that is used.

Extend implementation found on https://jsfiddle.net/1vrkw1pc/

**NOTE: This is not a true implementation of the experimental 'import' function in ES6, we are not actually creating a reference to any objects that may be included in the script you are importing, and we do not choose which variables or objects to import. We are simply adding an external script to our page dynamically. 


### Basic Usage:
```javascript
if (deviceSize == 'mobile') include('mobile.js');
else include('web.js');
```

### Callbacks:
There is an optional callback that we can pass into our function to execute after our script has been successfully loaded.
This is a good place to put any code that may be dependant on the script you are importing.
```javascript
// We can pass in an existing function like this
include('script.js', callbackFunction());

// Or we can use an anonymous callback as our function
include('script.js', function(){
    console.log('loaded');
    // Execute dependant code here
});
```

### Options:
We can pass additional options into our function via a JSON object, such as whether the script we are importing should load asyncronously or not, whether we want to insert our script before or after a particular script that is in the header (this is handy for scripts that are dependant on other scripts), or whether we want to completely replace a script with our new one (for example, if we want to replace one version of jQuery with another).
```javascript
// Add our script with an asynchronous attribute (async is false by default)
include('script.js', {async: true});

// Add our script before a specified script
// If before, after, or remove are not specified, the script is appended to the bottom of the <head>
include('script.js', {after: 'scriptToAddAfter.js'});
include('script.js', {before: 'scriptToAddBefore.js'});
include('script.js', {replace: 'scriptToReplace.js'});

// Putting everything all together
include('script.js', function(){
    console.log('Script has been loaded before scriptToAddBefore.js successfully!');
},{
async: false, 
before: 'scriptToAddBefore.js'
});
```
