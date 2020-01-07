//setDate
let nowTimestamp = Date.now()
let today = new Date(nowTimestamp)
var year = today.getFullYear()
var month = today.getMonth()+1
var date = today.getDate()
var time = date + '/' + month + '/' + year
$('#date').html(time)


//set Whatsapp value on the right side
const urlCountWhatsApp = "http://***/api/calls/countWhatsApp"
$.ajax({
    url: urlCountWhatsApp, 
    method: 'POST',
    data: JSON.stringify({ userID : userID }),
    contentType:"application/json; charset=utf-8",
    dataType:"json"
}).done(function(msg){
    console.log(msg)
    $('#whatsappCounter').html(msg)
}).fail(function( jqXHR, textStatus ) {
    console.log( "Request failed: " + textStatus );
})


//set values on the rigth side
const urlTodayCalls = "http://***/api/calls/todayCalls"
$.ajax({
    url: urlTodayCalls,
  method: 'POST',
  data: JSON.stringify({ userID : userID }),
  contentType:"application/json; charset=utf-8",
  dataType:"json"
}).done(function( msg ) {
        console.log(msg)
        
        $('#type0').html(msg[0])
        $('#type1').html(msg[1])
        $('#type2').html(msg[2])
        $('#type3').html(msg[3])
        $('#type4').html(msg[4])
        $('#type5').html(msg[5])
        $('#type6').html(msg[6])
        $('#type7').html(msg[7])
        $('#type8').html(msg[8])
        $('#type9').html(msg[9])
        $('#type10').html(msg[10])
        $('#type11').html(msg[11])
        $('#type12').html(msg[12])
    }).fail(function( jqXHR, textStatus ) {
            console.log( "Request failed: " + textStatus )
})


//set week values for the bottom side
const urlWeekCalls = "http://***/api/calls/thisWeek"
$.ajax({
    url: urlWeekCalls,
    method: 'POST',
    data: JSON.stringify({ userID : userID }),
    contentType:"application/json; charset=utf-8",
    dataType:"json"
}).done(function( msg ){
    $('#week0').html(msg[0])
    $('#week1').html(msg[1])
    $('#week2').html(msg[2])
    $('#week3').html(msg[3])
    $('#week4').html(msg[4])
    $('#week5').html(msg[5])
    $('#week6').html(msg[6])
    $('#weekAll').html(msg[7])

    let x = msg[0]/msg[7]*100
    $('#percent0').html(x.toFixed(0) + '%')
    x = msg[1]/msg[7]*100
    $('#percent1').html(x.toFixed(0) + '%')
    x = msg[2]/msg[7]*100
    $('#percent2').html(x.toFixed(0) + '%')
    x = msg[3]/msg[7]*100
    $('#percent3').html(x.toFixed(0) + '%')
    x = msg[4]/msg[7]*100
    $('#percent4').html(x.toFixed(0) + '%')
    x = msg[5]/msg[7]*100
    $('#percent5').html(x.toFixed(0) + '%')
    x = msg[6]/msg[7]*100
    $('#percent6').html(x.toFixed(0) + '%')
}).fail(function (jqXHR, textStatus){
        console.log( "Request failed: " + textStatus )
})



let btnNewCall = document.getElementById('btnNewCall')
let centerContainer = document.getElementById('centerContainer')

btnNewCall.addEventListener('click', () =>{
    centerContainer.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center">

                                    <div dir="rtl">
                                        <input type="checkbox" id="newCustomerCheck" class="m-3">ליד חדש
                                    </div>
                                    <select dir="rtl" id="dropdown" class="m-3">
                                        
                                    </select>

                                    <div dir="rtl" id="messageSentCheckbox">
                                        <input type="checkbox" id="messageSent" class="m-3">נשלחה הודעה
                                    </div>
                                    <button id="btnAddCall" class="btn btn-warning m-3">
                                        <span class="text-secondary">שלח</span>
                                    </button>
                                </div>`
    
    let dropdown = document.getElementById('dropdown')
    let options = [{"typeID":0,"typeName":""},
                    {"typeID":1,"typeName":"לא עונה 1"},
                    {"typeID":2,"typeName":"לא עונה 2"},
                    {"typeID":3,"typeName":"מתלבטים"},
                    {"typeID":4,"typeName":"נקבעה פגישה"},
                    {"typeID":5,"typeName":"לא מעוניין"},
                    {"typeID":6,"typeName":"לא מתייאשים"},
                    {"typeID":7,"typeName":"לא רלוונטי - לא אזרח"},
                    {"typeID":8,"typeName":"לא רלוונטי - הכרה"},
                    {"typeID":9,"typeName":"לא רלוונטי - טעות"},
                    {"typeID":10,"typeName":"לא רלוונטי - משפטי"},
                    {"typeID":11,"typeName":"לא רלוונטי - חד מיניים"},
                    {"typeID":12,"typeName":"לא רלוונטי - הלכתי"}]

    for (let i = 0; i < options.length; i++) {
        let opt = options[i]
        let el = document.createElement('option')
        el.textContent = opt.typeName
        el.value = opt.typeID
        dropdown.appendChild(el)    
    }
    

    let val =  $("#dropdown").val()
    dropdown.addEventListener('change', function(){
        val =  $("#dropdown").val()
        if (val == 1 || val == 2 || val == 6){
            document.getElementById('messageSentCheckbox').style.visibility = 'visible'
        }else{
            document.getElementById('messageSentCheckbox').style.visibility = 'hidden'
        }
    })


    let btnAddCall = document.getElementById('btnAddCall')
    btnAddCall.addEventListener('click', () =>{
        const url = "http://***/api/calls/"

        if ($('#newCustomerCheck').prop('checked')){
            newCustomer = 1
        }else{
            newCustomer = 0
        }

        if ($('#messageSent').prop('checked')){
            messageSent = 1
        }else{
            messageSent = 0
        }

        if (val == 0){
            return alert('נא תבחר את הסטטוס')
        }

        let json = {"typeID": val, "userID": userID, "newCustomer": newCustomer, "messageSent": messageSent}

        $.post(url, json, function(data, status){
            window.location.reload()
        })
    })


})


let gotNewMessage = document.getElementById('gotNewMessage')
gotNewMessage.addEventListener('click', () => {
    const urlNewWhatsApp = "http://***/api/calls/newWhatsApp"
    const jsonNewWhatsApp = {"userID": userID}

    $.post(urlNewWhatsApp, jsonNewWhatsApp, function(data, status){
        window.location.reload()
    })
})