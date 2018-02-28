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
if(deviceSize == 'mobile') include('mobile.js');
else include('web.js');
```
