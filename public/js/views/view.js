function View(){

}

View.prototype = {
  addTower: function($tower){
    $("#game").append($tower);
  },
  removeTower: function(id){
    $("button"+id).remove();
  },
  addBullet: function($bullet){
    $("#game").append($bullet);
  }
};
