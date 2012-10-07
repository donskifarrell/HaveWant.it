define([
  'jQuery',
  'underscore',
  'backbone',

  'models/item'
], 
function($, _, Backbone, itemModel){

  var itemCollection = Backbone.Collection.extend({
    model: itemModel,
    
    initialize: function(){

    }
  });
 
  return new itemCollection;
});
