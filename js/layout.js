var layout = function(){
    var parent = arguments[arguments.length-1];
    var self = this;
    this.constructor = {
        name: 'layout'
    };
    if(!this.__lookupGetter__('parent')){
        this.__defineGetter__('parent',function(){return parent;});
    }
    this.__defineGetter__('width',function(){return document.documentElement.clientWidth;});
    this.__defineGetter__('height',function(){return document.documentElement.clientHeight;});
    this.addEventListener('initialize',function(e){
        if(DEBUG){
            console.info(self.constructor.name,'initialize', self.width, self.height, e);
        }
    });
    return this;
};

layout.prototype.initialize = function(){
    var header = new this.header();
    var main = new this.main();
    var footer = new this.footer();
    var docFrag = document.createDocumentFragment();

    docFrag.appendChild(header);
    docFrag.appendChild(main);
    docFrag.appendChild(footer);
    document.body.appendChild(docFrag);
    if(DEBUG){
        console.info('layout init',this);
    }
    this.dispatchEvent('initialize',{detail:{}});
};
layout.prototype.addEventListener = function(evt, callback){
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
layout.prototype.removeEventListener = function(evt, callback){
    var self = this;
    window.removeEventListener(this.constructor.name + '.' + evt,function(){});
    return this;
};
layout.prototype.dispatchEvent = function(evt, detail) {
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
layout.prototype.header = function(){
    var header = document.createElement('header');
    var title = document.createTextNode('header');
    header.appendChild(title);
    return header;
};
layout.prototype.main = function(){
    var main = document.createElement('main');
    var title = document.createTextNode('main');
    main.appendChild(title);
    return main;
};
layout.prototype.footer = function(){
    var footer = document.createElement('footer');
    var title = document.createTextNode('footer');
    footer.appendChild(title);
    return footer;
};