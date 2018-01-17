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
    
    // Vanilla JS implementation of jQuery $.extend();
    function extend(){
        for(var i = 1; i < arguments.length; i++){
            for(var key in arguments[i]){
                if(arguments[i].hasOwnProperty(key)) { 
                    if (typeof arguments[0][key] === 'object' && typeof arguments[i][key] === 'object'){
                        extend(arguments[0][key], arguments[i][key]);
                    }      
                    else{
                        arguments[0][key] = arguments[i][key];
                    } 
                 }
            }    
        }
        return arguments[0];
    }
    
    return (function(){
        
        // Allow options with no callback
        if(typeof callback !== 'function' && !options){
            options = callback;
            callback = undefined;
        }
        
        // Handle options
        var settings = {
            before: '',
            after: '',
            replace: '',
            async: false
        };
        settings = extend(settings, options);
        
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
