var settings = angular.module('oggiApp.settings');

//END URL API WITH A SLASH
settings.constant('apiUrl', 'http://localhost/oggi_dev/web/app_dev.php/api/');
settings.constant('imgUrl', 'http://localhost/oggi_dev/web/');
settings.constant('calendarData', {
    months: [ 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
    days: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag' ]
});