#!/usr/bin/env node
var fs  = require('fs');
var path = require('path');
var _ = require('lodash');
var expandType = require("./expandType")

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}

convert = function (name, label) {
  contacts = [];
  var filePath = path.join(__dirname, `../assets/${name}.txt`);
  var text = fs.readFileSync(filePath, {encoding: 'utf-8'});
  var lines = text.split('\n');
  _.each(lines, function(line) {
    var parts = line.split(' ');
    if (parts.length < 4)
      return;
    var contact = {};
    var number = Number(parts[0]);
    contact.entryName = `${label} ${pad(number, 2)}`;
    contact.entryType = "Escort";
    contact.type = expandType(parts[parts.length-2]);
    contact.name = parts.slice(1, parts.length-2).join(' ');
    contact.tonnage = Number(_.last(parts));
    contacts.push(contact);

    //console.log(contact);
  });

  json = JSON.stringify(contacts, null, 2);
  fileName = `${name}.json`;
  var filePath = path.join(__dirname, `../src/data/${fileName}`);
  fs.writeFileSync(filePath, json);
}

convert("capitalEscorts-earlyWar", "Early War Capital Ship Escort");
convert("capitalEscorts-lateWar", "Late War Capital Ship Escort");
convert("merchantEscorts-earlyWar", "Early War Merchant Ship/Convoy Escort");
convert("merchantEscorts-lateWar", "Late War Merchant Ship/Convoy Escort");
