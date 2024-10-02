jQuery(function($) {
  var i = 0;
  var k = 0;
  var months = [
                ['00', 'January', 31],
                ['01', 'February', 28],
                ['02', 'March', 31],
                ['03', 'April', 30],
                ['04', 'May', 31],
                ['05', 'June', 30],
                ['06', 'July', 31],
                ['07', 'August', 31],
                ['08', 'September', 30],
                ['09', 'October', 31],
                ['10', 'November', 30],
                ['11', 'December', 31]
               ];
  var days = [
                [0, 'S', 'Sunday'],
                [1, 'M', 'Monday'],
                [2, 'T', 'Tuesday'],
                [3, 'W', 'Wednesday'],
                [4, 'T', 'Thursday'],
                [5, 'F', 'Friday'],
                [6, 'S', 'Saturday']
             ]

  var day;
  var prevday;
  var week;
  var firstDayOfMonth;
  var dowFirstDay; //day of week hari pertama di bulan
  var weekNumber;

  var view = 'calendar';

   // Objek utama untuk menyimpan event
  var events = {};

    // Mendapatkan tanggal hari ini di tahun saat ini
  var today = new Date();
  var nowYear = today.getFullYear();
  var nowMonth = ('0' + today.getMonth()).slice(-2); // Bulan saat ini dengan format 2 digit
  var nowDay = ('0' + today.getDate()).slice(-2); // Tanggal saat ini dengan format 2 digit

  // Variabels untuk tanggal aktif yang sedang dikerjakan
  var activeYear = today.getFullYear();
  var activeMonth = ('0' + today.getMonth()).slice(-2);
  var activeDay = ('0' + today.getDate()).slice(-2);

  // Inisialisasi, mencetak bulan pertama kali
  printMonth(activeYear, activeMonth, activeDay);
  $('#' + nowYear + '-' + months[Number(nowMonth)][0] + '-' + nowDay).addClass('highlightday');
  prevday = nowYear + '-' + months[Number(nowMonth)][0] + '-' + nowDay;
  createEventForm(nowYear + '-' + months[Number(nowMonth)][0] + '-' + nowDay);

  // Handler klik pada hari di kalender
  //When a day is clicked load the input box and button below
  $('#calendar').on('click', '.day', function() {
    if(prevday) {
      $('#' + prevday).removeClass('highlightday');
    }
       // Mendapatkan hari baru yang diklik
    prevday = $(this).attr('id');
    $(this).attr('id')
    var ymd = $(this).attr('id').split('-');
    // Set tanggal aktif baru
    activeYear = ymd[0];
    activeMonth = ymd[1];
    activeDay = ymd[2];
    // Menambahkan highlight pada hari yang dipilih
    $(this).addClass('highlightday');
    $('#event').html('');
    createEventForm($(this).attr('id'));
    showDailyEvents(activeYear, activeMonth, activeDay);
  });

  // Fungsi untuk membuat form input event baru
  function createEventForm(id) {
    $('#event')
      .append($('<div>').addClass('form')
        .append($('<div>').addClass('formtitle').html('Add an Event'))
        .append($('<form>').submit(function() { return false; }) // Tambah form dengan submit return false
          .append($('<input>').attr('type', 'hidden').attr('id', 'eventid').attr('value', id))
          .append($('<input>').attr('type', 'text').attr('id', 'eventmsg').keyup(function(event) {
            if(event.keyCode == 13) {
             $("#addevent").click(); // Jika tekan enter, simpan event
              }
              return false;
              }))
          .append($('<input>').attr('type', 'button').attr('value', 'Go').attr('id', 'addevent')) // Tombol simpan event
        )
      )
  }

  
  // Handler klik 'Add' button untuk menambahkan event
  $('#event').on('click', '#addevent', function() {
    addEvent($('#eventid').attr('value'), $('#eventmsg').val());
    showDailyEvents(activeYear, activeMonth, activeDay);
  });

    // Handler untuk navigasi bulan sebelumnya
  $('#calendar').on('click', '#submonth', function() {
    if(activeMonth >= 1) {
      activeMonth--; // Bulan berkurang
      activeMonth = months[Number(activeMonth)][0];
    } else {
      activeMonth = '11'; // Jika sudah di Januari, mundur ke Desember
      activeYear--; // Tahun berkurang
    }
    activeDay = 1; // Reset tanggal aktif ke 1
    printMonth(activeYear, activeMonth);
    // Tambah highlight pada hari pertama jika diclick
    $('#' + activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay).addClass('highlightday');
    prevday = activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay;
    createEventForm(activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay);
  });

  // Handler untuk navigasi bulan berikutnya yang kanan
  $('#calendar').on('click', '#addmonth', function() {
    if(activeMonth < 11) {
      activeMonth++;
      activeMonth = months[Number(activeMonth)][0];
    } else {
      activeMonth = '00'; // Jika sudah di Desember, maju ke Januari
      activeYear++;
    }
    activeDay = 1;
    printMonth(activeYear, activeMonth);
    // Tambah highlight pada hari pertama
    $('#' + activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay).addClass('highlightday');
    prevday = activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay;
    createEventForm(activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay);
  });

  // Tampilkan kalender atau tampilan event
  $('#eventslink').click(function() {
    if(view === 'calendar') {
      clearCalendar();
      $('#eventslink').html('Calendar');
      printEvents();
      view = 'events';
    } else {
      clearEvents();
      printMonth(activeYear, activeMonth);
      $('#' + activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay).addClass('highlightday');
      prevday = activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay;
      createEventForm(activeYear + '-' + months[Number(activeMonth)][0] + '-' + activeDay);
      showDailyEvents(activeYear, activeMonth, activeDay);
      $('#eventslink').html('Events');
      view = 'calendar';
    }
  });

    // Kosongkan tampilan kalender
  function clearCalendar() {
    $('#calendar').html('');
    $('#event').html('');
    $('#today').html('');
  }

   // Kosongkan tampilan event
  function clearEvents() {
    $('#listevents').html('');
  }

  // Fungsi untuk menampilkan bulan di kalender
  function printMonth(activeYear, activeMonth, activeDay = 0) {
    clearCalendar();
     // Menambahkan struktur HTML untuk tampilan kalender bulan dan tahun
    $('#calendar')
      .append($('<div>').addClass('monthyear')
        .append($('<div>').attr('id', 'submonth').html('&laquo;')) // Tombol untuk mundur bulan
        .append($('<div>').attr('id', 'month').html(months[Number(activeMonth)][1] + ' ' + activeYear)) // Menampilkan nama bulan dan tahun
        .append($('<div>').attr('id', 'addmonth').html('&raquo;'))) // Tombol untuk maju bulan
      .append($('<div>').addClass('clear')) // Clear float
      .append($('<div>').addClass('days')) // Baris nama hari (S M T W T F S)
      .append($('<div>').attr('id', activeMonth + 'week1').addClass('weeks'))
      .append($('<div>').attr('id', activeMonth + 'week2').addClass('weeks'))
      .append($('<div>').attr('id', activeMonth + 'week3').addClass('weeks'))
      .append($('<div>').attr('id', activeMonth + 'week4').addClass('weeks'))
      .append($('<div>').attr('id', activeMonth + 'week5').addClass('weeks'))
      .append($('<div>').attr('id', activeMonth + 'week6').addClass('weeks'));

    // Menambahkan hari-hari dalam seminggu (S M T W T F S)
    $.each(days, function(index, daysInfo) {
      $('.days').append($('<div>').addClass(daysInfo[2]).html(daysInfo[1])); 
    });

    firstDayOfMonth = new Date(activeYear, activeMonth, 1);
    dowFirstDay = firstDayOfMonth.getDay(); // Mendapatkan hari pertama dalam minggu (0: Minggu, 6: Sabtu)
      // Membuat array untuk menyimpan hari-hari dalam minggu pertama bulan ini
    week = [];
    weekNumber = 1;
    day = 1;
    // Mengisi hari-hari minggu pertama setelah tanggal 1
    for(i = dowFirstDay; i <= 6; i++) {
      week[i] = day;
      day++;
    }
    var dayID;
    // Menambahkan hari-hari tersebut ke tampilan minggu pertama
    $.each(week, function (key, day) {
       dayID = day ? activeYear + '-' + months[Number(activeMonth)][0] + '-' + day : '';
      $('#' + activeMonth + 'week1')
        .append($('<div>').attr('id', dayID).addClass('day').html(day));
    });
 
    // Menambahkan sisa hari ke minggu berikutnya
    weekNumber = 2;
    var l = 0;
    for(k = day; k <= months[Number(activeMonth)][2]; k++) {
      if(day > months[Number(activeMonth)][2]) {
        day = 1;
      }
      if(l == 7) {
        weekNumber++;
        i = 0;
      }

      $('#' + activeMonth + 'week' + weekNumber)
        .append($('<div>').attr('id', activeYear + '-' + months[Number(activeMonth)][0] + '-' + day).addClass('day').html(day));

      // Jika hari yang dipilih, tambahkan highlight
      if(day == activeDay) {
        $('#' + activeYear + '-' + (activeMonth+1) + '-' + activeDay).addClass('highlightday');
        prevday = activeYear + '-' + (activeMonth+1) + '-' + activeDay;
      }
      day++;
      l++;
    }
  }

  // Fungsi untuk menampilkan event
  function printEvents() {
    clearEvents();
    var validEvent = false;
    //Year-month jika terdapat event
    if(!jQuery.isEmptyObject(events)) {
      $.each(events, function(monthYear, day) {
        var yearMonth = monthYear.split('-');
        $('#listevents').append($('<div>').attr('id', monthYear + 'month'));
        //Day
        $.each(day, function(key3, event) {
          $('#' + monthYear + 'month').append($('<div>').attr('id', key3 + 'day'));
          validEvent = false;
          $.each(event, function(key4, value) {
            //Same year, same month, and at least today or day later in month
            if(yearMonth[0] == Number(nowYear) && yearMonth[1] == Number(nowMonth) && key3 >= Number(nowDay)) {
              appendEditBox(key3 + 'day', yearMonth[0], yearMonth[1], key3, key4, value, false);
              validEvent = true;
            }
            //Same year but a future month
            if(yearMonth[0] == Number(nowYear) && yearMonth[1] > Number(nowMonth)) {
              appendEditBox(key3 + 'day', yearMonth[0], yearMonth[1], key3, key4, value, false);
              validEvent = true;
            }
            //A future year
            if(Number(yearMonth[0]) == (Number(nowYear)+1) && yearMonth[1] <= Number(nowMonth)) {
              appendEditBox(key3 + 'day', yearMonth[0], yearMonth[1], key3, key4, value, false);
              validEvent = true;
            }
          });
          if(validEvent) {
            $('#' + key3 + 'day').prepend($('<div>').addClass('eventday').html(months[Number(yearMonth[1])][1] + ' ' + key3 + ', ' + yearMonth[0]));
          }
        });
      });
    } else {
      $('#listevents').append($('<div>').html('<i>There are no events to display</i>'));
    }
  }

  // Fungsi untuk menambahkan kotak edit event
  function appendEditBox(id, y, m, d, i, content, displaydailies = false) {
    $('#' + id)
      .append($('<div>').addClass('textleft')
        .append($('<span>').click(function() { $(this).hide(); $(this).next().show(); }).html(content))
        .append($('<input>').attr('id', y + '-' + m + '-' + d + '-' + i ).change(function() {
          updateEvent($(this).attr('id'), $(this).val(), displaydailies);
            $(this).hide();
             $(this).prev().show();
              }).val(content).hide())
      );
  }

  // Fungsi untuk menambahkan event baru
  function addEvent(eventDate, eventMsg) {
    var ymd = eventDate.split('-');
    var y = ymd[0];
    var m = ymd[1];
    var d = ymd[2];

    // Jika tahun-bulan belum ada, buat baru
    if(!events[y + '-' + m]) {
      events[y + '-' + m] = {};
    }

    // Jika hari belum ada, buat baru dan tambahkan pesan
    if(!events[y + '-' + m][d]) {
      events[y + '-' + m][d] = [];
      events[y + '-' + m][d].push(eventMsg);
    } else { // Jika sudah ada, tambahkan pesan baru
      events[y + '-' + m][d].push(eventMsg);
    }

    // Kosongkan input setelah event ditambahkan
    $('#eventmsg').val('');
  }

  // Fungsi untuk memperbarui event
  function updateEvent(id, msg, displaydailies) {
    var vals = id.split('-'); // Memecah ID untuk mendapatkan tahun, bulan, hari, dan indeks event
    if (msg == '') {
      // Jika pesan kosong, periksa apakah ada event yang tersisa di hari tersebut
      delete events[vals[0] + '-' + vals[1]][vals[2]][vals[3]]; // Menghapus event
      // Periksa apakah tidak ada event di hari itu lagi
      if (Object.keys(events[vals[0] + '-' + vals[1]][vals[2]]).length === 0) {
        delete events[vals[0] + '-' + vals[1]][vals[2]]; // Hapus hari jika tidak ada event
      }
      // Jika tidak ada lagi hari dalam bulan tersebut, hapus bulan
      if (Object.keys(events[vals[0] + '-' + vals[1]]).length === 0) {
        delete events[vals[0] + '-' + vals[1]]; // Hapus bulan jika tidak ada event
      }
    } else {
      events[vals[0] + '-' + vals[1]][vals[2]][vals[3]] = msg; // Memperbarui event
    }
    // Menampilkan event harian jika displaydailies bernilai true, jika tidak, cetak semua event
    if (displaydailies) {
      showDailyEvents(activeYear, activeMonth, activeDay);
    } else {
      printEvents();
    }
  }
  

 // Fungsi untuk menampilkan event harian
  function showDailyEvents(y, m, d) {
    $('#today').html('');
    if(events[y + '-' + m]) {
      var dailyEvents = events[y + '-' + m][d];
      i = 0;
      if(dailyEvents) {
        $('#today').append($('<div>').addClass('todaytitle').html('What\'s happening today'));
      }
      $.each(dailyEvents, function(key, value) {
        appendEditBox('today', y, m, d, i, value, true);
        i++;
      })
    }
  }
});

//To-do list
$(document).ready(function() {
  // Menambahkan item ke to-do list
  $('#add-todo').click(function() {
    let task = $('#todo-input').val();
    if (task) {
      $('#todo-list').append(
        '<li><input type="checkbox" class="check-todo"> ' + task + '<button class="delete-todo">Delete</button></li>'
      );
      $('#todo-input').val(''); // Reset input
    }
  });

  // Menghapus item dari to-do list
  $(document).on('click', '.delete-todo', function() {
    $(this).parent().remove();
  });

  // Menandai item sebagai selesai atau belum selesai
  $(document).on('change', '.check-todo', function() {
    $(this).parent().toggleClass('checked'); // Tambah/kurangi class 'checked'
  });
});

