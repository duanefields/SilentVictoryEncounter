#!/usr/bin/env node
var fs  = require('fs');
var path = require('path');
var _ = require('lodash');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

var filePath = path.join(__dirname, "../assets/vassal.xml");
var xml = fs.readFileSync(filePath, {encoding: 'utf-8'});

var doc = new dom().parseFromString(xml);

var cardSlots = xpath.select("//VASSAL.build.widget.CardSlot", doc);
var contacts = [];
_.each(cardSlots, function(cardSlot) {
  var contact = {};
  contact.entryName = cardSlot.getAttribute("entryName");
  parts = cardSlot.textContent.split(';');

  if (contact.entryName.match(/^(Warship|Capital Ship)/)) {
    details = parts[33].split('\t');
    contact.entryType = contract.entryName.match(/^Warship/) ? "Warship" : "Capital Ship";
    var typeParts = details[2].replace(/\\/g, '').split(' ')
    if (typeParts.length === 1) {
      contact.type = "SS"
      contact.name = typeParts[0];
    } else {
      contact.type = typeParts[0];
      contact.name = typeParts.slice(1).join(' ');
    }
    contact.tonnage = Number(details[3].replace(/\\/g, ''));
  } else if (contact.entryName.match(/^(Small|Large)/)) {
    details = parts[25].split('\t');
    contact.entryType = "Freighter";
    contact.type = parts[1].replace(/\s+label$/, '');
    contact.name = details[1].replace(/\\/g, '');
    contact.tonnage = Number(details[2].replace(/\\/g, ''));
  } else {
    return;
  }

  contacts.push(contact);
  //console.log(JSON.stringify(contact));
});

write (contacts, entryType) {
  records = _.filter(contacts, {entryType});
  json = JSON.stringify(records, null, 2);
  fileName = `${entryType.toLowerCase().replace(/\s/g, '')}s.json`;
  var filePath = path.join(__dirname, `../data/${fileName}`);
  fs.writeFileSync(filePath, json);
}

write(contacts, "Warship");
write(contacts, "Capital Ship");
write(contacts, "Freighter");
