var TestClass = cc.Class({
    name: "TestClass",
    
    cotr: function () {
        this.testParam = 0;
    },

    properties: {
        paramA: "paramA",
    },

    statics:{
        showMsg: function () {
            cc.log("this is msg from TestClass")
        },
    },   
    
    showLog: function() {
        cc.log("this is log from TestClass")
    }
})