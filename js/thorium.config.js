/*!
 * Thorium Initialization for framework7 projects
 * Version 2.0.0 june, 2020
 * framework7 v5.x (https://framework7.io) MIT Licensed
 * Copyright 2018-2020 Thorium builder, All Rights Reserved.
*/
const kDebugMessagesLevel= 1;
const kHybridAppsLog = true;
const kLocalRoot = "http://localhost:8080/dbexpressfeatures/";
const kMediaRoot = './db/dbassets/';
const kRemoteHost="";
const kTimeOut =6000;
const kCrossDomain =false;
const kAuthMode =0;
const kWebShareApi =true;
const kAutoClosePanels =true;
const kDesktopAllowed =true;
const kOneSignalAppId="";
const kTheme=null;
const kCustomColor='rgb(33,150,243)';
const kFillMode=false;

const kPhotoBrowserBackLinkText="Close";
const kPhotoBrowserTheme="dark";
const kPhotoBrowserEffect="slide";
const kPhotoBrowserAutoPlay="";

const kForceInstall = true;
const kAddToHomeScreenIos = false;
const kAddToHomeScreenMd = false;
const kSkipButton=false;
const kSkipButtonText="";
const kAddToHomeScreenTitle="";
const kAddToHomeScreenMdText="Click on the button #ICON at the top of the screen, and select the \'Add to Home Screen\' menu";
const kAddToHomeScreenIosText="";
const kImgMaxSize=10;
const kDocMaxSize=10;
const kMultilingual=false;

/*-- Dates --*/
const kDateFormat="mm.dd.yyyy"; //"mm.dd.yyyy";
const kDateTimeFormat="mm.dd.yyyy hh::mm a"; //"mm.dd.yyyy hh::mm a";
const kHours12=true;
const kdayNames=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const kdayNamesShort=['sun','mon','tue','wed','thu','fri','sat'];
const kmonthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
const kmonthNamesShort=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/*-- eCommerce dbExpress Default --*/
const kDbExpressEcommerce = false;
const kDbExpressSocial = false;
const kDeliveryAmount="0";
const kCurrencySymbol= "$";  
const kCurrencyLeftSide= false; 


/*-- dbExpress Additional Strings --*/
const kLogout="Logout";
const kEmailSent="A Message has been sent to your email address";

/*-- dbExpress API --*/
const kApiRoot="db/webservices/";
const kAuthManagerApi="thorium.auth.signin.php";
const kGetDataApi="thorium.data.get.php";
const kSetDataApi="thorium.data.set.php";
const kRegisterApi ="thorium.auth.register.php";
const kSetProfileApi ="thorium.auth.set.php";
const kGetProfileApi ="thorium.auth.get.php";
const kSetShoppingCartQtyApi ="thorium.cart.qty.php";
const kGetShoppingCartApi ="thorium.cart.get.php";
const kSetShoppingCartApi ="thorium.cart.set.php";
const kSetOrderApi ="thorium.order.set.php";
const kSignOutApi ="thorium.auth.signout.php";
const kDeleteDataApi ="thorium.data.delete.php";
const kClearShoppingCartApi ="thorium.cart.clear.php";
const kgetChatMessages="thorium.chat.get.php";
const ksetChatMessages="thorium.chat.set.php"; 
const kresetPassword="thorium.auth.resetpassword.php";

const kTextEditorButtons=[
    ['bold', 'italic', 'underline', 'strikeThrough'],
    ['alignLeft', 'alignCenter', 'alignRight'],
    ['indent', 'outdent'],
  ];

const kMode=""; //cors, no-cors, same-origin
const kCache=""; //default, no-cache, reload, force-cache, only-if-cached
const kCredentials=""; //include, same-origin, omit
const kContenttype=""; //application/json, application/x-www-form-urlencoded ...
const kRedirect=""; //manual, follow, error
const kReferrerpolicy=""; //no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
const kAuthorization=""; //'Authorization': 'Basic xxxxx'




var $ = Dom7; 
var routes = [
{
    path: '/',
    url: './index.html',
    name: 'index',
},
{
    path: '/repeater_infinitescroll/',
    url: './pages/repeater_infinitescroll.html?r=16898',
    name: 'repeater_infinitescroll',
},
{
    path: '/repeater_horizontal/',
    url: './pages/repeater_horizontal.html?r=93909',
    name: 'repeater_horizontal',
},
{
    path: '/linked_repeaters/',
    url: './pages/linked_repeaters.html?r=53546',
    name: 'linked_repeaters',
},
{
    path: '/repeater_customtemplate/',
    url: './pages/repeater_customtemplate.html?r=13183',
    name: 'repeater_customtemplate',
},
{
    path: '/repeater_with_detail/',
    url: './pages/repeater_with_detail.html?r=57768',
    name: 'repeater_with_detail',
},
{
    path: '/repeater_detail/',
    url: './pages/repeater_detail.html?r=98300',
    name: 'repeater_detail',
},
{
    path: '/repeater_pulltorefresh/',
    url: './pages/repeater_pulltorefresh.html?r=53884',
    name: 'repeater_pulltorefresh',
},
{
    path: '/repeater_filter_button/',
    url: './pages/repeater_filter_button.html?r=17574',
    name: 'repeater_filter_button',
},
{
    path: '/repeater_sortbyfield/',
    url: './pages/repeater_sortbyfield.html?r=62159',
    name: 'repeater_sortbyfield',
},
{
    path: '/repeater_userlist/',
    url: './pages/repeater_userlist.html?r=17743',
    name: 'repeater_userlist',
},
{
    path: '/user_detail/',
    url: './pages/user_detail.html?r=58275',
    name: 'user_detail',
},
{
    path: '/map_routes/',
    url: './pages/map_routes.html?r=98807',
    name: 'map_routes',
},
{
    path: '/map_routes_detail/',
    url: './pages/map_routes_detail.html?r=58444',
    name: 'map_routes_detail',
},
{
    path: '/maps_leaflet/',
    url: './pages/maps_leaflet.html?r=14028',
    name: 'maps_leaflet',
},
{
    path: '/repeater_datatypes/',
    url: './pages/repeater_datatypes.html?r=54560',
    name: 'repeater_datatypes',
},
{
    path: '/datatypes_displayer/',
    url: './pages/datatypes_displayer.html?r=10143',
    name: 'datatypes_displayer',
},
{
    path: '/repeater_api/',
    url: './pages/repeater_api.html?r=58782',
    name: 'repeater_api',
},
{
    path: '/displayer_deleteitem/',
    url: './pages/displayer_deleteitem.html?r=26525',
    name: 'displayer_deleteitem',
},
{
    path: '/forms_addrecord_text/',
    url: './pages/forms_addrecord_text.html?r=75163',
    name: 'forms_addrecord_text',
},
{
    path: '/form_parenttable/',
    url: './pages/form_parenttable.html?r=34800',
    name: 'form_parenttable',
},
{
    path: '/forms_addrecord_numeric/',
    url: './pages/forms_addrecord_numeric.html?r=83439',
    name: 'forms_addrecord_numeric',
},
{
    path: '/forms_addrecord_datetime/',
    url: './pages/forms_addrecord_datetime.html?r=47129',
    name: 'forms_addrecord_datetime',
},
{
    path: '/forms_boolean/',
    url: './pages/forms_boolean.html?r=95767',
    name: 'forms_boolean',
},
{
    path: '/repeater_parentlist/',
    url: './pages/repeater_parentlist.html?r=55404',
    name: 'repeater_parentlist',
},
{
    path: '/displayer_parent_childs/',
    url: './pages/displayer_parent_childs.html?r=15041',
    name: 'displayer_parent_childs',
},
{
    path: '/repeter_searchbox/',
    url: './pages/repeter_searchbox.html?r=67733',
    name: 'repeter_searchbox',
},
{
    path: '(.*)',
    url: './pages/404.html',
},
];



Framework7.use(Framework7Keypad);

var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}
var app = new Framework7({
    "version": "1.0.0",
    "id": "com.thorium.thorium_dbexpress",
    "root": "#app",
    "theme": theme,
    "autoDarkTheme": false,
    "language": "en",
    "routes": routes,
    "name": "Thorium dbExpress",
    "initOnDeviceReady": true,
    "init": true,
    "iosTranslucentBars": true,
    "iosTranslucentModals": true,
    "touch": {
        "disableContextMenu": true,
        "tapHold": false,
        "tapHoldDelay": 2,
        "tapHoldPreventClicks": false,
        "activeState": true,
        "activeStateElements": "a, button, label, span, .actions-button",
        "materialRipple": true,
        "iosTouchRipple": false,
        "materialRippleElements": ".ripple, .link, .item-link, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell, .notification-close-button"
    },
    "clicks": {
        "externalLinks": ".external"
    },
    "statusbar": {
        "enabled": "true",
        "overlay": "auto",
        "scrollTopOnClick": true,
        "iosOverlaysWebView": true,
        "iosTextColor": "black",
        "iosBackgroundColor": "white",
        "materialBackgroundColor": null
    },
    "view": {
        "main": true,
        "router": true,
        "reloadAll": true,
        "stackPages": true,
        "reloadPages": false,
        "reloadDetail": true,
        "keepAlive": false,
        "linksView": null,
        "xhrCache": true,
        "xhrCacheIgnore": [],
        "xhrCacheIgnoreGetParameters": false,
        "xhrCacheDuration": 600000,
        "preloadPreviousPage": true,
        "uniqueHistory": false,
        "uniqueHistoryIgnoreGetParameters": false,
        "allowDuplicateUrls": false,
        "removeElements": true,
        "removeElementsWithTimeout": false,
        "removeElementsTimeout": 0,
        "restoreScrollTopOnBack": true,
        "unloadTabContent": true,
        "iosSwipeBack": true,
        "iosSwipeBackAnimateShadow": true,
        "iosSwipeBackAnimateOpacity": false,
        "iosSwipeBackActiveArea": 30,
        "iosSwipeBackThreshold": 0,
        "pushState": false,
        "pushStateAnimate": true,
        "pushStateAnimateOnLoad": true,
        "pushStateSeparator": "#!",
        "pushStateOnLoad": false,
        "animate": true,
        "animateWithJS": false,
        "iosDynamicNavbar": false,
        "iosSeparateDynamicNavbar": true,
        "iosAnimateNavbarBackIcon": true,
        "iosPageLoadDelay": 0,
        "materialPageLoadDelay": 0
    },
    "navbar": {
        "scrollTopOnTitleClick": true,
        "iosCenterTitle": true,
        "hideOnPageScroll": false,
        "showOnPageScrollEnd": true,
        "showOnPageScrollTop": true
    },
    "toolbar": {
        "hideOnPageScroll": false,
        "showOnPageScrollEnd": true,
        "showOnPageScrollTop": true
    },
    "modal": {
        "moveToRoot": true,
        "queueDialogs": true
    },
    "dialog": {
        "buttonOk": "OK",
        "buttonCancel": "Cancel",
        "usernamePlaceholder": "Username",
        "passwordPlaceholder": "Password",
        "preloaderTitle": "Loading... ",
        "progressTitle": "Loading... ",
        "closeByBackdropClick": false
    },
    "popup": {
        "backdrop": true,
        "closeByBackdropClick": true
    },
    "popover": {
        "closeByBackdropClick": true,
        "closeByOutsideClick": true,
        "backdrop": true
    },
    "actions": {
        "convertToPopover": true,
        "forceToPopover": false,
        "closeByBackdropClick": true,
        "render": null,
        "renderPopover": null,
        "backdrop": true
    },
    "sheet": {
        "closeByBackdropClick": true,
        "closeByOutsideClick": false
    },
    "toast": {
        "icon": null,
        "text": null,
        "position": "bottom",
        "closeButton": false,
        "closeButtonColor": null,
        "closeButtonText": "Ok",
        "closeTimeout": null,
        "cssClass": null,
        "render": null
    },
    "sortable": false,
    "swipeout": {
        "actionsNoFold": false,
        "noFollow": false,
        "removeElements": true,
        "removeElementsWithTimeout": false,
        "removeElementsTimeout": 0
    },
    "panel": {
        "leftBreakpoint": 0,
        "rightBreakpoint": 0,
        "swipeActiveArea": 0,
        "swipeCloseOpposite": true,
        "swipeOnlyClose": true,
        "swipeNoFollow": false,
        "swipeThreshold": 0,
        "closeByBackdropClick": true
    },
    "input": {
        "scrollIntoViewOnFocus": false,
        "scrollIntoViewCentered": false
    },
    "smartSelect": {
        "openIn": "page",
        "pageBackLinkText": "Back",
        "popupCloseLinkText": "Close",
        "sheetCloseLinkText": "Done",
        "searchbar": false,
        "searchbarPlaceholder": "Search",
        "searchbarDisableText": "Cancel",
        "closeOnSelect": false,
        "virtualList": false,
        "routableModals": true,
        "url": "select/"
    },
    "calendar": {
        "monthNames": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        "monthNamesShort": [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        "dayNames": [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "dayNamesShort": [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        "firstDay": 1,
        "weekendDays": [
            0,
            6
        ],
        "multiple": false,
        "rangePicker": false,
        "dateFormat": kDateFormat,
        "direction": "horizontal",
        "minDate": null,
        "maxDate": null,
        "disabled": null,
        "events": null,
        "rangesClasses": null,
        "touchMove": true,
        "animate": true,
        "closeOnSelect": false,
        "monthSelector": true,
        "yearSelector": true,
        "weekHeader": true,
        "value": null,
        "containerEl": null,
        "openIn": "auto",
        "formatValue": null,
        "inputEl": null,
        "inputReadOnly": false,
        "closeByOutsideClick": true,
        "scrollToInput": true,
        "header": false,
        "headerPlaceholder": "Select date",
        "footer": false,
        "toolbar": true,
        "toolbarCloseText": "Done",
        "cssClass": null,
        "routableModals": true,
        "view": null,
        "url": "date/",
        "renderWeekHeader": null,
        "renderMonths": null,
        "renderMonth": null,
        "renderMonthSelector": null,
        "renderYearSelector": null,
        "renderHeader": null,
        "renderFooter": null,
        "renderToolbar": null,
        "renderInline": null,
        "renderPopover": null,
        "renderSheet": null,
        "render": null
    },
    "picker": {
        "updateValuesOnMomentum": false,
        "updateValuesOnTouchmove": true,
        "rotateEffect": false,
        "momentumRatio": 7,
        "freeMode": false,
        "cols": [],
        "containerEl": null,
        "openIn": "auto",
        "formatValue": null,
        "inputEl": null,
        "inputReadOnly": true,
        "closeByOutsideClick": true,
        "scrollToInput": true,
        "toolbar": true,
        "toolbarCloseText": "Done",
        "cssClass": null,
        "routableModals": true,
        "view": null,
        "url": "select/",
        "renderColumn": null,
        "renderToolbar": null,
        "renderInline": null,
        "renderPopover": null,
        "renderSheet": null,
        "render": null
    },
    "lazy": {
        "placeholder": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
        "threshold": 0,
        "sequential": true
    },
    "photoBrowser": {
        "photos": [],
        "exposition": true,
        "expositionHideCaptions": false,
        "type": "standalone",
        "navbar": true,
        "toolbar": true,
        "theme": "light",
        "swipeToClose": true,
        "backLinkText": "Close",
        "navbarOfText": "of",
        "url": "photos/",
        "routableModals": true,
        "virtualSlides": true,
        "swiper": {
            "initialSlide": 0,
            "spaceBetween": 20,
            "speed": 300,
            "loop": false,
            "preloadImages": true,
            "navigation": {
                "nextEl": ".photo-browser-next",
                "prevEl": ".photo-browser-prev"
            },
            "zoom": {
                "enabled": true,
                "maxRatio": 3,
                "minRatio": 1
            },
            "lazy": {
                "enabled": true
            }
        }
    },
    "notification": {
        "icon": null,
        "title": null,
        "titleRightText": null,
        "subtitle": null,
        "text": null,
        "closeButton": false,
        "closeTimeout": null,
        "closeOnClick": false,
        "swipeToClose": true,
        "cssClass": null,
        "render": null
    },
    "autocomplete": {
        "typeahead": false,
        "highlightMatches": true,
        "expandInput": false,
        "updateInputValueOnSelect": true,
        "multiple": false,
        "valueProperty": "id",
        "textProperty": "text",
        "openIn": "page",
        "pageBackLinkText": "Back",
        "popupCloseLinkText": "Close",
        "searchbarPlaceholder": "Search...",
        "searchbarDisableText": "Cancel",
        "animate": true,
        "autoFocus": false,
        "closeOnSelect": false,
        "notFoundText": " Nothing found",
        "requestSourceOnOpen": false,
        "preloader": false,
        "routableModals": true,
        "url": "select"
    },
    "vi": {
        "enabled": false,
        "autoplay": true,
        "fallbackOverlay": true,
        "fallbackOverlayText": "Please watch this ad",
        "showMute": true,
        "startMuted": true,
        "appId": null,
        "appVer": null,
        "language": null,
        "width": null,
        "height": null,
        "placementId": "pltd4o7ibb9rc653x14",
        "placementType": "interstitial",
        "videoSlot": null,
        "showProgress": true,
        "showBranding": true,
        "os": null,
        "osVersion": null,
        "orientation": null,
        "age": null,
        "gender": null,
        "advertiserId": null,
        "latitude": null,
        "longitude": null,
        "accuracy": null,
        "storeId": null,
        "ip": null,
        "manufacturer": null,
        "model": null,
        "connectionType": null,
        "connectionProvider": null
    },
    textEditor: {
        buttons: [
            ['bold', 'italic', 'underline', 'strikeThrough'],
            ['orderedList', 'unorderedList'],
            ['link', 'image'],
            ['paragraph', 'h1', 'h2', 'h3'],
            ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
            ['subscript', 'superscript'],
            ['indent', 'outdent']
          ]
    }
    
});
