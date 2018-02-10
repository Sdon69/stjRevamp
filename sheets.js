/*
  Copyright 2016 Google, Inc.

  Licensed to the Apache Software Foundation (ASF) under one or more contributor
  license agreements. See the NOTICE file distributed with this work for
  additional information regarding copyright ownership. The ASF licenses this
  file to you under the Apache License, Version 2.0 (the "License"); you may not
  use this file except in compliance with the License. You may obtain a copy of
  the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License for the specific language governing permissions and limitations under
  the License.
*/

var google = require('googleapis');
var googleAuth = require('google-auth-library');
var util = require('util');

dept_filter = 'All Events';


var itemDetails_Gl;

  var globalRange;
  var uniqueIdNumber = 0;

  var announcementRowNumber;
  var eventRowNumber;
  var noteRowNumber;

var itemDetails = [{
  title: 's89',
  age:   'str2'
}];



/**
 * Create a new Sheets helper.
 * @param {string} accessToken An authorized OAuth2 access token.
 * @constructor
 */
var SheetsHelper = function(accessToken) {
  var authClient = new googleAuth();
  var auth = new authClient.OAuth2();
  auth.credentials = {
    access_token: accessToken
  };
  this.service = google.sheets({version: 'v4', auth: auth});
};

module.exports = SheetsHelper;



/**
 * Create a spreadsheet with the given name.
 * @param  {string}   title    The name of the spreadsheet.
 * @param  {Function} callback The callback function.
 */
SheetsHelper.prototype.createSpreadsheet = function(title,mode,cataegory11,cataegory12,tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, callback) {
console.log('outsheet',mode);
  var self = this;

var tMode = tMode;

var inputRes;

      var rowNumber = 2;



var itemDetails = [{
  title: 's89',
  age:   'str2'
}];

var cataegory1;
var cataegory2;

  if(mode === 'announcementViewer')
  {
    sheetId = '1i6Kd38Z-NaO747Wi_DG9bxHH1LCMPzbCiDAIUbBxzYs';
    range = 'Stj Teacher Notes!A2:I';
    cataegory1 = 'All Departments';
    cataegory2 = 'All Semesters';
  }
  else if(mode === 'eventViewer')
  {
    sheetId = '1_lodhrWpyuJSvJRi4MNyw8k7W7hSBKrXS7ukBVE4cI0';
    range = 'Class Data!A2:K';

        cataegory1 = 'All Events';
  }
  else if(mode === 'notesViewer')
  {
    sheetId = '12UOUdDm2VoETOSM_zyP2Kfx6Mzuh-SdrXKLmv-yNZLM';
    range = 'Stj Teacher Notes!A2:G';
   cataegory1 = 'All Departments';
   cataegory2 = 'All Semesters';
  }


  if(mode === 'announcementWriter')
  {


    sheetId = '1i6Kd38Z-NaO747Wi_DG9bxHH1LCMPzbCiDAIUbBxzYs';
    range = 'Stj Teacher Notes!A2:F';

  }
  if(mode === 'notesWriter')
  {


      sheetId = '12UOUdDm2VoETOSM_zyP2Kfx6Mzuh-SdrXKLmv-yNZLM';
      range = 'Stj Teacher Notes!A2:G';

  }
  if(mode === 'eventWriter')
  {

    sheetId = '1_lodhrWpyuJSvJRi4MNyw8k7W7hSBKrXS7ukBVE4cI0';
    range = 'Class Data!A2:K';

  }




    self.service.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
      }, (err, response) => {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }
  
        var rows = response.values;
        if (rows.length === 0) {
          console.log('No data found.');
        } else {
          var used = false;
          var itemDetails = [{
            title: 's89',
            age:   'str2'
          }];
            module.exports.itemDetails = itemDetails;


            asyncAdd(rows,mode,itemDetails,cataegory1,cataegory2,rowNumber,used).then((message) =>
            {



                if(mode === 'announcementWriter')
                {


                  sheetId = '1i6Kd38Z-NaO747Wi_DG9bxHH1LCMPzbCiDAIUbBxzYs';
                  range = 'Stj Teacher Notes!A2:F';
                  inputRes = {
                                values: [ [gTitle,gDescription,gCataegories,gUserId,gFullName,uniqueIdNumber,gDateOfPublish]]
                    }
                }
                if(mode === 'notesWriter')
                {


                    sheetId = '12UOUdDm2VoETOSM_zyP2Kfx6Mzuh-SdrXKLmv-yNZLM';
                    range = 'Stj Teacher Notes!A2:G';
                    inputRes = {
                                  values: [ [gTitle,gDescription,gCataegories,gUserId,gFullName,uniqueIdNumber,gDateOfPublish]]
                      }

                }
                if(mode === 'eventWriter')
                {

                  sheetId = '1_lodhrWpyuJSvJRi4MNyw8k7W7hSBKrXS7ukBVE4cI0';
                  range = 'Class Data!A2:K';
                  inputRes = {
                                values: [ [gTitle,gDescription,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees,gCataegories,gUserId,gFullName,"A",uniqueIdNumber]]

                    }
                }

              if(tMode === 'writer')
              {
                self.service.spreadsheets.values.update({
                  spreadsheetId: sheetId,
                  range: globalRange, //Change Sheet1 if your worksheet's name is something else
                  valueInputOption: "USER_ENTERED",
                  resource:  inputResource = inputRes
                }, (err, response) => {
                  if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                  } else {
                      console.log("Updated");
                        return;
                  }

                });
              }
                });


        }
      });





return;

};


var asyncAdd = (rows,mode,itemDetails,cataegory1,cataegory2,rowNumber,used) =>
{
  return new Promise((resolve, reject) =>
  {

    for (var i = 0; i < rows.length; i++) {



                var row = rows[i];
                // Print columns A and E, which correspond to indices 0 and 4.


                if(mode === 'announcementViewer')
                {






                            var str1 = row[0];
                            var str2 = row[1];
                            var str7 = row[6]


                            if (str1.includes("BonBlank88"))
                            {

                                end = true;

                                continue;
                            }








                            // dept_filter = 'Debate';


                                 cataegories = row[2];

                                 if(cataegories.includes(cataegory1)) {
                                 if(cataegories.includes(cataegory2)) {

                                     var title = row[0];

                                     var description =  row[1];

                                    var publisherId =  row[3];

                                     var fullName =  row[4];



                                     var uniqueId =  row[5];

                                     var datePublished =  row[6];

                                     var trimmedString = description.substring(0, 68);
                                     var dottedString = trimmedString.concat('....')


                                    if(!used)
                                    {


                                    itemDetails.pop({
                                    title: 'str1',
                                    age:   'str2'
                                      })
                                      ;
                                      itemDetails.push({
                                        title: title,
                                        description:  description,
                                        cataegories: cataegories,
                                        publisherId: publisherId,
                                        fullName:fullName,
                                        uniqueId: uniqueId,
                                        datePublished:datePublished,
                                        dottedString:dottedString
                                      });


                                      used = true;
                                    }
                                    else{
                                      itemDetails.push({
                                        title: title,
                                        description:  description,
                                        cataegories: cataegories,
                                        publisherId: publisherId,
                                        fullName:fullName,
                                        uniqueId: uniqueId,
                                        datePublished:datePublished,
                                        dottedString:dottedString
                                      });
                                    }


                                    module.exports.itemAnnouncementDetails = itemDetails;

                                }
                            }

            }
            else if(mode === 'eventViewer')
            {


              var str1 = row[0];
                                var str2 = row[1];
                                var str7 = row[6]


                                if (str1.includes("BonBlank88"))
                                {

                                    end = true;

                                    continue;
                                }




                                var status =  row[9];



                                // dept_filter = 'Debate';

                                if(status==="A"){
                                     cataegories = row[6];


                                    if (cataegories.includes(cataegory1)) {

                                        title = row[0];
                                        description = row[1];

                                        var fullName = row[8];;
                                        var publishDate = row[2];;
                                        var eventDate = row[3];;
                                        var lastDateofRegistration = row[4];;
                                        var fees = row[5];;
                                        var fees = " ₹".concat(fees);
                                        var uniqueId = row[10];
                                        var trimmedString = description.substring(0, 68);
                                        var dottedString = trimmedString.concat('....')


                                        if(!used)
                                        {


                                        itemDetails.pop({
                                        title: 'str1',
                                        age:   'str2'
                                          })
                                          ;
                                          itemDetails.push({
                                            title: title,
                                            description:  description,
                                            dateOfPublish: publishDate,
                                            eventDate: eventDate,
                                            lastDateofRegistration:lastDateofRegistration,
                                            entryFees: fees,
                                            fullName:fullName,
                                            uniqueId: uniqueId,
                                            cataegories:cataegories,
                                            dottedString:dottedString
                                          });


                                          used = true;
                                        }
                                        else{
                                          itemDetails.push({
                                            title: title,
                                            description:  description,
                                            dateOfPublish: publishDate,
                                            eventDate: eventDate,
                                            lastDateofRegistration:lastDateofRegistration,
                                            entryFees: fees,
                                            fullName:fullName,
                                            uniqueId: uniqueId,
                                            cataegories:cataegories,
                                                dottedString:dottedString
                                          });
                                        }


                                        module.exports.itemEventDetails = itemDetails;




                                      }
                                                    }

            }
            else if(mode === 'notesViewer')
            {


                                  var str1 = row[0];



                                  if (str1.includes("BonBlank88"))
                                  {

                                      end = true;

                                      continue;
                                  }










                                  // dept_filter = 'Debate';


                                       cataegories = row[2];


                                      if (cataegories.includes(cataegory1)) {
                 if(cataegories.includes(cataegory2)) {
                                          title = row[0];
                                          description = row[1];

                                          var fullName = row[4];;

                                          var publisherId = row[3];;

                                          var uniqueId  = row[5];;

                                          var trimmedString = description.substring(0, 68);
                                          var dottedString = trimmedString.concat('....')

                                          if(!used)
                                          {


                                          itemDetails.pop({
                                          title: 'str1',
                                          age:   'str2'
                                            })
                                            ;
                                            itemDetails.push({
                                              title: title,
                                              description:  description,
                                              cataegories:cataegories,
                                              fullName:fullName,
                                              uniqueId: uniqueId,
                                              dottedString:dottedString
                                            });


                                            used = true;
                                          }
                                          else{
                                            itemDetails.push({
                                              title: title,
                                              description:  description,
                                              cataegories:cataegories,
                                              fullName:fullName,
                                              uniqueId: uniqueId,
                                              dottedString:dottedString
                                            });
                                          }


                                          module.exports.itemNotesDetails = itemDetails;




                                      }
                                    }



            }
            else if (mode === 'announcementWriter') {




              var Str1 = row[0];

              if (Str1.includes("BonBlank88"))
              {




                  break;
              }
              announcementRowNumber++;
              rowNumber++;



            }
            else if (mode === 'notesWriter') {




              var Str1 = row[0];

              if (Str1.includes("BonBlank88"))
              {




                  break;
              }
              noteRowNumber++;
  rowNumber++;



            }  else if (mode === 'eventWriter') {




                var Str1 = row[0];

                if (Str1.includes("BonBlank88"))
                {




                    break;
                }
                eventRowNumber++;
  rowNumber++;

              }




          }


          globalRange = `Stj Teacher Notes!A${rowNumber}:G`;
          uniqueIdNumber = rowNumber;
          console.log(uniqueIdNumber);
          if (mode === 'eventWriter') {

      globalRange = `Class Data!A${rowNumber}:K`;
      }



resolve('Worked');



});
}
module.exports.resetItemDetails = () =>
{

itemDetails = [{
  title: 's89',
  age:   'str2'
}];
  module.exports.itemDetails = itemDetails;


}
