var settings = angular.module('oggiApp.settings');

//END URL API WITH A SLASH
settings.constant('apiUrl', 'http://localhost/oggi_dev/web/app_dev.php/api/');
settings.constant('imgUrl', 'http://localhost/oggi_dev/web/');
settings.constant('calendarData', {
    days: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag' ],
    daysShort: ['ZO', 'MA', 'DI', 'WO', 'DO', 'VR', 'ZA'],
    months: [ 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
    monthsShort: ['Jan.', 'Feb.', 'Mrt.', 'Apr.', 'Mei.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dec.']
});