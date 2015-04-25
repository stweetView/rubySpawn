function View(){

}

View.prototype = {
  addBullet: function($bullet){
    $("#game").append($bullet);
  },

  removeBullet: function(id){
    $("bullet"+id).remove();
  }
};
