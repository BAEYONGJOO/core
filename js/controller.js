var controller = function(){
    var parent = arguments[arguments.length-1];
    var self = this;
    this.constructor = {
        name: 'controller',
        version: '0.001'
    };
    if(!this.__lookupGetter__('parent')){
        this.__defineGetter__('parent',function(){return parent;});
    }
    return this;
};

controller.prototype.initialize = function(){
    window.addEventListener('load',function(e){
        console.info(e);
        var bodys = document.documentElement.querySelectorAll('body');
        if(bodys.length>1){
            bodys[bodys.length - 1].remove();
        }
    });
}