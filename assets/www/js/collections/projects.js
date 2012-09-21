define([
  'jQuery',
  'underscore',
  'backbone',

  'models/items'
], 
function($, _, Backbone, projectsModel){

  var projectsCollection = Backbone.Collection.extend({
    model: projectsModel,
    
    initialize: function(){

    }
  });
 
  return new projectsCollection;
});
