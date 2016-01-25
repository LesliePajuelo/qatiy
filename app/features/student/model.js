import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  github: DS.attr('string'),
  cohort: DS.attr('string'),
  remotePrep: DS.attr('string'),
  fulcrum: DS.attr('string'),
  interview: DS.attr('string'),
  date: DS.attr('date'),
});