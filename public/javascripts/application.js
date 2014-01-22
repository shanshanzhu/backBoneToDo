(function() {
  var app = {};


  //Backbone Code goes here
  Backbone.View.prototype.initialize.apply(this,arguments);
  /* add the above line the initialize function, 
  the initialize will run the original initialize function of backbone,
  instead of overwriting it.
  this is the pesudoclassical pattern of inheritance.

*/

// make a copy of model.attributes, rather than touching it
var context = {};
_.extend(context, this.model.attributes);

//compare above with
var context = this.model.attributes;










  //stub code to load templates//adapted from handleBar.
  app.loadTemplates = function() {
    window.templates = {};
    var $sources = $('script[type="text/template"]');
    $sources.each(function(index, el) {
      var $el = $(el);
      //$el.html() is the content of container.html, included 
      //in the last line of views/layout.jade
      templates[$el.data('name')] = _.template($el.html());
    });
  };

  app.init = function() {
    this.loadTemplates();
//will not load until dom load,
// so the initial template property of backbone View will not run
//
    //actually initialize our objects

  };


  //starts our app
  $(_.bind(app.init, app));
}).call(this);
