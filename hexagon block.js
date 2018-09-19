ongetRadius:function(){
        this.radius = 0;
        this.radius1 = 0;
        this.radius2 = 0;
        var button = cc.instantiate(this.hexagonprefab);
        var item = button.getComponent('buttonitem');
        this.radius1 =  item.btn.node.height / 2;
        this.radius2 = Math.tan(30 * Math.PI / 180) * item.btn.node.width / 2;
        this.radius =  (this.radius1 + this.radius2) / Math.cos(30 * Math.PI / 180);
        this.radius3 = (this.radius1 + this.radius2) / Math.cos(60 * Math.PI / 180);
    },
onDisplayHexgon:function(){
    for(var i = 0; i < this.sprite_array.length; i++){
        var item = this.sprite_array[i];
        item.runAction(cc.sequence(cc.delayTime(0.1 * i),cc.callFunc(this.onAddChildHexgon,this), cc.fadeIn(1)));
    }
},
onAddChildHexgon:function(sender){
    this.node.addChild(sender);
},
    
    onLoad:function () {
        this.onCreateMapInfor();
        this.onCreateOutInfor();
        this.sprite_array = new Array();
        this.label_array = new Array();
        var angle = 0;
        var radius_angle = 30;
        this.ongetRadius();
        var pos_x = 0;
        var pos_y = 0;
        for(var i = 0; i < 7; i++){         /// first cycle
            var button = cc.instantiate(this.hexagonprefab); // hexagon prefab
            var item = button.getComponent('buttonitem');
            item.value ="" + this.map_array[i];
            item.label.string = "" + this.map_array[i];
            button.on('touchstart', function (event) {
                var node = event.target;
                var button = node.getComponent(cc.Button);
                this.onSpriteProcess(button);
              }, this);

            pos_x =  Math.sin(angle * Math.PI / 180) * (Math.floor(i / 7) + 1) * this.radius;
            pos_y =  Math.cos(angle * Math.PI / 180) * (Math.floor(i / 7) + 1) * this.radius;
            if( i > 0 ){
                var temitem = this.sprite_array[0].getComponent('buttonitem');
               pos_x = temitem.btn.node.position.x + pos_x;
               pos_y = temitem.btn.node.position.y + pos_y;
            }
            item.btn.node.setPosition(pos_x, pos_y);
            if(angle == 0){
                angle += 30;
            }
            else{
                angle += 60;
            }
            if(angle == 390)
                angle = 0;
            this.sprite_array[i] = button;
        }
        angle = 0;
        for( var i = 7; i < 19; i++){           /// second cycle
            var button = cc.instantiate(this.hexagonprefab); // hexagon prefab
            var item = button.getComponent('buttonitem');
            item.value ="" + this.map_array[i];
            item.label.string = "" + this.map_array[i];
            if(i == 7){
                var tempitem = this.sprite_array[0].getComponent('buttonitem');
                pos_x =  tempitem.btn.node.position.x + Math.sin(angle * Math.PI / 180) * 2 * (this.radius1 + this.radius2);
                pos_y =  tempitem.btn.node.position.y + Math.cos(angle * Math.PI / 180) * 2 * (this.radius1 + this.radius2);
            }
            else{
                var tempitem = this.sprite_array[0].getComponent('buttonitem');
                if( i % 2 == 0){
                    
                    pos_x =  tempitem.btn.node.position.x + Math.sin(angle * Math.PI / 180) * 2 * this.radius;
                    pos_y =  tempitem.btn.node.position.y + Math.cos(angle * Math.PI / 180) * 2 * this.radius;
                }
                else{
                    pos_x =  tempitem.btn.node.position.x + Math.sin(angle * Math.PI / 180) * this.radius3;
                    pos_y =  tempitem.btn.node.position.y + Math.cos(angle * Math.PI / 180) * this.radius3;
                }
            }
            angle += 30;
            item.btn.node.setPosition(pos_x, pos_y);
            this.sprite_array[i] = button;
        }
        this.onDisplayHexgon(); // display hexgon blocks
    },