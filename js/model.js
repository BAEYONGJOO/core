var model = function(){
    var parent = arguments[arguments.length-1];
    var self = this;
    this.data = {};
    this.__PROGRESS__ = [];
    this.constructor = {
        name: 'model',
        version: '0.001'
    };
    if(!this.__lookupGetter__('parent')){
        this.__defineGetter__('parent',function(){return parent;});
    }
    this.addEventListener('initialize',function(e){
        if(e.preventDefault)e.preventDefault();
        if(e.stopPropagation)e.stopPropagation();
        if(DEBUG){
            console.info(this.constructor.name,'initialize',e);
        }       
    });
    return this;
};
model.prototype.initialize = function(){

    this.dispatchEvent('initialize',{detail:{}});
};
model.prototype.addEventListener = function(evt, callback){
    var self = this;
    window.addEventListener(this.constructor.name + '.' + evt,function(e){
        if(e.preventDefault)e.preventDefault();
        if(e.stopPropagation)e.stopPropagation();
        e.__proto__.__defineGetter__('currentTarget',function(){return self;});
        e.__proto__.__defineGetter__('path',function(){return [self];});
        e.__proto__.__defineGetter__('srcElement',function(){return self;});
        e.__proto__.__defineGetter__('target',function(){return self;});
        if(typeof callback == 'function'){
            callback.call(this,e);
        }
    });
    return this;
};
model.prototype.removeEventListener = function(evt, callback){
    var self = this;
    window.removeEventListener(this.constructor.name + '.' + evt,function(){});
    return this;
};
model.prototype.dispatchEvent = function(evt, detail) {
    var event;
    if(typeof detail != 'undefined'){
        event = new CustomEvent(this.constructor.name + '.' + evt, detail);
    }
    else {
        event = new CustomEvent(this.constructor.name + '.' + evt);
    }
    window.dispatchEvent(event);

    return this;
};
model.prototype.load = function(){

};