(function() {
  var app = {};

  //stub code to load templates
  //adapted from handleBar.//
  app.loadTemplates = function() {
    window.templates = {};
    var $sources = $('script[type="text/template"]');
    $sources.each(function(index, el) {
      var $el = $(el);
      //$el.html() is the content of container.html,
      //if data-name = 'container'
      templates[$el.data('name')] = _.template($el.html());
    });
  };
  app.loadTemplates();

  //////////Backbone js code///////


  var AddToDoView = Backbone.View.extend({

    template: templates['addTodo'],

    events: {
      "submit": "onSubmit"
    },

    onSubmit: function(e) {
      e.preventDefault();
      var descp = this.$('.todo-input').val();
      this.collection.add([{description: descp, done: false}]);
      this.$('.todo-input').val('');
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  var toDo = Backbone.Model.extend({
    
  });
  
  var ToDoList = Backbone.Collection.extend({
    
    Model: toDo,

  });

  var toDoItemView = Backbone.View.extend({

    template: templates['todo'],

    initialize: function() {

    },

    events: {
      'click .cross ': 'onDelete',
      'click :checkbox': 'changeDone'
    },

    changeDone: function() {
      var done = this.model.get('done');
      this.model.set('done', !done);
      this.render();
    },

    onDelete:function() {
      this.model.destroy();
      this.$el.html('');//necessary?
      // this.model.collection.remove(this.model);
    },

    render: function() {
      var content = this.template(this.model.attributes);
      this.$el.html(content);
      return this;
    }
  });

  var ToDoListView = Backbone.View.extend({

    initialize:function(){
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.renderOne, this);
    },

    render: function() {
      this.collection.each(function(item) {
        this.renderOne(item);
      });
      return this;
    },

    renderOne: function(item) {
      var itemEl = new toDoItemView({model:item})
      this.$el.append(itemEl.render().el);
    }
  });

  var appView = Backbone.View.extend({

    template: templates['container'],

    initialize: function() {
      this.$el.html(this.template());
      var toDoList = new ToDoList();
      var addTodo = new AddToDoView({
        collection: toDoList,
        el: this.$('.inputForm')
      });
      var toDoListView = new ToDoListView({
        collection: toDoList,
        el: this.$('.todos')
      });
      addTodo.render();
      toDoListView.render();
    }
  });

/*
  //Backbone Code goes here
  Backbone.View.prototype.initialize.apply(this,arguments);
  /* add the above line the initialize function, 
  the initialize will run the original initialize function of backbone,
  instead of overwriting it.
  this is the pesudoclassical pattern of inheritance.

*/
/*
// make a copy of model.attributes, rather than touching it
var context = {};
_.extend(context, this.model.attributes);

//compare above with
var context = this.model.attributes;


*/

  //starts our app

  $(document).ready(function() {
    var app = new appView();
    $('body').append(app.el);
  });

  // $(_.bind(app.init, app));


}).call(this);
