var pinyin = require('pinyin');
var _ = require('underscore');
var list = require('./city');
var fs = require('fs');

var results = [];

function getSortName(name) {
  return pinyin(name)[0][0].charAt(0).toLocaleUpperCase();
}

for (var i = 0; i < list.length; i++) {
  var item = list[i];
  for (var j = 0; j < item.city.length; j++) {
    var city = item.city[j];
    var cityName = city.name;
    var cityCounty = city.county;
    var obj = {};
    obj.province = item.name;
    obj.name = cityName;
    obj.sortName = getSortName(cityName);
    obj.area = [];
    for (var k = 0; k < cityCounty.length; k++) {
      var county = cityCounty[k];
      obj.area.push(county.name);
    }

    results.push(obj);
  }
}

fs.writeFile('city.json', JSON.stringify(results), 'utf8', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('ok');
  }
})

console.log(results);
