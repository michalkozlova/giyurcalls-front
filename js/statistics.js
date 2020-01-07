const urlAllCalls = "http://3.16.89.108:3000/api/statistics/fullForDates"
const urlNotRelevantCalls = "http://3.16.89.108:3000/api/statistics/notRelevantForDates"
const urlWASentMessages = "http://3.16.89.108:3000/api/statistics/sentMessages"
const urlWAReceivedMessages = "http://3.16.89.108:3000/api/statistics/receivedMessages"


const urlNewLeadsAllCalls = "http://3.16.89.108:3000/api/statistics/newForDates"
const urlNewNotRelevantCalls = "http://3.16.89.108:3000/api/statistics/newNotRelevantForDates"

const urlMeetings = "http://3.16.89.108:3000/api/meetings/getMeetingAmount"

let fromDate = 1578175200000
let toDate = Date.now()


window.start = datepicker('.start', { 
    id: 1,
    onSelect: instance => {
        let date = new Date(instance.dateSelected)
        fromDate = date.getTime()
    },
    formatter: (input, date, instance) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let day = date.getDate()
        let month = months[date.getMonth()]
        let year = date.getFullYear()
        input.value = `${day} ${month} ${year}`
    },
    minDate: new Date(2019, 7, 1)
})
window.end = datepicker('.end', { 
    id: 1,
    onSelect: instance => {
        console.log(instance.dateSelected)
        let date = new Date(instance.dateSelected)
        toDate = date.getTime()+86400000
    },
    formatter: (input, date, instance) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let day = date.getDate()
        let month = months[date.getMonth()]
        let year = date.getFullYear()
        input.value = `${day} ${month} ${year}`
    }
})
start.hide()
end.hide()


let setDates = document.getElementById('setDates')
setDates.addEventListener('click', () => {

    if ($('#newCustomerCheck').prop('checked')){
        getData(urlNewLeadsAllCalls, urlNewNotRelevantCalls, urlWASentMessages, urlWAReceivedMessages, urlMeetings)
    }else{
        getData(urlAllCalls, urlNotRelevantCalls, urlWASentMessages, urlWAReceivedMessages, urlMeetings)
    }

})


function getData(url1, url2, url3, url4, url5){
    let today = new Date(fromDate)
    var year = today.getFullYear()
    var month = today.getMonth()+1
    var date = today.getDate()
    console.log('from: ' + date + '/' + month + '/' + year)

    today = new Date(toDate)
    year = today.getFullYear()
    month = today.getMonth()+1
    date = today.getDate()
    console.log('to: ' + date + '/' + month + '/' + year)

    $.ajax({
        url: url1,
        method: 'POST',
        data: JSON.stringify({ fromDate : fromDate, toDate : toDate }),
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    }).done(function(msg){
        let tamarSum = msg[0][0]+msg[0][1]+msg[0][2]+msg[0][3]+msg[0][4]+msg[0][5]+msg[0][6]+msg[0][7]+msg[0][8]+msg[0][9]+msg[0][10]+msg[0][11]
        let danaSum = msg[1][0]+msg[1][1]+msg[1][2]+msg[1][3]+msg[1][4]+msg[1][5]+msg[1][6]+msg[1][7]+msg[1][8]+msg[1][9]+msg[1][10]+msg[1][11]
        let allSum = msg[2][0]+msg[2][1]+msg[2][2]+msg[2][3]+msg[2][4]+msg[2][5]+msg[2][6]+msg[2][7]+msg[2][8]+msg[2][9]+msg[2][10]+msg[2][11]


        $('#tamarMeta0').html(msg[0][3])
        $('#tamarMeta1').html(msg[0][2] + msg[0][4])
        $('#tamarMeta2').html(msg[0][6]+msg[0][7]+msg[0][8]+msg[0][9]+msg[0][10]+msg[0][11])
        $('#tamarMeta3').html(msg[0][0] + msg[0][1] + msg[0][5])
        $('#tamarMeta4').html(tamarSum)

        $('#danaMeta0').html(msg[1][3])
        $('#danaMeta1').html(msg[1][2] + msg[1][4])
        $('#danaMeta2').html(msg[1][6]+msg[1][7]+msg[1][8]+msg[1][9]+msg[1][10]+msg[1][11])
        $('#danaMeta3').html(msg[1][0] + msg[1][1] + msg[1][5])
        $('#danaMeta4').html(danaSum)

        $('#allMeta0').html(msg[2][3])
        $('#allMeta1').html(msg[2][2] + msg[2][4])
        $('#allMeta2').html(msg[2][6]+msg[2][7]+msg[2][8]+msg[2][9]+msg[2][10]+msg[2][11])
        $('#allMeta3').html(msg[2][0] + msg[2][1] + msg[2][5])
        $('#allMeta4').html(allSum)

        let x = msg[2][3]/allSum*100
        $('#perMeta0').html(x.toFixed(0) + '%')
        x = (msg[2][2] + msg[2][4])/allSum*100
        $('#perMeta1').html(x.toFixed(0) + '%')
        x = (msg[2][6]+msg[2][7]+msg[2][8]+msg[2][9]+msg[2][10]+msg[2][11])/allSum*100
        $('#perMeta2').html(x.toFixed(0) + '%')
        x = (msg[2][0] + msg[2][1] + msg[2][5])/allSum*100
        $('#perMeta3').html(x.toFixed(0) + '%')


        $('#tamar0').html(msg[0][0])
        $('#tamar1').html(msg[0][1])
        $('#tamar2').html(msg[0][2])
        $('#tamar3').html(msg[0][3])
        $('#tamar4').html(msg[0][4])
        $('#tamar5').html(msg[0][5])
        $('#tamar6').html(msg[0][6]+msg[0][7]+msg[0][8]+msg[0][9]+msg[0][10]+msg[0][11])
        $('#tamar7').html(tamarSum)

        $('#dana0').html(msg[1][0])
        $('#dana1').html(msg[1][1])
        $('#dana2').html(msg[1][2])
        $('#dana3').html(msg[1][3])
        $('#dana4').html(msg[1][4])
        $('#dana5').html(msg[1][5])
        $('#dana6').html(msg[1][6]+msg[1][7]+msg[1][8]+msg[1][9]+msg[1][10]+msg[1][11])
        $('#dana7').html(danaSum)
        
        $('#all0').html(msg[2][0])
        $('#all1').html(msg[2][1])
        $('#all2').html(msg[2][2])
        $('#all3').html(msg[2][3])
        $('#all4').html(msg[2][4])
        $('#all5').html(msg[2][5])
        $('#all6').html(msg[2][6]+msg[2][7]+msg[2][8]+msg[2][9]+msg[2][10]+msg[2][11])
        $('#all7').html(allSum)

        x = msg[2][0]/allSum*100
        $('#per0').html(x.toFixed(0) + '%')
        x = msg[2][1]/allSum*100
        $('#per1').html(x.toFixed(0) + '%')
        x = msg[2][2]/allSum*100
        $('#per2').html(x.toFixed(0) + '%')
        x = msg[2][3]/allSum*100
        $('#per3').html(x.toFixed(0) + '%')
        x = msg[2][4]/allSum*100
        $('#per4').html(x.toFixed(0) + '%')
        x = msg[2][5]/allSum*100
        $('#per5').html(x.toFixed(0) + '%')
        x = (msg[2][6]+msg[2][7]+msg[2][8]+msg[2][9]+msg[2][10]+msg[2][11])/allSum*100
        $('#per6').html(x.toFixed(0) + '%')
    }).fail(function( jqXHR, textStatus ) {
        console.log( "Request failed: " + textStatus )
    })





    $.ajax({
        url: url2,
        method: 'POST',
        data: JSON.stringify({ fromDate : fromDate, toDate : toDate }),
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    }).done(function(msg){
        $('#tamarNotRel0').html(msg[0][0])
        $('#tamarNotRel1').html(msg[0][1])
        $('#tamarNotRel2').html(msg[0][2])
        $('#tamarNotRel3').html(msg[0][3])
        $('#tamarNotRel4').html(msg[0][4])
        $('#tamarNotRel5').html(msg[0][5])

        $('#danaNotRel0').html(msg[1][0])
        $('#danaNotRel1').html(msg[1][1])
        $('#danaNotRel2').html(msg[1][2])
        $('#danaNotRel3').html(msg[1][3])
        $('#danaNotRel4').html(msg[1][4])
        $('#danaNotRel5').html(msg[1][5])

        $('#allNotRel0').html(msg[2][0])
        $('#allNotRel1').html(msg[2][1])
        $('#allNotRel2').html(msg[2][2])
        $('#allNotRel3').html(msg[2][3])
        $('#allNotRel4').html(msg[2][4])
        $('#allNotRel5').html(msg[2][5])

        let sum = msg[2][0] + msg[2][1] + msg[2][2] + msg[2][3] + msg[2][4] + msg[2][5]

        let x = msg[2][0]/sum*100
        $('#perNotRel0').html(x.toFixed(0) + '%')
        x = msg[2][1]/sum*100
        $('#perNotRel1').html(x.toFixed(0) + '%')
        x = msg[2][2]/sum*100
        $('#perNotRel2').html(x.toFixed(0) + '%')
        x = msg[2][3]/sum*100
        $('#perNotRel3').html(x.toFixed(0) + '%')
        x = msg[2][4]/sum*100
        $('#perNotRel4').html(x.toFixed(0) + '%')
        x = msg[2][5]/sum*100
        $('#perNotRel5').html(x.toFixed(0) + '%')

    }).fail(function( jqXHR, textStatus ) {
        console.log( "Request failed: " + textStatus )
    })




    $.ajax({
        url: url3,
        method: 'POST',
        data: JSON.stringify({ fromDate : fromDate, toDate : toDate }),
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    }).done(function(msg){
        $('#tamarWA0').html(msg[0])
        $('#danaWA0').html(msg[1])
        $('#allWA0').html(msg[0] + msg[1])
    
    }).fail(function( jqXHR, textStatus ) {
        console.log( "Request failed: " + textStatus )
    })



    $.ajax({
        url: url4,
        method: 'POST',
        data: JSON.stringify({ fromDate : fromDate, toDate : toDate }),
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    }).done(function(msg){
        $('#tamarWA1').html(msg[0])
        $('#danaWA1').html(msg[1])
        $('#allWA1').html(msg[0] + msg[1])
    
    }).fail(function( jqXHR, textStatus ) {
        console.log( "Request failed: " + textStatus )
    })


    $.ajax({
        url: url5,
        method: 'POST',
        data: JSON.stringify({ fromDate : fromDate, toDate : toDate }),
        contentType:"application/json; charset=utf-8",
        dataType:"json"
    }).done(function(msg){
        $('#meetA0').html(msg[0][0])
        $('#meetA1').html(msg[0][1])
        $('#meetA2').html(msg[0][2])
        $('#meetA3').html(msg[0][3])

        $('#meetH0').html(msg[1][0])
        $('#meetH1').html(msg[1][1])
        $('#meetH2').html(msg[1][2])
        $('#meetH3').html(msg[1][3])

        $('#meetJ0').html(msg[2][0])
        $('#meetJ1').html(msg[2][1])
        $('#meetJ2').html(msg[2][2])
        $('#meetJ3').html(msg[2][3])

        $('#meetT0').html(msg[3][0])
        $('#meetT1').html(msg[3][1])
        $('#meetT2').html(msg[3][2])
        $('#meetT3').html(msg[3][3])

        $('#allMeet0').html(msg[0][0] + msg[1][0] + msg[2][0] + msg[3][0])
        $('#allMeet1').html(msg[0][1] + msg[1][1] + msg[2][1] + msg[3][1])
        $('#allMeet2').html(msg[0][2] + msg[1][2] + msg[2][2] + msg[3][2])
        $('#allMeet3').html(msg[0][3] + msg[1][3] + msg[2][3] + msg[3][3])
    }).fail(function( jqXHR, textStatus ) {
        console.log( "Meetings request failed: " + textStatus)
    })
}

getData(urlAllCalls, urlNotRelevantCalls, urlWASentMessages, urlWAReceivedMessages, urlMeetings)

