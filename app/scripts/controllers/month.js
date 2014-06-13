'use strict';

angular.module('oggiApp.controllers')
    .controller('oggiApp.controllers.MonthCtrl', ['$scope', '$rootScope',
        function($scope, $rootScope) {
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
                    $scope.daysInMonth.push({
                            date: $scope.daysShort[q],
                            class:  'header',
                            link:   '#'
                        });
                }

                for(var i = ndipm - start + 1; i <= ndipm; i++) {
                    $scope.daysInMonth.push({
                        date:   i,
                        class:  'not-in-month',
                        link:   '#'
                    });
                }

                for(var a = 1; a <= dim; a++) {
                    var dd = ("0" + a).slice(-2);
                    var mm = ("0" + ($scope.currentMonth + 1)).slice(-2);
                    var link =  '#day/' + $scope.currentYear + '-' + mm + '-' + dd;
                    var cls =   a == $scope.original_date.getDate() &&
                                $scope.original_date.getMonth() == $scope.currentMonth ?
                                'today' : 'in-month';
                    $scope.daysInMonth.push({
                        date:   a,
                        class:  cls,
                        link:   link
                    });
                }

                for(var x = 1; x <= dtd - start - dim; x++) {
                    $scope.daysInMonth.push({
                        date:   x,
                        class:  'not-in-month',
                        link:   '#'
                    });
                }
            };

            $scope.reRouteDayview = function(e) {
                var t = e.target;
                var l = $(t).data('link');

                if(l != '#')window.location.href = l;
            };
        }
    ]);