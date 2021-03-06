import Ember from 'ember';
export default Ember.Component.extend({

  i18n: Ember.inject.service(),

  racePickerKmVisible : false,
  racePickerMiVisible : false,
  racePickerMVisible : false,

  races : Ember.inject.service('race'),

  isTouchDevice : Ember.computed(function(){
    return 'ontouchstart' in document.documentElement;
  }),

  tooltipLengthKm : Ember.computed("run.lengthKm", "i18n.locale", function(){
    return this.get("run.lengthKm").round(5).toString().replace(".", this.get('i18n').t("metrics.separator"))+" "+this.get('i18n').t("metrics.distance.km");
  }),

  tooltipLengthMi : Ember.computed("run.lengthMi", "i18n.locale", function(){
    return this.get("run.lengthMi").round(5).toString().replace(".", this.get('i18n').t("metrics.separator"))+" "+this.get('i18n').t("metrics.distance.mi");
  }),

  tooltipLengthM : Ember.computed("run.lengthM", "i18n.locale", function(){
    return this.get("run.lengthM").round(5).toString().replace(".", this.get('i18n').t("metrics.separator"))+" "+this.get('i18n').t("metrics.distance.m");
  }),

  racePickerKmVisibleClass: Ember.computed('racePickerKmVisible', 'isTouchDevice', function () {
    return this.get("racePickerKmVisible") === true || this.get("isTouchDevice") === true ? "suggestSelectVisible" : "suggestSelectInvisible";
  }),

  racePickerMiVisibleClass: Ember.computed('racePickerMiVisible', 'isTouchDevice', function () {
    return this.get("racePickerMiVisible") === true || this.get("isTouchDevice") === true ? "suggestSelectVisible" : "suggestSelectInvisible";
  }),

  racePickerMVisibleClass: Ember.computed('racePickerMVisible', 'isTouchDevice', function () {
    return this.get("racePickerMVisible") === true || this.get("isTouchDevice") === true ? "suggestSelectVisible" : "suggestSelectInvisible";
  }),

  expertModeClass : Ember.computed("expertMode", function(){
    return this.get("expertMode") === true ? "" : "uk-width-medium-3-5";
  }),

  actions: {
    setRace: function(race) {
      if(race !== null){
        this.get("run").set("lengthM",race.lengthM);
      }
    }
  }
});
