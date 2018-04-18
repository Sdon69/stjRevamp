 if(/iPhone|iPad|iPod/i.test(navigator.userAgent))
{


}else {
    // window.location.href = "/serverDown.html";
}

var mode = "release";
  if(mode == "test")
  {
  localStorage.setItem("eventSheetId", "1tFhDy9sR9dlJ0jwNbqbcq3TnFpViMHJOi2xeOv_Wqqw");
  localStorage.setItem("noteSheetId", "1pAZtRVUuQFuGoUiWjiZRwXbrfju3ZcJgR0Lq6mBmmW0");
  localStorage.setItem("announcementSheetId", "1P0iFk6F9AHddLOM4N_8NbMVVByz671rbzDikJIbcsS0");
  localStorage.setItem("miscSheetId", "10PpNnvF4j5GNlbGrP4vPoPV8pQhix_9JP5kK9zlQDmY");
  localStorage.setItem("uploadedVideoInfoSheetId", "17o0GpXwWZskawufsMj-iH8wdbFx_2HZ6Jfjtc1JjjfU");
  localStorage.setItem("apiKey", "AIzaSyDhyP7p8FDixgOyGy0KdbHMXRRFCvaXpWc");
  }else if(mode == "release")
  {
    localStorage.setItem("eventSheetId", "1SC0UPYthsoS5NKDuC5oJt-y29__f0gm0wkIkJoDduWw");
    localStorage.setItem("noteSheetId", "1UDDtel5vAFBqVnaPZIZl20SwZEz_7fxGXYQOuKLvSmQ");
    localStorage.setItem("announcementSheetId", "116OBhXliG69OB5bKRAEwpmlOz21LCCWStniSuIR6wPI");
    localStorage.setItem("miscSheetId", "1nzKRlq7cQrI_XiJGxJdNax5oB91bR_SypiazWO2JTuU");
    localStorage.setItem("uploadedVideoInfoSheetId", "12C3ceqz_Fr7GmXpLxt-n4iMhbr86yluGqT4fno_CW-8");
    localStorage.setItem("apiKey", "AIzaSyDxQgIdYx9B_OA8cDuwSSHHCJ8kUDhL_YY");
  }


  function getEventSheetId()
  {
        return localStorage.getItem("eventSheetId")
  }

  function getAnnouncementSheetId()
  {
        return localStorage.getItem("announcementSheetId")
  }

  function getNoteSheetId()
  {
        return localStorage.getItem("noteSheetId")
  }

  function getMiscSheetId()
  {
        return localStorage.getItem("miscSheetId")
  }

  function getUploadedVideoInfoSheetId()
  {
        return localStorage.getItem("uploadedVideoInfoSheetId")
  }


    function getFireBaseApiKey()
    {
          return localStorage.getItem("apiKey")
    }

  function sendGcmMessage(messageTitle,messageBody,cataegories,writer)
  {

    if(messageTitle!= undefined || messageBody!= undefined) {
               messageTitle = messageTitle.replace("<comma3384>", ".");
               messageBody = messageBody.replace("<comma3384>", ".");
               var envelope = messageTitle + "<comma3384>" + messageBody;

               if(writer != "event")
               {

                   var topicOutput = getTopics(cataegories);


                   var topicArray= topicOutput.split(",");
                   for (i = 1; i < topicArray.length; i++)
                   {

                      console.log(topicArray[i]);
                       startMessaging(messageTitle,messageBody,"/topics/" + topicArray[i]);
                   }
               }
               else
               {
                      startMessaging(messageTitle,messageBody,"/topics/" +"global");
               }








}
  }


  function startMessaging(title,description,topic)


  {
  $.ajax({
           type : 'POST',
           url : "https://fcm.googleapis.com/fcm/send",
           headers : {
               Authorization : 'key=' + getFireBaseApiKey()
           },
           contentType : 'application/json',
           dataType: 'json',
           data: JSON.stringify({"to": topic, "data": {"message":""+title+"<comma3384>"+description}}),

           success : function(response) {
               console.log(response);

                      window.top.location.reload();
           },
           error : function(xhr, status, error) {
               console.log(xhr.error);

                   window.top.location.reload();
           }
       });
     }


     function getTopics(subCataegories)
     {

        var departmentCollection = [6];
        var outputTopic ="";
       arrayIncrementer = 0;
        departmentCollection[arrayIncrementer] = "Art";
        departmentCollection[++arrayIncrementer] = "Commerce";
        departmentCollection[++arrayIncrementer] = "Management";
        departmentCollection[++arrayIncrementer] = "Education";
        departmentCollection[++arrayIncrementer] = "Science";
        departmentCollection[++arrayIncrementer] = "Other Subjects";

        var semesterCollection = [6];
        arrayIncrementer = 0;
        semesterCollection[arrayIncrementer] = "First Semester";
        semesterCollection[++arrayIncrementer] = "Second Semester";
        semesterCollection[++arrayIncrementer] = "Third Semester";
        semesterCollection[++arrayIncrementer] = "Fourth Semester";
        semesterCollection[++arrayIncrementer] = "Fifth Semester";
        semesterCollection[++arrayIncrementer] = "Sixth and Above Semesters";

        for(i = departmentCollection.length-1;i>=0;i--)
        {



            if(subCataegories.includes(departmentCollection[i]))
            {

//                    Log.v("deptCollection",semesterCollection[k]);

                var sSemester;
                if (subCataegories.includes("First Semester")) {
                    sSemester = "1";
                     outputTopic  = outputTopic + "," + departmentCollection[i]  + sSemester;
                }  if (subCataegories.includes("Second Semester")) {
                sSemester = "2";
                 outputTopic  = outputTopic + "," + departmentCollection[i]  + sSemester;
            }  if (subCataegories.includes("Third Semester")) {
                sSemester = "3";
                 outputTopic  = outputTopic + "," + departmentCollection[i]  + sSemester;
            }  if (subCataegories.includes("Fourth Semester")) {
                sSemester = "4";
                 outputTopic  = outputTopic + "," + departmentCollection[i]  + sSemester;
            }  if (subCataegories.includes("Fifth Semester")) {
                sSemester = "5";
                 outputTopic  = outputTopic + "," + departmentCollection[i]  + sSemester;
            }  if (subCataegories.includes("Sixth and Above Semesters")) {
                sSemester = "6";
                 outputTopic  = outputTopic + "," + departmentCollection[i]  + sSemester;
            }



            }
        }
        return outputTopic;

     }
