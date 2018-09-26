
(function () {
    let utils = (function(){
        function getCss(ele,attr){
            let value = window.getComputedStyle(ele)[attr];
            var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem|%)?$/i;
            if(reg.test(value)){
                value =parseFloat(value)
            }
            return value
        }
        function setCss(ele,attr,value){
            var reg = /^(width|height|fontSize|(margin|padding)|(margin|padding)?(left|top|bottom|right))$/i;
            if(reg.test(attr)){
                /px/.test(value.toString())?null:value+='px';
            }
            ele.style[attr]=value
        }

        function setGroupCss(ele,obj={}){
            if(Object.prototype.toString.call(obj)==='[object Object]'){
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        setCss(ele,key,obj[key])
                    }
                }
            }
        }

        function css(...arg){
            if(arg.length===3){
                setCss(...arg)
            }else if(arg.length===2){
                if(arg[1] instanceof Object){
                    setGroupCss(...arg)
                }else{
                    return getCss(...arg)
                }
            }
        }
        return {css:css}
    })()


    let linear = function (timg,duration,change,begin) {
        return timg/duration*change+begin
    };

    function animate(ele,target={},duration,callback) {
        if(typeof duration ==='function'){
            callback = duration;
            duration = 2000;
        }
        let change={},timer=0,begin={};
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key]-begin[key]
        }
        clearInterval(ele.timer);
        ele.timer = setInterval(()=>{
            timer+=17;
            if(timer>=duration){
                clearInterval(ele.timer);
                utils.css(ele,target);
                callback && callback.call(ele);
                return
            }
            for(var key in change){
                var cur = linear(timer,duration,change[key],begin[key]);
                utils.css(ele,key,cur)
            }
        },17)
    }

    window.animate=animate;
    window.utils=utils;
})();