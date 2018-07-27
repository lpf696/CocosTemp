// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const TestClass = require('TestClass')

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        player: {
            name:"游戏玩家",
            default: null,
            type: cc.Node
        },
        titleTxt: {
            default: null,
            type: cc.Label
        },
        logTxt: {
            default: null,
            type: cc.Label
        },
        iconB:{
            default: null,
            type: cc.Sprite
        },
        clickBtn : {
            default: null,
            type: cc.Sprite
        },
        bottle : {
            default: null,
            type: cc.Node
        },
        boxc : {
            default: null,
            type: cc.Node
        },


        tickCount : 0,
        testDate: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        //this.node 表示脚本的挂载点
        var iconA = this.node.getChildByName("sprite").getComponent(cc.Sprite);
        //label.string = "xeeeee";

        this.titleTxt.string = "this is title";

        this.player.x = 100;

        var self = this;

        
        //动态创建组件  创建node 挂载组件 设置parent
        var newNode = new cc.Node("newNode");
        
        var nodeSp = newNode.addComponent(cc.Sprite);
        newNode.parent = this.node;
        newNode.x = -300;
        newNode.y = 0;
        //加载资源  资源需要放到resources目录下
        cc.loader.loadRes("HelloWorld", cc.SpriteFrame, function(err, spriteFrame) {
            self.showLog("本地spriteframe加载完成");
            nodeSp.spriteFrame = spriteFrame;
        });

        //利用预设创建组件
        var prefabNode;

        //延时销毁组件
        // setTimeout(function() {
        //     prefabNode.destroy();
        // }.bind(this),5000);


        //定时器
        this.timeStart = new Date().getSeconds();
        this.intervalId = setInterval(function() {
            var durTime = new Date().getSeconds() - self.timeStart;
            if (durTime<=5) {
                if((5-durTime)==0) {
                    self.showLog("动态创建的预设已销毁");
                }
                else {
                    self.showLog((5-durTime)+"秒后销毁预设");
                }
            }
            else {
                self.showLog("移除定时器");
                clearInterval(self.intervalId);
            }
        }.bind(this),1000);
        

        //远程加成
        var pngUrl = "http://d.lanrentuku.com/down/png/1807/10shuguopng.jpg";
        cc.loader.load(pngUrl, function (err, texture) {
            self.showLog("远程资源加载完成");
            iconA.spriteFrame = new cc.SpriteFrame(texture);
        });

        //内部方法声明调用
        this.testLog();

        //module引用
        var Module = require("Module");

        Module.showLog();

        this.dtcount = 0;

        //外部类调用
        var classObj = new TestClass();
        cc.log(classObj.name);
        cc.log(classObj.paramA);
        TestClass.showMsg();
        classObj.showLog();

        cc.log("====================  start");

        //切换场景
        //cc.director.loadScene("MyScene");
        //设置组件常驻（切换场景不销毁）
        //cc.game.addPersistRootNode(myNode);
        //cc.game.removePersistRootNode(myNode);
        var visibleTag = false;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // cc.loader.loadRes("prefabBullet", cc.Prefab, function(err, prefab) {
                
            //     prefabNode = cc.instantiate(prefab);
            //     prefabNode.parent = self.node;
            //     prefabNode.y = -500;
                
            // });
            
            self.boxc.active  = true;
            self.setActive();
        })

        this.node.on("collect",function(event){
            cc.log("main colloect");
            self.titleTxt.string = "打中 "+event.getUserData()+" 次";
        })
    },

    setActive: function () {
        var self = this;
        setTimeout(function() {
            cc.log("xxx delay set active")
            self.boxc.active  = false;
        }.bind(this),1);
    },

    update (dt) {
        this.tickCount = this.tickCount  + 1; 
        this.player.rotation = this.player.rotation + 1;

        //cc.log("====================  update");
    },

    testLog () {
        cc.log("call function testLog");

        /////////////////////
        /*
        1、读取关卡配置
        2、初始化数据  子弹数目  分数统计  对象池初始化
        3、loadStage()  {1、清空画布、变量   2、绘制关卡}
        4、结束画面
        5、restart()
        */
    },

    onLoad () {
        cc.log("====================  onLoad");
    },

    onDestroy () {
        cc.log("====================  onDestroy");
    },

    showLog: function(logStr) {
        this.logTxt.string += ">"+logStr + "\n";
    }
});
