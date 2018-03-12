$(document).ready(function()
{
    var dayList = function(){
        var $dayList = $('.days'),
            $weekdayList = $('.weekdays'),
            $monthYear =$('.month_year'),
            $prevMonth =$('.monthButtonPrev'),
            $nextMonth =$('.monthButtonNext'),

            showWeekDays = false;
        

        var dateNow = new Date();
        var current_month = dateNow.getMonth(),
            current_day = dateNow.getDate(),
            current_year = dateNow.getFullYear();

        // names of months and week days.
        var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
        //var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
        var dayNames = ["Sun","Mon","Tue","Wed","Thr","Fri", "Sat"];
        var dayPerMonth = ["31",february() ,"31","30","31","30","31","31","30","31","30","31"];
        

        function february(){
            //Determing if February (28,or 29)
            if ( (current_year%100!=0) && (current_year%4==0) || (current_year%400==0)){
                return "29";
           }else{
                return  "28";
           }
        }
        function displayCalendar(){
            
            $monthYear.append( monthNames[current_month] + "<br> <span >"+current_year+"</span>");            

            if (!showWeekDays){
                for ( wd = 0; wd < dayNames.length; wd ++){
                    $weekdayList.append("<li>"+dayNames[wd]+"</li>");
                }
                showWeekDays = true;
            }
            
            var prevDate = new Date((current_month+1) +' 1 ,'+current_year);
            console.log(prevDate);
            for (previous_day = prevDate.getDay(); previous_day > 0; previous_day -- ){
                if (current_month == 0 ){
                    $dayList.append("<li class = 'day_prev'>"+(dayPerMonth[11] - previous_day + 1)+"</li>");
                }else{        
                    $dayList.append("<li class = 'day_prev'>"+(dayPerMonth[prevDate.getMonth()-1] - previous_day + 1)+"</li>");
                }
            }
            
            for( day = 1; day <= dayPerMonth[current_month]; day ++){
                if (current_day == day){
                    $dayList.append("<li><span class = 'active'>"+day+"</span></li>");
                }
                else{    
                    $dayList.append("<li>"+day+"</li>");
                }
            }

            var next_day = 1;
            if (($('li').length - 7) > 35){
                while ($('li').length-7 < 42){
                    $dayList.append("<li class = 'day_next'>"+next_day+"</li>");
                    next_day ++;
                }
            }else{    
                while ($('li').length-7 < 35){
                    $dayList.append("<li class = 'day_next'>"+next_day+"</li>");
                    next_day ++;
                }
            }
            
        }
        
        function clearDays(){
            $dayList.empty();
            $monthYear.empty();
        }
        function bindEvents(){
            displayCalendar();

            $prevMonth.on('click', function(){
                clearDays();
                if (current_month > 0){
                    current_month --;
                }
                else{
                    current_month = 11;
                    current_year --;
                }
                displayCalendar();
            });
            
            $nextMonth.on('click', function(){
                clearDays();
            
                if (current_month < 11){
                    current_month ++;
                }
                else{
                    current_month = 0;
                    current_year  ++;
                }
                displayCalendar();
            });
        }
        bindEvents();
    };
    dayList();    
});
