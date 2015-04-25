function BulletController(){
  this.idCount = 0;
}

BulletController.prototype = {
  shootBullet: function(sourceLocation, targetLocation){
    var model = new Bullet(sourceLocation, targetLocation, this.idCount++);
    $bulletElement  = model.generateBullet();
    view.addBullet($bulletElement);
    return model;
  }
}
