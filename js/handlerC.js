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


    var $input = $('#handleCounter').find('input');
    var timeintervalID;
    var  startTime;
    var num;
    var startDate;
    var tasks = [];
//    var histos = ['exercice','prog','learning'];
//    update_list(histos);


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
        update_list(tasks);

    }

    function update_list(updated) {

      // clear the existing list
      console.log(updated);
      $.each(updated, function(index,task) {
        
        $('#list .list').append('<li>'+task.title+'</li>')
      });

    }







})(jQuery);



//////  Javascript Database //////

// var createStatement = 'CREATE TABLE IF NOT EXISTS ESSAI (id integer primary key,title char(50) not null,date real,duration real)';
 
// var selectAllStatement = "SELECT * FROM ESSAI";
 
// var insertStatement = "INSERT INTO ESSAI (title, date, duration) VALUES (?, ?, ?)";
 
//  var db = openDatabase("PomodoroBook", "1.0", "Pomodoro Book", 200000);  // Open SQLite Database
 
// var dataset;
 
// var DataType;


// function initDatabase()  // Function Call When Page is ready.
 
// {
 
//     try {
 
//         if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
//         {
 
//             alert('Databases are not supported in this browser.');
 
//         }
 
//         else {
 
//             createTable();  // If supported then call Function for create table in SQLite
 
//         }
 
//     }
 
//     catch (e) {
 
//         if (e == 2) {
 
//             // Version number mismatch. 
 
//             console.log("Invalid database version.");
 
//         } else {
 
//             console.log("Unknown error " + e + ".");
 
//         }
 
//         return;
 
//     }
 
// }


// function createTable()  // Function for Create Table in SQLite.
 
// {
 
//     db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
// }


// function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
// {
//         var d = datePicker();
//         console.log(d);
//         var usernametemp = $('input:text[id=taskname]').val();
 
//         var useremailtemp = $('input:text[id=duration]').val();
//         db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, d, useremailtemp], loadAndReset, onError); 
//         });
 
//         //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
// }

// function datePicker() {
//       var dateFormat = require('dateformat');
//       var now = new Date();
//       return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
// }

// function onError(tx, error) // Function for Hendeling Error...
 
// {
 
//     alert(error.message);
 
// }

// function loadAndReset() //Function for Load and Reset...
 
// {
//     showRecords()
// }


// function showRecords() // Function For Retrive data from Database Display records as list
 
// {
 
//     $("#results").html('')
 
//     db.transaction(function (tx) {
 
//         tx.executeSql(selectAllStatement, [], function (tx, result) {
 
//             dataset = result.rows;
 
//             for (var i = 0, item = null; i < dataset.length; i++) {
 
//                 item = dataset.item(i);
//                 var d = item['date'];

//                 console.log('date '+d.getFullYear());
                
//                 var linkeditdelete = '<li>' + item['title'] + ' , ' + item['date'] + ' , ' + item['duration'] + '</li>';
 
//                 $("#results").append(linkeditdelete);
 
//             }
 
//         });
 
//     });
 
// }

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