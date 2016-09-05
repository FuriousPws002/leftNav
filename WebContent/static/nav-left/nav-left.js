/**
 * jQuery扩展侧边导航栏
 */
$.fn.extend({
    /**
     * 创建一级菜单
     * @param fir   一级菜单集合(为一数组)
     * @param width 菜单栏宽带(px)
     */
    createLeftNavFir:function (fir,width) {
        width=width || '150px';
        isNullOrArray(fir);
        var $n='';
        var _selector=$(this).selector;
        $(_selector).css({"width":width,"height":"300px"});
        for(var i=0;i<fir.length;i++){
            $n=$("<div id=leftNav"+i+" class='nav-left-first'>"+fir[i]+"<span class='icon-chevron-right pull-right fir-jiantou-align'></span></div>");
            $n.appendTo($(_selector));
        }
    },
    /**
     * 在指定一级菜单下创建二级菜单
     * @param fir   一级菜单名称
     * @param sec   二级菜单集合(为一数组)
     */
    createLeftNavSec:function (fir,sec) {
        if(fir==null) throw new Error("element is null");
        isNullOrArray(sec);
        $.each($(".nav-left-first"),function () {
            if(fir==$(this).text()){
                var $sn='';
                var c=$(this).attr("id")+'-sec-container';
                var $secContainer=$("<div class="+c+"></div>");
                for(var i=0;i<sec.length;i++){
                    $sn=$("<div id="+$(this).attr('id')+i+" class='nav-left-sec'>"+sec[i]+"<span class='icon-chevron-right pull-right sec-jiantou-align'></span></div>");
                    $sn.appendTo($secContainer);
                }
                $(this).after($secContainer);
            }
        });
    },
    /**
     * 在指定一级菜单的二级菜单下创建三级菜单
     * @param fir   指定一级菜单
     * @param sec   指定一级菜单下的二级菜单
     * @param thr   三级菜单集合(为一数组)
     */
    createLeftNavThr:function (fir,sec,thr) {
        if(fir==null || sec==null) throw new Error("element is null");
        isNullOrArray(thr);
        $(".nav-left-first").each(function () {
            if(fir==$(this).text()){
                var $secList=$(this).next().children();
                $.each($secList,function () {
                    var c=$(this).attr("id")+'-thr-container';
                    if(sec==$(this).text()){
                        var $thrContainer=$("<div class="+c+"></div>");
                        for(var i=0;i<thr.length;i++){
                            var $tn=$("<div id="+$(this).attr('id')+i+" class='nav-left-thr'>"+thr[i]+"<span class='icon-chevron-right pull-right thr-jiantou-align'></span></div>");
                            $tn.appendTo($thrContainer);
                        }
                        $(this).after($thrContainer);
                    }
                })
            }
        })
    },
    /**
     * 若只有二级菜单，则用如下函数初始化
     */
    initFirSec:function () {
        initChildNavClick("nav-left-first","sec-container");
    },
    /**
     * 若存在三级菜单，则用如下函数初始化
     */
    initLeftNav:function () {
        initChildNavClick("nav-left-first","sec-container");
        initChildNavClick("nav-left-sec","thr-container");
    }
});

/**
 * 判断是否为空和是否是数组
 * @param ele
 */
function isNullOrArray(ele) {
    if(ele==null) throw new Error("element is null");
    if(!ele instanceof Array) throw new Error("element is not a array");
}

/**
 * 初始化有子导航栏的点击事件
 * @param level     菜单级别
 * @param container 对应菜单级别下的子菜单集合
 */
function initChildNavClick(level,container) {
    $.each($("."+level),function () {
        var c=$(this).attr("id")+"-"+container;
        if($(this).next().hasClass(c)){
            $("."+c).hide();
            var bool=true;
            $(this).click(function (event) {
                if(bool){
                    $(this).find("span").removeClass("icon-chevron-right").addClass("icon-chevron-down");
                    $("."+c).show();
                    bool=false;
                }else{
                    $(this).find("span").removeClass("icon-chevron-down").addClass("icon-chevron-right");
                    $("."+c).hide();
                    bool=true;
                }
                event.stopPropagation();
            })
        }
    })
}