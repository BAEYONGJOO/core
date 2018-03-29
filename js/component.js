var component = function(){
    var parent = arguments[arguments.length-1];
    var self = this;
    this.constructor = {
        name: 'component'
    };
    if(!this.__lookupGetter__('parent')){
        this.__defineGetter__('parent',function(){return parent;});
    }
    return this;
};
