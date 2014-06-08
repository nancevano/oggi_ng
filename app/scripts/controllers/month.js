'use strict';

angular.module('oggiNgApp')
    .controller('MonthCtrl', ['$scope',
        function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.months = [
                'Januari',
                'Februari',
                'Maart',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Augustus',
                'September',
                'Oktober',
                'November',
                'December'
            ];

            $scope.daysShort = [
                'MA',
                'DI',
                'WO',
                'DO',
                'VR',
                'ZA',
                'ZO'
            ];

            $scope.curr_date = new Date();
            $scope.original_date = new Date();
            $scope.currentMonth = $scope.curr_date.getMonth();
            $scope.currentMonthFull =  $scope.months[$scope.currentMonth];
            $scope.currentYear = $scope.curr_date.getFullYear();

            $scope.previousMonth = function(){
                $scope.currentMonth = $scope.currentMonth != 0 ?  $scope.currentMonth - 1 : 11;
                $scope.curr_date.setMonth($scope.currentMonth);
                $scope.currentMonthFull =  $scope.months[$scope.currentMonth];

                switch($scope.currentMonth){
                    case 11:
                        $scope.currentYear = $scope.currentYear - 1;
                        break;
                    case 7:
                        $scope.currentYear = $scope.currentYear + 1;
                        break;
                }
                $scope.curr_date.setYear($scope.currentYear);
                $scope.createCalendar();
            };

            $scope.nextMonth = function(){
                $scope.currentMonth = $scope.currentMonth != 11 ?  $scope.currentMonth + 1 : 0;
                $scope.curr_date.setMonth($scope.currentMonth)
                $scope.currentMonthFull =  $scope.months[$scope.currentMonth];

                switch($scope.currentMonth){
                    case 0:
                        $scope.currentYear = $scope.currentYear + 1;
                        break;
                    case 8:
                        $scope.currentYear = $scope.currentYear - 1;
                        break;
                }
                $scope.curr_date.setYear($scope.currentYear);
                $scope.createCalendar();
            };

            $scope.createCalendar = function(){
                $scope.daysInMonth = [];

                var p_month = $scope.currentMonth == 0 ? 11 : $scope.currentMonth - 1;

                var fDay = new Date($scope.currentYear, $scope.currentMonth, 1);
                var lDay = new Date($scope.currentYear, $scope.currentMonth + 1, 0);
                var ndipm = new Date($scope.currentYear, p_month + 1, 0).getDate();

                var start = fDay.getDay() != 0 ? fDay.getDay() - 1 : 6;

                var dim = lDay.getDate();
                var dtd = Math.ceil((dim+start)/7) * 7;

                for(var q = 0; q <= 6; q++) {
                    $scope.daysInMonth.push({date: $scope.daysShort[q], class: 'header'});
                }

                for(var i = ndipm - start + 1; i <= ndipm; i++) {
                    $scope.daysInMonth.push({date: i, class: 'not-in-month'});
                }

                for(var a = 1; a <= dim; a++) {
                    var cls =   a == $scope.original_date.getDate() &&
                                $scope.original_date.getMonth() == $scope.currentMonth ?
                                'today' : 'in-month';
                    console.log($scope.original_date.getDate());
                    $scope.daysInMonth.push({date: a, class: cls});
                }

                for(var x = 1; x <= dtd - start - dim; x++) {
                    $scope.daysInMonth.push({date: x, class: 'not-in-month'});
                }
            }
        }
    ]);