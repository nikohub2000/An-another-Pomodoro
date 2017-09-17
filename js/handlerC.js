;
(function() {
    'use strict';
    $.fn.handleCounter = function() {

        var $input;
        var $btnMinus;
        var $btnPlugs;
        var $handleCounter = this;

        $btnMinus = $handleCounter.find('.counter-minus');

        $btnPlugs = $handleCounter.find(".counter-plus");



        return $handleCounter
    };



    var weekday = new Array(7);
      weekday[0] =  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

    var month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";

      //////  Javascript Database //////
 // Open SQLite Database
 

    var $input = $('#handleCounter').find('input');
    var timeintervalID;
    var  startTime;
    var num;
    var startDate;
    var tasks = [];
    var dbTasks = [];
    initDatabase();
    console.log('*** INIT DATABASE ***');
    dbTasks = showRecords();
    console.log('*** LOAD RECORDS ***');
    console.log('*** FOUND '+dbTasks.length+' RECORDS ***');

//    var histos = ['exercice','prog','learning'];
    update_list(dbTasks);


    $('.start').click(function() {
        counter();
    })

    $('.annul').click(function() {
        stopCounter();
    })


    $('.counter-plus').click(function() {
        var num = parseInt($input.val());
        if (num <= 58) {
            $input.val(num + 1);
        }
    })

    $(".counter-minus").click(function() {
        var num = parseInt($input.val());
        if (num > 0) {
            $input.val(num - 1);
        }
    });



    function counter() {
        startDate = new Date();
        num = parseInt($input.val());
        startTime = new Date().getTime();
        var countDownDate = addMinutes(startTime, num);
        timeintervalID = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if(minutes === 0 && seconds === 0) {
              stopCounter();
            }
            document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
        }, 1000);
      
        
    }

    function addMinutes(date, minutes) {
        return new Date(date + minutes * 60000);
    }

    function stopCounter() {
        clearInterval(timeintervalID);
        var usernametemp = $('input:text[id=taskname]').val();



        var task = new Task(usernametemp,startDate,num);
        tasks.push(task);
        insertRecord(task);
        //update_list(tasks);


    }

    function update_list(updated) {
      showRecords();
      // clear the existing list
      console.log(updated);
      if(updated  !== undefined) {
       $.each(updated, function(index,task) {
        

        var d = weekday[task.date.getDay()];
        var m = month[task.date.getMonth()];
        var y = task.date.getFullYear();

        var h = task.date.getHours();
        var m = task.date.getMinutes();

        console.log(d+'-'+m+'-'+y);
        $('#list .list').append('<li>'+task.title+' - ' + d +'-' + m + '-' + y + '-' + h +'-'+m+'-' + task.duration + ' </li>')
      });
      }


    }


var createStatement = 'CREATE TABLE IF NOT EXISTS ESSAI (id integer primary key,title char(50) not null,date real,duration real)';
var selectAllStatement = "SELECT * FROM ESSAI";
var insertStatement = "INSERT INTO ESSAI (title, date, duration) VALUES (?, ?, ?)";
var db = openDatabase("PomodoroBook", "1.0", "Pomodoro Book", 200000); 
var dataset;
function initDatabase()  // Function Call When Page is ready.
 
{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}


function createTable()  // Function for Create Table in SQLite.
{
    db = openDatabase("PomodoroBook", "1.0", "Pomodoro Book", 200000);
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
}


function insertRecord(task) // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
        var usernametemp = $('input:text[id=taskname]').val();
 
        var useremailtemp = $('input:text[id=duration]').val();
        db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, task.date, useremailtemp], loadAndReset, onError); 
        });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}

// function datePicker() {
//       var dateFormat = require('dateformat');
//       var now = new Date();
//       return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
// }

function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}

function loadAndReset() //Function for Load and Reset...
 
{
    showRecords()
}


function showRecords() // Function For Retrive data from Database Display records as list
{
    var items = [];

    $("#results").html('')
    
    db.transaction(function (tx) {
      console.log('*** transaction ');
        tx.executeSql(selectAllStatement, [], function (tx, result) {
            var len = result.rows.length;
            console.log('length '+len);
            dataset = result.rows;
            
            
            for (var i = 0, item = null; i < dataset.length; i++) {
                
                var itemw = dataset.item(i);
                var dateNum = Date.parse(itemw.date);
                var myDate = new Date(dateNum);
                

                //items.push(item);

                var d = weekday[myDate.getDay()];
                var M = month[myDate.getMonth()];
                console.log('count '+M);
                var y = myDate.getFullYear();

                var h = myDate.getHours();
                var m = myDate.getMinutes();

                $('#list .list').append('<li>'+itemw.title+' - ' + d +'-' + M + '-' + y + '-' + h +'h'+m+'m ' + itemw.duration + ' </li>')
                //var d = item['date'];
                //var linkeditdelete = '<li>' + item['title'] + ' , ' + item['date'] + ' , ' + item['duration'] + '</li>';
                //$("#results").append(linkeditdelete);
 
            }
            
            
            
 
        });
 
    });

    console.log(items.length);
    return items;
 
}




})(jQuery);




// 
 
// var DataType;


// $(document).ready(function () // Call function when page is ready for load..
 
// {
// ;
 
//     $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
//     initDatabase();
 
//        // Register Event Listener when button click.
//      $(".start").click(insertRecord);
 
//     // $("#btnUpdate").click(updateRecord);
 
//     // $("#btnReset").click(resetForm);
 
//     // $("#btnDrop").click(dropTable);
 
// });



class Task {
    constructor(title, date, duration) {
        this.title = title;
        this.date = date;
        this.duration = duration;
    }
}