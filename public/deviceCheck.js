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
  }else if(mode == "release")
  {
    localStorage.setItem("eventSheetId", "1SC0UPYthsoS5NKDuC5oJt-y29__f0gm0wkIkJoDduWw");
    localStorage.setItem("noteSheetId", "1UDDtel5vAFBqVnaPZIZl20SwZEz_7fxGXYQOuKLvSmQ");
    localStorage.setItem("announcementSheetId", "116OBhXliG69OB5bKRAEwpmlOz21LCCWStniSuIR6wPI");
    localStorage.setItem("miscSheetId", "1nzKRlq7cQrI_XiJGxJdNax5oB91bR_SypiazWO2JTuU");
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
