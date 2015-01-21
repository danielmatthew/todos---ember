Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      // Get todo title text set by new todo text input
      var title = this.get('newTitle');
      if (!title.trim()) {
        return; 
      }

      // Create new todo medal
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear new todo text
      this.set('newTitle', '');

      todo.save();
    }
  },

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');

    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')
});