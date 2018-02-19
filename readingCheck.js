module.exports.getSomeData = () =>
{
let google = require('googleapis');
let authentication = require("./authentication");


function getData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1_lodhrWpyuJSvJRi4MNyw8k7W7hSBKrXS7ukBVE4cI0',
    range: 'Class Data!A2:K',
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {

      var itemDetails = [{
        title: 's89',
        age:   'str2'
      }];
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log(row.join(", "));
        itemDetails.push({
          title: row[0],
          age:   row[1]
        })
        module.exports.itemDetails = itemDetails;
      }
    }
  });
}


authentication.authenticate().then((auth)=>{
    getData(auth);
});

}
