import Ember from 'ember';
export default Ember.Component.extend({
  tagName: "input",
  classNameBindings: ["class"],
  attributeBindings: ['value', 'type', 'autocomplete'],
  type: "tel", // inputs with the type "tel" have the advantage of only allowing numeric values without showing spin buttons as the "number" input does
  autocomplete: "off",

  input(event) {
    var newValue = event.target.value;
    var cursorPosition = event.target.selectionStart; // cursor position starts with 1
    // if the inputs new value would exceed the allowed maxlength
    if(newValue.length > parseInt(this.get("maxlength"))){
      var newValueArr = newValue.split('');
      var spaceLeft = parseInt(this.get("maxlength"))-cursorPosition; // defines how many positions the curser has left before exceeding the max value
      var offset = spaceLeft < 0 ? spaceLeft-1 : 0; // use spaceLeft to calculate the offset for the splice function
      newValueArr.splice(cursorPosition+offset, 1); // extract the part of the old value that, should be overwritten by the new value
      newValueArr.splice(parseInt(this.get("maxlength"))); // make sure not to exceed the maxlength (fe. if someone pastes multiple characters at once)
      newValue = newValueArr.join('');
    }
    this.set("value", parseInt(newValue));
    return true;
  },

  keyDown(event) {
    switch(event.keyCode) {
      case 38:
        event.preventDefault();
        this.send('increaseValue');
        break;
      case 40:
        event.preventDefault();
        this.send('decreaseValue');
        break;
    }
    return true;
  },

  actions: {
    increaseValue() {
      this.set("value", parseInt(this.get("value"))+1);
    },

    decreaseValue() {
      this.set("value", parseInt(this.get("value"))-1);
    }
  }
});
