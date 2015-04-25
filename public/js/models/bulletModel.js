// var Victor = require('victor');

function Bullet(towerPosition, direction, id) {
  this.id = id;
  this.size = 1;
  this.position = towerPosition.clone();
  this.direction = direction.clone().normalize();
  this.damage = 1;
  this.$div = {};

  setInterval(
    (function(self){
      return function(){self.updatePosition();}
    })(this),
   20);
}


Bullet.prototype.updatePosition = function() {
  this.position.add(this.direction.clone().normalize());
  this.setDivPosition();

};

Bullet.prototype.setDivPosition = function(){
  this.$div.css("top", this.position.y);
  this.$div.css("left", this.position.x);
}

Bullet.prototype.generateBullet = function(){

  var $div = $("<div class='bullet'><img class='ruby' src='./public/images/ruby.png'></div>").attr('id', "bullet"+this.id);
  this.$div = $div;
  this.setDivPosition();
  return $div;

}

