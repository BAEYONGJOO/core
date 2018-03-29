
(function(){
    var _z = console;
    Object.defineProperty( window, "console", {
        get : function(){
            if( _z._commandLineAPI ){
            throw "Sorry, Can't execute scripts!";
                    }
            return _z; 
        },
        set : function(val){
            _z = val;
        }
    });
    /*****************************************
     * Window Extension Or Polyfill
    ******************************************/
    if(!this.hasOwnProperty('requestAnimationFrame')) {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            this.requestAnimationFrame = this[vendors[x]+'RequestAnimationFrame'];
            this.cancelAnimationFrame = this[vendors[x]+'CancelAnimationFrame'] || this[vendors[x]+'CancelRequestAnimationFrame'];
        }
        
        if (!this.requestAnimationFrame)
            this.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = W.setTimeout(function() { callback(currTime + timeToCall); }, 
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        
        if (!this.cancelAnimationFrame)
            this.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };

            
    } 
    if(!this.hasOwnProperty('URL')){
        this.URL = this.webkitURL || this.MozURL;
    }
    if(!this.hasOwnProperty('CSSMatrix')){
        this.CSSMatrix = this.WebKitCSSMatrix || this.MozCSSMatrix;
    }
    if(!this.hasOwnProperty('MutationObserver')){
        this.MutationObserver = this.WebKitMutationObserver || this.MozMutationObserver;
    }
    try {
        var ce = new window.CustomEvent('test');
        ce.preventDefault();
        if (ce.defaultPrevented !== true) {
            throw new Error('Could not prevent default');
        }
    } catch(e) {
      var CustomEvent = function(event, params) {
        var evt, origPrevent;
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
    
        evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        origPrevent = evt.preventDefault;
        evt.preventDefault = function () {
          origPrevent.call(this);
          try {
            Object.defineProperty(this, 'defaultPrevented', {
              get: function () {
                return true;
              }
            });
          } catch(e) {
            this.defaultPrevented = true;
          }
        };
        return evt;
      };
    
      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent; // expose definition to window
    }

    
    /*****************************************
     * Array Extension
    ******************************************/
    if( !Array.hasOwnProperty('trim')) {
        Array.prototype.trim = function() {
            return this.filter(function(o,i,a){
                return !(o === undefined || o === null || o === '' );
            });
        };
    }
    if( !Array.hasOwnProperty('unique')) {
        Array.prototype.unique = function() {
            return this.filter(function(o,i,a){
                return a[iO](o) === i;
            });
        };
    }
    if( !Array.hasOwnProperty('replace')) {
		Array.prototype.replace = function(b, c) {
			if(b){
				if(!Array.isArray(b)){
					return this.map(function(v, i ,a){
						if(b !== v){
							return v;
						}
						else {
							return c;
						}
					});					
				}
				else {
					return this.map(function(v, i ,a){
						if(~b[iO](v)){
							return v;
						}
						else {
							return c;
						}
					});
				}

			}
			else return this;
		};
    }
    /*****************************************
     * String Extension
    ******************************************/    
    if( !String.hasOwnProperty('contains')) {
		String.prototype.contains = function(a) {
			var b = this.trim().spilt(' ').trim();
			return ~b.contains(a);
		};
	}
	if( !String.hasOwnProperty('capitalize')) {
		String.prototype.capitalize = function() {
			return this[cA](0).toUpperCase() + this.slice(1);
		};
    }
    /*****************************************
     * JSON Extension
    ******************************************/  
    if(typeof JSON.isEquals == 'undefined'){  
        JSON.isEquals = function (_,x) {
            var p;
            for (p in _) {
                if (typeof (x[p]) == 'undefined') {
                    return false;
                }
            }
        
            for (p in _) {
                if (_[p]) {
                    switch (typeof (_[p])) {
                        case 'object':
                            if (!JSON.isEquals(_[p],x[p])) {
                                return false;
                            }
                            break;
                        case 'function':
                            if (typeof (x[p]) == 'undefined' ||
                                (p != 'equals' && _[p].toString() != _[p].toString()))
                                return false;
                            break;
                        default:
                            if (_[p] != x[p]) {
                                return false;
                            }
                    }
                } else {
                    if (x[p])
                        return false;
                }
            }
        
            for (p in x) {
                if (typeof (_[p]) == 'undefined') {
                    return false;
                }
            }
        
            return true;
        };
    }
    if(typeof JSON.flatten == 'undefined'){
        JSON.flatten = function (obj) {
            var flatObj = {};
          
            function makeFlat(obj, path) {
                if(typeof obj == 'object') {
                    var keys = Object.keys(obj);
                    if (keys.length>0) {
                        var isChild = false;
                        keys.forEach(function (key) {
                            makeFlat(obj[key], (path ? path + "." : path) + key);
                            if(typeof flatObj[(path ? path + "." : path) + key] != 'undefined') {
                                isChild = true;
                            }
                        });
                        if(path!='' && isChild){
                            flatObj[path] = obj;
                        }
                    } else {
                        //flatObj[path] = obj;
                    }
                }
                else {
                    flatObj[path] = obj;
                }
            }
            makeFlat(obj, "");
            return flatObj;
        };
    }
    /*****************************************
     * Element Extension
    ******************************************/    
    Element.prototype.addClass = function(name){
        var self = this;
        var names = name.replace(/ /gi,',').split(',');
        names.map(function(d){
            if(!self.classList.contains(d)){
                self.classList.add(d);
            }
        });
        return self;
    };
    Element.prototype.removeClass = function(name){
        var self = this;
        var names = name.replace(/ /gi,',').split(',');
        names.map(function(d){
            if(self.classList.contains(d)){
                self.classList.remove(d);
            }
        });
        if(self.classList.length == 0){
            self.removeAttribute('class');
        }
        return self;
    };
    Element.prototype.hasClass = function(name){
        return this.classList.contains(name);
    };
    if (!Element.prototype.remove) {
        Element.prototype.remove = function remove() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
    if(!Element.prototype.trigger){
        Element.prototype.trigger = function(name, detail){
            var self = this;
            var names = name.replace(/ /gi,',').split(',');
            if(typeof detail == 'undefined'){
                names.map(function(d){
                    var evt = new CustomEvent(d);
                    self.dispatchEvent(evt);
                });
            }
            else {
                names.map(function(d){
                    var evt = new CustomEvent(d, detail);
                    self.dispatchEvent(evt);
                });        
            }
            return self;
        }
    }
    /*****************************************
     * Core Extension Framework
    ******************************************/    
    
    var core = function(){
        var queue = [];
        
        return this;
    };
    core.prototype.module = function(name, module){
        this.constructor = {
            name: 'core'
        };
        this[name] = new module(this);
        if(typeof this[name].initialize == 'function'){
            this[name].initialize();
        }

        return this;
    };
    core.prototype.run = function(){

    };
    var Core = new core();
    Core
    .module('resource',resource)
    .module('component',component)
    .module('layout',layout)
    .module('model',model)
    .module('controller',controller)
    ;
    if(DEBUG){
        console.info(Core);
    }
})();


