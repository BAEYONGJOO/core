var resource = function(){
    var parent = arguments[arguments.length-1];
    var self = this;
    this.constructor = {
        name: 'resource',
        version: '0.001'
    };
    if(!this.__lookupGetter__('parent')){
        this.__defineGetter__('parent',function(){return parent;});
    }
    this.images = {
        '':{url: RESOURCE_PATH + '',image:null}
    };
    this.addEventListener('initialize',function(e){
        if(e.preventDefault)e.preventDefault();
        if(e.stopPropagation)e.stopPropagation();
        if(DEBUG){
            console.info(self.constructor.name,'initialize', e);
        }
    });
    return this;
};
resource.prototype.initialize = function(){
    //var html = document.querySelector('html');
    var docFrag = document.createDocumentFragment();
    docFrag.appendChild(document.createElementNS('http://www.w3.org/1999/xhtml', 'body'));
    console.info(document,document.documentElement);
    if(document.documentElement.querySelector('body')==null){
        document.documentElement.appendChild(docFrag);
    }
    if(URL.createObjectURL){
        var splash = new this.splashscreen();
        setTimeout(function(){ splash.close(); },10000);
    }
    else {

    }
    this.dispatchEvent('initialize',{detail:{}});
};
resource.prototype.splashscreen = function(){
    var self = this;
    var splash = document.createElement('div');
    splash.id = 'splashScreen';
    var canvas = document.createElement('canvas');
    splash.appendChild(canvas);
    splash.__proto__.close = function(){
        splash.remove();
    };
    var body = document.documentElement.querySelector('body');
    body.appendChild(splash);
    return splash;
};
resource.prototype.load = function(){

};
resource.prototype.addEventListener = function(evt, callback){
    var self = this;
    window.addEventListener( this.constructor.name + '.' + evt,function(e){
        // if(e.preventDefault)e.preventDefault();
        // if(e.stopPropagation)e.stopPropagation();
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
resource.prototype.removeEventListener = function(evt, callback){
    var self = this;
    window.removeEventListener(this.constructor.name + '.' + evt,function(){});
    return this;
};
resource.prototype.dispatchEvent = function(evt, detail) {
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