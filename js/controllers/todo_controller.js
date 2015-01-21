Todos.TodoController = Ember.ObjectController.extend({
  isEditing: false,

  // bufferedTitle: Ember.computed.oneWay('title'),

  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },

    // doneEditing: function() {
    //   var bufferedTitle = this.get('bufferedTitle').trim();

    //   if (Ember.isEmpty(bufferedTitle)) {
    //     Ember.run.debounce(this, 'removeTodo', 0);
    //   } else {
    //     var todo = this.get('model');
    //     todo.set('title', bufferedTitle);
    //     todo.save();
    //   }

    //   this.set('bufferedTitle', bufferedTitle);
    //   this.set('isEditing', false);
    // },

    acceptChanges: function() {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    },

    removeTodo: function() {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }
  },

  isCompleted: function(key, value) {
    var model = this.get('model');

    if (value === undefined) {
      return model.get('isCompleted');
    } else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')
});