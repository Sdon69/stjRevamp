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

'use strict';

var express = require('express');
var router = express.Router();
var models = require('./models');
var Sequelize = require('sequelize');
var SheetsHelper = require('./sheets');

var json2html = require('node-json2html');
var   mode = 'eventViewer';
var cataegory1;
var cataegory2;
var enrty = 0;
var initialEnrty = true;
var tMode;
var gTitle;
var gDescription;
var gPassword;
var gCataegories;

var gUserId;
var gFullName;
var gDateOfPublish;

var gSemester;
var gDepartment;
var gDateOfEventString;
var gLastDateOfRegistrationString;
var gEntryFees;

var globalHtmlBody;
var notesHtmlBody;
var eventHtmlBody;
var announcementHtmlBody;


var notesCataegory1;
var notesCataegory2;


var eventCataegory1;
var eventCataegory2;

var announcementCataegory1;
var announcementCataegory2;


router.get('/', function(req, res, next) {
    console.log('1607');

    res.set('Content-Type', 'application/javascript');
     res.render('index', { myVar : 'dsndk' });


});


// Announcement Starts from here
// .
// .
// .
// .
// .

router.get('/annonuncementViewerPage', function(req, res, next) {

    tMode = 'viewer';
    mode = 'announcementViewer';
    console.log('ann', mode);
    if(!cataegory1)
    {
      cataegory1 = 'All Departments'
      console.log('an1',cataegory1)
    }
    if(!cataegory2)
    {
      cataegory2 = 'All Semesters'
      console.log('an1',cataegory1)
    }


    var  raw_data = SheetsHelper.itemAnnouncementDetails;
    announcementHtmlBody =  JSON.stringify(raw_data);


    res.render('annonuncementViewerPage',{
      pageTitle: 'About Page',
      dataFromAnnouncement:announcementHtmlBody,
      isInformationAvailable:'true'

    });
});





// .
// .
// .
// .
// .
// Announcement Ends here




// Notes Starts from here
// .
// .
// .
// .
// .

router.get('/notesViewerPage', function(req, res, next) {


    tMode = 'viewer';
    mode = 'notesViewer';
console.log('notes', mode);
    if(!cataegory1)
    {
      cataegory1 = 'All Departments'
      console.log('an1',cataegory1)
    }
    if(!cataegory2)
    {
      cataegory2 = 'All Semesters'
      console.log('an1',cataegory1)
    }
    var  raw_data = SheetsHelper.itemNotesDetails;




    notesHtmlBody =  JSON.stringify(raw_data);
console.log(notesHtmlBody);

    res.render('notesViewerPage',{
      pageTitle: 'About Page',
      dataFromAnnouncement:notesHtmlBody,
      isInformationAvailable:'true'

    });
});



// router.get('/notesViewerFrame',function(req, res, next)
// {
//
//     if(!SheetsHelper.itemNotesDetails)
//     {
//   res.send("<br<br><br><br>No Filter Choosen");
// }else if(!notesCataegory1 && !notesCataegory2)
//   {
//     res.send("<br<br><br><br>Choose a Department and a Semester");
//   }else {
//         res.send(`<br<br><br><br>Filter Choosen: ${notesCataegory1}   &   ${notesCataegory2} ${notesHtmlBody}`);
//   }
//
//
//   });

// .
// .
// .
// .
// Notes Ends here


// Events Starts from here
// .
// .
// .
// .
// .

router.get('/eventViewerPage', function(req, res, next) {


    tMode = 'viewer';

    mode = 'eventViewer';

    console.log('event', mode);
    if(!cataegory1)
    {
      cataegory1 = 'All Events'
      console.log('ev1',cataegory1)
    }
    var  raw_data = SheetsHelper.itemEventDetails;

    console.log(raw_data);
    eventHtmlBody =  JSON.stringify(raw_data);


    res.render('eventViewerPage',{
      pageTitle: 'About Page',
      dataFromAnnouncement:eventHtmlBody,
      isInformationAvailable:'true'

    });
});


//
// router.get('/eventViewerFrame',function(req, res, next)
// {
//
//
//   if(!SheetsHelper.itemEventDetails)
//   {
// res.send("<br<br><br><br>No Filter Choosen");
// }else if(!eventCataegory1)
//   {
//     res.send("<br<br><br><br>Choose a Genre");
//   }else {
//
//       res.send('<br<br><br><br>Filter Choosen:'+  eventCataegory1 +  eventHtmlBody);
//
//
//
// }
//
// });



// .
// .
// .
// .
// .
// Event Ends here


// Announcement Writer begins here
// .
// .
// .
// .

router.get('/annonuncementWriterPage', function(req, res, next) {

    tMode = 'writer';
    console.log(tMode);
    mode = 'announcementWriter';




    res.render('annonuncementWriterPage.handlebars');
});


router.get('/notesWriterPage', function(req, res, next) {

    tMode = 'writer';
    console.log(tMode);
    mode = 'notesWriter';




    res.render('notesWriterPage.handlebars');
});

router.get('/eventWriterPage', function(req, res, next) {

    tMode = 'writer';
    console.log(tMode);
    mode = 'eventWriter';




    res.render('eventWriterPage.handlebars');
});



// router.get('/annonuncementWriterFrame', function(req, res, next) {
//
//
//
//     res.render('annonuncementWriterFrame.hbs');
// });

router.post('/announcementWriteCheck', function(req, res, next) {

        var userId = 'SampleId';
        var fullName = 'SampleName'




    gTitle = req.body.eventTitle;
    gDescription = req.body.eventDesc;
    gCataegories = req.body.cataegoryTextName;
    gUserId = userId;
    gFullName = fullName;
    gDateOfPublish = req.body.todayTextName;










});


router.post('/eventsWriteCheck', function(req, res, next) {




      var fullName = "Sample Name";
      var userId = "SampleId";

    gTitle = req.body.eventTitle;
    gDescription =  req.body.eventDesc;
    gEntryFees = req.body.entryFees;
    gCataegories = req.body.cataegoryTextName;
    gDateOfPublish = req.body.todayTextName;
    gDateOfEventString = req.body.date_of_event;
    gLastDateOfRegistrationString = req.body.lastDateOfRegistration;
    gUserId = userId;
    gFullName = fullName;




});


router.post('/notesWriteCheck', function(req, res, next) {

          var userId = 'SampleId';
          var fullName = 'SampleName'




      gTitle = req.body.eventTitle;
      gDescription = req.body.eventDesc;
      gCataegories = req.body.cataegoryTextName;
      gUserId = userId;
      gFullName = fullName;
      gDateOfPublish = req.body.todayTextName;



});









// Route for creating spreadsheet.



router.post('/spreadsheetsCreateEvent', function(req, res, next) {

  console.log('annonuncementsWriter');


  var auth = req.get('Authorization');


  if (!auth) {
    return next(Error('Authorization required.'));
  }
  var accessToken = auth.split(' ')[1];
  var helper = new SheetsHelper(accessToken);

  var title = 'Orders (' + new Date().toLocaleTimeString() + ')';

  console.log('tMode',tMode);
  console.log('sheets', mode);

  tMode = 'writer'
  mode = 'eventWriter';
    console.log('spreadsheetsAnnouncement', mode);

if(tMode === 'writer')
{
console.log('sfirst');






  console.log('global Wrting input - spreadsheet',gTitle,gDescription,gDateOfPublish,gCataegories);
  helper.createSpreadsheet(title,mode,cataegory1,cataegory2,tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
    if (err) {
      return next(err);
    }




  });

  res.redirect('/eventViewerPage');






}





});

router.post('/spreadsheets', function(req, res, next) {

    console.log('eventViewer');


    var auth = req.get('Authorization');


    if (!auth) {
      return next(Error('Authorization required.'));
    }
    var accessToken = auth.split(' ')[1];
    var helper = new SheetsHelper(accessToken);

    var title = 'Orders (' + new Date().toLocaleTimeString() + ')';

    console.log('tMode',tMode);
    console.log('sheets', mode);
    tMode === 'viewer';
    mode = 'eventViewer'
      console.log('spreadsheetsAnnouncement', mode);

        if(tMode === 'viewer')
        {

    if(!cataegory1.includes('Choose'))
    {

      helper.createSpreadsheet(title,mode,cataegory1,cataegory2,tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
      if (err) {
          return next(err);
        }



      });



    }
  }





});


router.post('/spreadsheetsCreateNote', function(req, res, next) {

  console.log('annonuncementsWriter');


  var auth = req.get('Authorization');


  if (!auth) {
    return next(Error('Authorization required.'));
  }
  var accessToken = auth.split(' ')[1];
  var helper = new SheetsHelper(accessToken);

  var title = 'Orders (' + new Date().toLocaleTimeString() + ')';

  console.log('tMode',tMode);
  console.log('sheets', mode);



  tMode = 'writer'
  mode = 'notesWriter';
    console.log('spreadsheetsAnnouncement', mode);

if(tMode === 'writer')
{
console.log('sfirst');







  console.log('global Wrting input - spreadsheet',gTitle,gDescription,gDateOfPublish,gCataegories);
  helper.createSpreadsheet(title,mode,cataegory1,cataegory2,tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
    if (err) {
      return next(err);
    }




  });

  res.redirect('/notesViewerPage');






}





});



router.post('/spreadsheetsAnnouncement', function(req, res, next) {

  console.log('annonuncements');




  var auth = req.get('Authorization');


  if (!auth) {
    return next(Error('Authorization required.'));
  }
  var accessToken = auth.split(' ')[1];
  var helper = new SheetsHelper(accessToken);

  var title = 'Orders (' + new Date().toLocaleTimeString() + ')';

  console.log('tMode',tMode);
  console.log('sheets', mode);
  tMode === 'viewer';
  mode = 'announcementViewer'
    console.log('spreadsheetsAnnouncement', mode);

      if(tMode === 'viewer')
      {

  if(!cataegory1.includes('Choose'))
  {

    helper.createSpreadsheet(title,mode,cataegory1,cataegory2,tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
    if (err) {
        return next(err);
      }



    });



  }
}




});


router.post('/spreadsheetsCreateAnnouncement', function(req, res, next) {

  console.log('annonuncementsWriter','first');


  var auth = req.get('Authorization');


  if (!auth) {
    return next(Error('Authorization required.'));
  }
  var accessToken = auth.split(' ')[1];
  var helper = new SheetsHelper(accessToken);

  var title = 'Orders (' + new Date().toLocaleTimeString() + ')';

  console.log('tMode',tMode);
  console.log('sheets', mode);

  tMode = 'writer'
  mode = 'announcementWriter';
    console.log('spreadsheetsAnnouncement', mode);

if(tMode === 'writer')
{
console.log('sfirst');





  console.log('global Wrting input - spreadsheet',gTitle,gDescription,gDateOfPublish,gCataegories);
  helper.createSpreadsheet(title,mode,cataegory1,cataegory2,tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
    if (err) {
      return next(err);
    }




  });

  res.redirect('/annonuncementViewerPage');






}





});


router.post('/spreadsheetsNotes', function(req, res, next) {

  console.log('notesViewer');



  var auth = req.get('Authorization');


  if (!auth) {
    return next(Error('Authorization required.'));
  }
  var accessToken = auth.split(' ')[1];
  var helper = new SheetsHelper(accessToken);

  var title = 'Orders (' + new Date().toLocaleTimeString() + ')';

  console.log('tMode',tMode);
  console.log('sheets', mode);
  tMode === 'viewer';
  mode = 'notesViewer'
    console.log('spreadsheetsAnnouncement', mode);

      if(tMode === 'viewer')
      {

  if(!cataegory1.includes('Choose'))
  {

    helper.createSpreadsheet(title,mode,cataegory1,cataegory2,tMode,gTitle,gDescription,gCataegories,gUserId,gFullName,gDateOfPublish,gDateOfEventString,gLastDateOfRegistrationString,gEntryFees, function(err, spreadsheet) {
    if (err) {
        return next(err);
      }



    });



  }
}



});





router.post('/showNotes', function(req, res, next) {



//
//           var departmentFilter = req.body.s1;
//           var semesterFilter = req.body.s2;
//           notesCataegory1 = req.body.s1;
//           notesCataegory2 = req.body.s2;
//
//
//         var raw_data = SheetsHelper.itemNotesDetails;
//
//
//
//           var forLength = raw_data.length - 1;
//
//
//        var used = false;
//        var anyNoteFromDept = false;
//        var i;
//
//        var filteredData = [{
//        name: 'str1',
//        age:   'str2'
//        }];
//          for(i=0;i<=forLength;i++)
//          {
//          var dept = raw_data[i].cataegories;
//
//
//
//            if(dept.includes(departmentFilter))
//            {
//
//              if(dept.includes(semesterFilter))
// {
//
//              if(!used)
//              {
//              filteredData.pop({
//              name: 'str1',
//              age:   'str2'
//                });
//                filteredData.push(raw_data[i]);
//                used = true;
//                anyNoteFromDept = true;
//
//              }else{
//                filteredData.push(raw_data[i]);
//                anyNoteFromDept = true;
//              }
//
//
// }
//            }
//          }
//
//          if(!anyNoteFromDept)
//          {
//            filteredData.pop({
//            name: 'str1',
//            age:   'str2'
//              });
//              filteredData.push({
//              title: 'No Data for this filter Exists'
//                });
//          }
//          var globalFilteredData = filteredData;
//
//
//
// var transformNotes =
//   {'<>':"div style='width:100%;padding-top:20px;'",'html':[
//                     {'<>':"form method='post' action='/detailedNotes' method ='post' ",'html':[
//                         {'<>':"input type='submit' value='${uniqueId}) \n Tap to Expand the content below'  style='background:#fff;color:#3f8acd;font-weight:550;' name='s3' ",'html':[
//                           {'<>':"font face='Roboto'",'html':[
//                       {'<>':"div style='width:100%;padding-top:20px; padding-bottom:10px; margin-right:20px; background:#ffffff;border-width:1px; border-color:rgba(130,130,130,1.00);border-style: solid; border-top:none;border-left:none;'",'children':[
//                         {
//                           '<>':"div style='width:100%'",'children':[
//                             {
//                               '<>':"table style='width:100%'",'children':[
//                                 {
//                                     '<>':"tr",'children':[
//                                       {
//                                         '<>':"td style='margin-bottom:3px; color:#3f8acd;font-size:14px; font-weight:500; padding-top:25px'",'html':"${title}"
//                                       },
//                                       {
//                                         '<>':"td style='margin-right:25px;padding-top:6px;font-size:8px; font-weight:600; color:#848587; padding-right:15px;' align='right'",'html':"${datePublished}"
//                                       }
//                                     ]
//                                 }
//                               ]
//                             }
//                           ]
//                         },{
//                             '<>':"div style='margin-left:6px; margin-top:4px; margin-bottom:4px;  font-size:10px ; font-weight:450;'",'children':[
//                               {
//                                 '<>':"table style='width:100%'",'children':[
//                                   {
//                                       '<>':"tr",'children':[
//                                         {
//                                             '<>':"td style='align-content:flex-start; font-size:10px;font-weight:450;'",'html':"Entry Fees : ${title}"
//                                         },
//                                         {
//                                             '<>':"td align='right' style='padding-right:8%;font-size:10px;font-weight:450;'",'html':"Date : ${title}"
//                                         }
//                                       ]
//                                   }
//                                 ]
//                               }
//                             ]
//                         },{
//                             '<>':"div style='margin-left:10x;margin-right:10x; font-size:12px; font-weight:450; padding-top:5px;'",'html':"${dottedString}"
//                         }
//                     ]}  ] }]}]}]};
//
//         var  htmlBody = json2html.transform(filteredData,transformNotes);
//
//           notesHtmlBody = htmlBody;
//
//
//
//
//
//
//         res.redirect('back');
//






});

router.post("/setModeEvents", function(req, res, next) {
  mode ='eventViewer';
  console.log('setModeEvents',mode);
});


router.post('/showEvents', function(req, res, next) {


     //  var   dept_filter = req.body.s1;
     //  eventCataegory1 = dept_filter;
     //
     //
     //  // var   third_filter = req.body.s2;
     //
     //
     //
     //  var raw_data = SheetsHelper.itemEventDetails;
     //
     //
     //
     //
     //
     //    var forLength = SheetsHelper.itemEventDetails.length - 1;
     //
     //
     // var used = false;
     // var anyNoteFromDept = false;
     //
     // var filteredData = [{
     // name: 'str1',
     // age:   'str2'
     // }];
     //
     // var i;
     //   for(i=0;i<=forLength;i++)
     //   {
     //   var dept = raw_data[i].cataegories;
     //
     //
     //     if(dept.includes(dept_filter))
     //     {
     //
     //
     //       if(!used)
     //       {
     //       filteredData.pop({
     //       name: 'str1',
     //       age:   'str2'
     //         });
     //         filteredData.push(raw_data[i]);
     //         used = true;
     //         anyNoteFromDept = true;
     //
     //       }else{
     //         filteredData.push(raw_data[i]);
     //         anyNoteFromDept = true;
     //       }
     //
     //
     //
     //     }
     //   }
     //
     //   if(!anyNoteFromDept)
     //   {
     //     filteredData.pop({
     //     name: 'str1',
     //     age:   'str2'
     //       });
     //       filteredData.push({
     //       title: 'No Data for this filter Exists'
     //         });
     //   }
     //   var globalFilteredData = filteredData;
     //
     //
     //   var transform =
     //                        {'<>':"div style='width:100%;padding-top:20px;'",'html':[
     //                                          {'<>':"form method='post' action='/detailedEvent' method ='post' ",'html':[
     //                                              {'<>':"input type='submit' value='${uniqueId}) \n Tap to Expand the content below'  style='background:#fff;color:#3f8acd;font-weight:550;' name='s3' ",'html':[
     //                                                {'<>':"font face='Roboto'",'html':[
     //                                            {'<>':"div style='width:100%;padding-top:20px; padding-bottom:10px; margin-right:20px; background:#ffffff;border-width:1px; border-color:rgba(130,130,130,1.00);border-style: solid; border-top:none;border-left:none;'",'children':[
     //                                              {
     //                                                '<>':"div style='width:100%'",'children':[
     //                                                  {
     //                                                    '<>':"table style='width:100%'",'children':[
     //                                                      {
     //                                                          '<>':"tr",'children':[
     //                                                            {
     //                                                              '<>':"td style='margin-bottom:3px; color:#3f8acd;font-size:14px; font-weight:500; padding-top:25px'",'html':"${title}"
     //                                                            },
     //                                                            {
     //                                                              '<>':"td style='margin-right:25px;padding-top:6px;font-size:8px; font-weight:600; color:#848587; padding-right:15px;' align='right'",'html':"${dateOfPublish}"
     //                                                            }
     //                                                          ]
     //                                                      }
     //                                                    ]
     //                                                  }
     //                                                ]
     //                                              },{
     //                                                  '<>':"div style='margin-left:6px; margin-top:4px; margin-bottom:4px;  font-size:10px ; font-weight:450;'",'children':[
     //                                                    {
     //                                                      '<>':"table style='width:100%'",'children':[
     //                                                        {
     //                                                            '<>':"tr",'children':[
     //                                                              {
     //                                                                  '<>':"td style='align-content:flex-start; font-size:10px;font-weight:450;'",'html':"Entry Fees : ${entryFees}"
     //                                                              },
     //                                                              {
     //                                                                  '<>':"td align='right' style='padding-right:8%;font-size:10px;font-weight:450;'",'html':"Date : ${eventDate}"
     //                                                              }
     //                                                            ]
     //                                                        }
     //                                                      ]
     //                                                    }
     //                                                  ]
     //                                              },{
     //                                                  '<>':"div style='margin-left:10x;margin-right:10x; font-size:12px; font-weight:450; padding-top:5px;'",'html':"${dottedString}"
     //                                              }
     //                                          ]}  ] }]}]}]};
     //
     //
     //
     //  var   htmlBody = json2html.transform(filteredData,transform);
     //
     //  eventHtmlBody = htmlBody;
     //
     //  res.redirect('back');





});

  router.post("/setModeAnnouncement", function(req, res, next) {
    mode ='announcementViewer';
    console.log('setModeAnnouncement',mode);
  });


  router.post("/showAnnouncements", function(req, res, next) {



  //         var departmentFilter = req.body.s1;
  //         var semesterFilter = req.body.s2;
  //         announcementCataegory1 = req.body.s1;
  //         announcementCataegory2 = req.body.s2;
  //
  //
  //       var  raw_data = SheetsHelper.itemAnnouncementDetails;
  //       announcementHtmlBody =  JSON.stringify(raw_data);
  //
  //       console.log(announcementHtmlBody);
  //
  //
  //
  //
  //
  //
  //         console.log('outtt' ,announcementCataegory1,announcementCataegory2 );
  //         router.get('/annonuncementViewerPage',function(req, res, next)
  //         {
  //
  // console.log('innnn',announcementCataegory1,announcementCataegory2);
  //           if(!SheetsHelper.itemAnnouncementDetails)
  //           {
  //         res.send("<br<br><br><br>No Filter Choosen");
  //         }else if(!announcementCataegory1 && !announcementCataegory2)
  //           {
  //             res.send("<br<br><br><br>Choose a Department and a Semester");
  //           }else {
  //
  //             res.render('annonuncementViewerFrame.hbs',{
  //                   pageTitle: 'About Page',
  //                   dataFromAnnouncement:announcementHtmlBody,
  //                   isInformationAvailable:'true'
  //
  //                 });
  //         }
  //
  //         });

        //
        // res.redirect('back');







});



// var asyncAdd = (helper,title,mode,cataegory1,cataegory2) =>
// {
//   return new Promise((resolve, reject) =>
//   {
//
//
// resolve(helper.itemDetails);
//
//
// });
// }



// Route for syncing spreadsheet.

module.exports = router;
