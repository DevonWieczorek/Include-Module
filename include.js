// Try to replicate node's 'include' functionality for front-end JS
// @src - string, source of the script to 'include'
// @callback - function, callback to be executed after the script is loaded
// @options - JSON object
//          - @before - string, script to 'include' before
//          - @after - string, script to 'include' after
//          - @replace - string, script to replace with our new script
//          - @async - boolean, whether or not our new script should be async
// The include function only accepts before, after, or replace
// If multiple are present, the first one takes precedence

function include(src, callback, options){
    function appendHead(s){
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    
    function replaceScript(target, replacement, async){
        var scripts = document.getElementsByTagName("script");
        for(var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.match(target)) {
                scripts[i].src = replacement;
                if(async) scripts[i].async = true;
                break;
            }
        }
    }
    
    return (function(){
        
        // Allow options with no callback
        if(typeof callback !== 'function' && !options){
            options = callback;
            callback = undefined;
        }
        
        // Handle options
        var settings = $.extend({
            before: '',
            after: '',
            replace: '',
            async: false
        }, options);
        
        // Create our script tag
        var s = document.createElement('script');
        s.setAttribute('src', src);
        if(settings.async) s.async = true;
        
        // Handle callback
        if(callback) s.addEventListener('load', callback);
        
        // Handle different insertion cases
        if(settings.replace){
            replaceScript(settings.replace, src, settings.async);
        }
        else if(settings.before){
            var target = document.querySelector('[src="' + settings.before + '"]');
            var parent = target.parentNode;
            parent.insertBefore(s, target);
        }
        else if(settings.after){
            var target = document.querySelector('[src="' + settings.after + '"]');
            var parent = target.parentNode;
            parent.insertBefore(s, target.nextSibling);
        }
        else{
            appendHead(s);
        }
    }());
}
