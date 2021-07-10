/*!
 * Open Street Map + Leaflet.js functions for Thorium  projects
 * Version 2.0 july, 2020
 * framework7 v5.x (https://framework7.io) MIT Licensed
 * Open Street Map (https://www.openstreetmap.org)
 * Leaflet: https://leafletjs.com - BSD 2-Clause "Simplified" License
 * Copyright 2018-2020 Thorium builder.
*/

var openStreetMapPlugin = {
    name: "Thorium Builder OpenStreetMap - Leaflet.js Plugin",
    bundleid: "com.thoriumbuilder.leaflet",
    version: "2.0.0",

    infoWindowHTML: '<div class="iw-container" >' +
    '   <i class="fa f7-icons btncloseinfowindow">xmark_circle</i> ' +
    '	<div class="row">' +
    '		<div class="imgbloc xsmall-30 small-20 medium-20 large-10 xlarge-10 col-3 ">' +
    '			<img class="img-zoom" src="{img}" alt="{name}" >' +
    '		</div>' +
    '		<div class="xsmall-70 small-80 medium-80 large-90 xlarge-90 col-9">' +
    '			<div class="iw-title">{name}&nbsp;<span>{badge}</span></div>' +
    '			<div class="iw-subtitle">{subtitle}</div>' +
    '			<div class="iw-rate">{rating}</div>' +
    '			<div class="iw-subtitle">{address}</div>' +
    '			<div class="flexbox display-flex flex-row align-items-center pt-1" >' +
    '				<a id="osm_btn" data-tooltip="info" class="button button-round item-link button-fill tooltip-init" href="/{target}/?id={uid}{datablock}" data-transition="f7-cover-v"><i class="fa f7-icons active-state" >info_circle_fill</i></a>' +
    '				<a id="dir_btn_from" data-tooltip="direction from here" class="button button-round button-fill tooltip-init" onclick="window.open(\'https://www.google.com/maps/dir/?api=1&amp;destination={latitude},{longitude}\',\'_parent\');" ><i class="fa f7-icons active-state" >arrow_up_right_diamond_fill</i></a>' +
    '				<a id="dir_btn_to" data-tooltip="direction to here" class="button button-round button-fill tooltip-init" onclick="window.open(\'https://www.google.com/maps/dir/?api=1&amp;origin={latitude},{longitude}\',\'_parent\');" ><i class="fa f7-icons active-state" >arrow_uturn_left_circle_fill</i></a>' +
    '			</div>' +
    '		</div>' +
    '	</div>' +
    '</div">',
    popup: null,

    geolocString: "You are within {radius} meters from this point",

    getFirebaseData: function (mapContainer, mapInstance) {
        if (typeof firestoredb == 'undefined') {
            thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Firestore Database not defined");
            openStreetMapPlugin.showAlert("Firestore Database not defined");
            return;
        }
        var user = firebase.auth().currentUser;
        if (!user) {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] User not connected");
            return;
        }
        var items = [];
        var limit = mapContainer.getAttribute("data-firebase-maxrows") || 10000;
        if (limit == 0) { limit = 10000; }
        const f = mapContainer.getAttribute('data-filter-field');
        const o = mapContainer.getAttribute('data-filter-operator');
        const v = mapContainer.getAttribute('data-filter-value');
        const f2 = mapContainer.getAttribute('data-filter-field2');
        const o2 = mapContainer.getAttribute('data-filter-operator2');
        const v2 = mapContainer.getAttribute('data-filter-value2');
        const t = mapContainer.getAttribute('data-template');
        const usronly = mapContainer.getAttribute('data-user-data') == "true" || false;
        var collection = mapContainer.getAttribute('data-collection') || null;
        var parentuid = "";
        if (!collection) {
            thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Firebase Collection not set for OpenstreetMap API");
            mapContainer.setAttribute('data-loaded', false);
            openStreetMapPlugin.hidePreloader();
            openStreetMapPlugin.emitEvent('firebaseMapLoadError', $(this), "Collection not Defined");
            openStreetMapPlugin.showAlert("Error getting documents, Collection not Defined");
            return;
        }
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Firebase Data for OpenStreetMap [collection:"+collection+"]");
        var query = firestoredb.collection(collection);
        if (parentuid) {
            try {
                query = query.where('parentuid', '==', parentuid);
            }
            catch (e) {
                mapContainer.setAttribute('data-loaded', false);
                openStreetMapPlugin.hidePreloader();
                openStreetMapPlugin.emitEvent('firebaseMapLoadError', $(this), e.message);
                openStreetMapPlugin.showAlert(e.message);
                return;
            }
        }
        if (f) {
            var sv;
            if (v == "false") { sv = false; }
            else if (v == "true") { sv = true; }
            else { sv = v; }
            try {
                query = query.where(f, o, sv);
            }
            catch (e) {
                mapContainer.setAttribute('data-loaded', false);
                openStreetMapPlugin.hidePreloader();
                openStreetMapPlugin.emitEvent('firebaseMapLoadError', $(this), e.message);
                openStreetMapPlugin.showAlert(e.message);
                return;
            }
        }
        //Second criteria
        if (f2) {
            var sv;
            if (v2 == "false") { sv = false; }
            else if (v2 == "true") { sv = true; }
            else { sv = v2; }
            try {
                query = query.where(f2, o2, sv);
            }
            catch (e) {
                mapContainer.setAttribute('data-loaded', false);
                openStreetMapPlugin.hidePreloader();
                openStreetMapPlugin.emitEvent('firebaseMapLoadError', $(this), e.message);
                openStreetMapPlugin.showAlert(e.message);
                return;
            }
        }

        if (usronly == true) {
            var u = firebase.auth().currentUser;
            if (u != null) {
                try {
                    query = query.where('createdby', '==', u.uid);
                }
                catch (e) {
                    mapContainer.setAttribute('data-loaded', false);
                    openStreetMapPlugin.hidePreloader();
                    openStreetMapPlugin.emitEvent('firebaseMapLoadError', $(this), e.message);
                    openStreetMapPlugin.showAlert(e.message);
                    return;
                }
            }
        }
        if ((limit) && (limit > 0)) {
            try {
                query = query.limit(parseInt(limit));
            }
            catch (e) {
                thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Firestore Error: "+ e.message);
                mapContainer.setAttribute('data-loaded', false);
                openStreetMapPlugin.hidePreloader();
                openStreetMapPlugin.emitEvent('firebaseMapLoadError', $(this), e.message);
                openStreetMapPlugin.showAlert(e.message);
                return;
            }
        }
        query.get()
            .then(function (querySnapshot) {
                thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Firebase Data received");
                var i = -1;
                /*-- Get dynamic Variables --*/
                var nameFld = mapContainer.getAttribute("data-firebase-name") || '';
                var addressFld = mapContainer.getAttribute("data-firebase-address") || '';
                var imgFld = mapContainer.getAttribute("data-firebase-img") || '';
                var descFld = mapContainer.getAttribute("data-firebase-desc") || '';
                var subTitleFld = mapContainer.getAttribute("data-firebase-subtitle") || '';
                var badgeFld = mapContainer.getAttribute("data-firebase-badge") || '';
                var ratingFld = mapContainer.getAttribute("data-firebase-rating") || '';
                var dataTarget = mapContainer.getAttribute("data-target") || '';
                var latFld = mapContainer.getAttribute("data-firebase-lat") || '';
                var lngFld = mapContainer.getAttribute("data-firebase-lng") || '';
                var latLngField = mapContainer.getAttribute("data-firebase-lat-lng") || '';
                latFld = latFld||"latitude";
                lngFld = lngFld||"longitude";
                thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Looping on Firebase Result");
                querySnapshot.forEach(function (doc) {
                    i = i + 1;
                    var item = {};
                    item = doc.data();
                    item.dataindex = i;
                    item.uid = doc.id;
                    item.id = doc.id;
                    var latitude = item[latFld] || 0;
                    var longitude = item[lngFld] || 0;
                    if (((latitude == 0) || (longitude == 0)) && (latLngField.length > 0)) {
                        var fc = item[latLngField];
                        if (fc) {
                            var res = item[latLngField].split(",");
                            if (res.length == 2) {
                                latitude = res[0];
                                longitude = res[1];
                            }
                        }
                    }
                    item.latitude=latitude;
                    item.longitude=longitude;
                    item.name = item[nameFld] || '';
                    item.address = item[addressFld] || '';
                    item.img = item[imgFld] || '';
                    item.desc = item[descFld] || '';
                    item.subtitle = item[subTitleFld] || '';
                    item.badge = item[badgeFld] || '';
                    item.rating = item[ratingFld] || 0;
                    item.target=dataTarget;
                    openStreetMapPlugin.addMarkerAt(mapInstance, latitude, longitude,item);
                });
                thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Firebase Data Parsing done ["+i+" rows]");
                setTimeout(function () { openStreetMapPlugin.hidePreloader(); }, 300);
                openStreetMapPlugin.emitEvent('firebaseMapLoadSuccess', $(this), items.length);
            })
            .catch(function (error) {
                thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Data Parsing Error ["+error+"]");
                mapContainer.setAttribute('data-loaded', false);
                openStreetMapPlugin.hidePreloader();
                openStreetMapPlugin.emitEvent('firebaseMapLoadError', $(this), error);
                openStreetMapPlugin.showAlert("Error getting documents: " + error);
                return;
            });
    },

    showPreloader : function() {
        if (typeof app != "undefined") {
            app.preloader.show();
        }
    },

    hidePreloader : function() {
        if (typeof app != "undefined") {
            app.preloader.hide();
        }
    },

    showAlert : function(m) {
        if (typeof app != "undefined") {
            app.dialog.alert(m);
        }
    },

    emitEvent : function (s,o,m,i) {
        m=m||null;
        i=i||null;
        if (typeof app != "undefined") {
            app.emit(s,o,m,i);
        }
    },

    getMapInstance: function(id) {
        var mo = document.getElementById(id);
        if (mo) {
            if (mo.data) {return mo.data; }
            else {return null;}
        } else {
            return null;
        }
    },


    loadMarkersFromJsonApi: function (mapContainer, mapObject) {
		var root = mapContainer.getAttribute("data-json-root") || null;
		var url = mapContainer.getAttribute('data-json-source') || null;
		if (!url) {
            var m="Invalid url for JSON Source";
            thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] "+m);
			openStreetMapPlugin.showAlert(m);
			return;
		}
        var items = [];

		var options={};
        var headers={};
        var hasheader=false;
        options["method"]="GET";
        if (kMode.length>0) {options["mode"]=kMode;}
        if (kCache.length>0) {options["cache"]=kCache;}
        if (kCredentials.length>0) {options["credentials"]=kCredentials;}
        /* header */
        if (kContenttype.length>0) {headers["Content-Type"]=kContenttype;hasheader=true;}
        if (kRedirect.length>0) {headers["redirect"]=kRedirect;hasheader=true;}
        if (kReferrerpolicy.length>0) {headers["referrerpolicy"]=kReferrerpolicy;hasheader=true;}
        if (kAuthorization.length>0) {headers["Authorization"]=kAuthorization;hasheader=true;}
        if (hasheader==true) {
            options["headers"]=headers;
        }

        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] get data from url ["+url+"]");
        fetch(url,options)
        .then(
			function (response) {
				response.text()
					.then(txt => {
                        var data;
                        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] data succesfully loaded from url ["+url+"]");
						try {
							data = JSON.parse(txt);
						} catch (err) {
                            thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Error ["+err.message+"]");
							openStreetMapPlugin.emitEvent('jsonDataloadError', $(this));
							openStreetMapPlugin.showAlert(err.message + " " + txt);
							return;
						}
						var i = -1;
						var item = {};
						var myItems;

						if ((typeof data == "object") && (root)) {
							myItems = jsonApiPlugin.getChildrenProperty(data, root);
						} else {
							if (!(root)) { myItems = data; } else { myItems = data[root]; }
						}
						/*-- Get dynamic Variables --*/
						var limit = mapContainer.getAttribute("data-json-maxrows") || 9999999;
						if (limit == 0) { limit = 9999999; }
						var nameFld = mapContainer.getAttribute("data-json-name") || '';
						var addressFld = mapContainer.getAttribute("data-json-address") || '';
						var imgFld = mapContainer.getAttribute("data-json-img") || '';
						var descFld = mapContainer.getAttribute("data-json-desc") || '';
						var subTitleFld = mapContainer.getAttribute("data-json-subtitle") || '';
						var badgeFld = mapContainer.getAttribute("data-json-badge") || '';
						var ratingFld = mapContainer.getAttribute("data-json-rating") || '';
						var dataTarget = mapContainer.getAttribute("data-target") || '';
						var latFld = mapContainer.getAttribute("data-json-lat") || '';
						var lngFld = mapContainer.getAttribute("data-json-lng") || '';
						var latLngField = mapContainer.getAttribute("data-json-lat-lng") || '';
                        var keyField = mapContainer.getAttribute("data-json-key") || '';
                        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Processing Result Data");
						if (myItems) {
							for (var prop in myItems) {
								i = i + 1;
								if (i >= limit) { break; }
								item = myItems[prop];
								item["dataindex"] = i;

								var lat = item[latFld] || 0;
								var lng = item[lngFld] || 0;
								if (((lat == 0) || (lng == 0)) && (latLngField.length > 0)) {
									var fc = item[latLngField];
									if (fc) {
										var res = item[latLngField].split(",");
										if (res.length == 2) {
											lat = res[0];
                                            lng = res[1];
										}
									}
                                } 
                                item.latitude=lat;
                                item.longitude=lng;
								//var LatLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
                                item.id = item[keyField] || '';
                                item.uid = item[keyField] || '';
								item.name = item[nameFld] || '';
								item.address = item[addressFld] || '';
								item.img = item[imgFld] || '';
								item.desc = item[descFld] || '';
								item.subtitle = item[subTitleFld] || '';
								item.badge = item[badgeFld] || '';
                                item.rating = item[ratingFld] || 0;
                                item.target=dataTarget;

                                openStreetMapPlugin.addMarkerAt(mapContainer.data, lat, lng,item);//mapObject
							}
						}
						openStreetMapPlugin.emitEvent('jsonDataloadSuccess', $(this), mapObject, items);
					})
					.catch(function (err) {
                        thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Api Error: ["+err.message+"]");
						openStreetMapPlugin.showAlert(err.message);
					});
			}).catch(function (err) {
                thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Api Error: ["+err.message+"]");
				openStreetMapPlugin.emitEvent('jsonDataloadError', $(this));
				openStreetMapPlugin.showAlert(err.message);
			});
    },
    

    initMap: function (id) {
        var mapObject=document.getElementById(id);
        if (!mapObject) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Open Street Map Object not found");
            return;
        }
        var mx =mapObject.getAttribute("data-initialised");
        if (mx=='true') {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Open Street Map Object with ID ["+id+"] already initialized]");
            var map=mapObject.data;
            return map;
        }

        openStreetMapPlugin.showPreloader();
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Init Open Street Map with ID: ["+id+"]");

        mapObject.style.opacity = "0";
        var dataGeolocation = mapObject.getAttribute("data-geolocation") || "false";
        var dataZoom = parseInt(mapObject.getAttribute("data-zoom") ||2);
        var dataLat = parseFloat(mapObject.getAttribute("data-lat") || 0);
        var dataLng = parseFloat(mapObject.getAttribute("data-lng") || 0);

        var dataTileLayerURL =mapObject.getAttribute("data-tile-layer-url") || null;
        var dataTileLayerOptions =mapObject.getAttribute("data-tile-layer-options") || null;

        var map = L.map(id).setView([dataLat,dataLng],dataZoom);
        openStreetMapPlugin.addtileLayer(map,dataTileLayerURL,dataTileLayerOptions);

        if ((thoriumCorePlugin.isLocal()==true) && dataGeolocation=="true" ) {
            dataGeolocation=false;
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Geolocation is not enabled with the simulator");
            thoriumCorePlugin.showToast("Geolocation not allowed with Simulator");
        }
        if(dataGeolocation=="true") {
            if (navigator.geolocation) {
                thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Trying to geoLocate user...");
                try {
                    map.locate({setView: true, maxZoom: dataZoom});
                    map.on('locationfound', openStreetMapPlugin.onLocationFound);
                    map.on('locationerror', openStreetMapPlugin.onLocationError);
                }
                catch (error) {
                    thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Leaflet Geolocation error: "+error);
                }

            } else {
                thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Geolocation is not enabled");
            }
        } else {
            setTimeout(function(){ map.invalidateSize();mapObject.style.opacity = "1";openStreetMapPlugin.hidePreloader();}, 500);
        }
        var layerGroup = L.layerGroup().addTo(map);
        map.data=layerGroup;
        mapObject.setAttribute("data-loaded","true");
        mapObject.data=map;    
        map.on('click',openStreetMapPlugin.mapOnClick);
        mapObject.setAttribute("data-initialised","true");
        mapObject.style.opacity=1;
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Open Street Map Object with ID ["+id+"] successfully initialized]");
        return map;
    },

    onLocationFound : function(e) {
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Geolocation found");
        var radius = e.accuracy;
        var map=e.target;
        var locIcon = L.icon({
            iconUrl: 'img/map-marker-me.png',
            iconSize: [30,30]
          }); 
        var s=openStreetMapPlugin.geolocString.replace("{radius}",radius);
        L.marker(e.latlng,{icon: locIcon}).addTo(map)
            .bindPopup(s).openPopup();
        L.circle(e.latlng, radius).addTo(map);
        map.panTo(e.latlng);
        var mapObject=document.getElementById(map._container.id);
        setTimeout(function(){ map.invalidateSize();mapObject.style.opacity = "1";openStreetMapPlugin.hidePreloader();}, 500);
    },

    onLocationError: function(e) {
        openStreetMapPlugin.hidePreloader();
        setTimeout(function(){ map.invalidateSize();mapObject.style.opacity = "1";}, 500);
        thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Geolocation error ["+e.message+"]");
        openStreetMapPlugin.showAlert(e.message);

    },

    addMarkerAt: function (mapObject, lat, lng,item) {
        if(!mapObject) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] mapObject undefined");
            return;
        }
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Adding Open Street Map Marker at position ["+lat+" | "+lng+"]"); 
        var layerGroup=mapObject.data;
           var locIcon = L.icon({
            iconUrl: 'img/map-marker-icon.png',
            iconSize: [24,39]
          }); 
          item.icon=  locIcon;
        var marker = new L.Marker(
            [lat, lng],
            item
            )
            marker.on('click', openStreetMapPlugin.markerOnClick).addTo(layerGroup);
            marker.on('mouseover', openStreetMapPlugin.markerOnMouseOver).addTo(layerGroup);
            marker.on('mouseout', openStreetMapPlugin.markerOnMouseLeave).addTo(layerGroup);
    },

    setInfoWindow : function(markerItem) {
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Set Info Window Content"); 
        var contentString;
        contentString = openStreetMapPlugin.infoWindowHTML;
        contentString = contentString.replace(/{name}/g, markerItem.name||'unknown place');
        contentString = contentString.replace(/{uid}/g, markerItem.uid||'');
        contentString = contentString.replace(/{address}/g, markerItem.address||'');
        var hasImage=false;
        if ( (markerItem.locimage) && (markerItem.locimage.length>0) ){
            markerItem.img=markerItem.locimage;
            hasImage=true;
        }    
        else {
            markerItem.img = "./img/defaultimg.png"; 
        }
        contentString = contentString.replace(/{img}/g, markerItem.img);
        contentString = contentString.replace(/{description}/g, markerItem.desc||'');
        contentString = contentString.replace(/{subtitle}/g, markerItem.subtitle||'');
        contentString = contentString.replace(/{badge}/g, markerItem.badge||'');
        contentString = contentString.replace(/{target}/g, markerItem.target||'');
        contentString = contentString.replace(/{latitude}/g, markerItem.latitude);
        contentString = contentString.replace(/{longitude}/g, markerItem.longitude);
        var $rt = '';
        for (i = 0; i < markerItem.rating; i++) {
            $rt = $rt + '<i class="f7-icons">star_fill</i>';
        }
        contentString = contentString.replace(/{rating}/g, $rt||'');
        var service=markerItem.service||null;
        if (service) { //Called from dbExpress
            var pk=markerItem.pk||null;
            contentString = contentString.replace(/{datablock}/g,"&service="+service+"&pk="+pk+"&rowindex=0"); //+"&data=" + encodeURIComponent(JSON.stringify(markerItem))
        } else {
            contentString = contentString.replace(/{datablock}/g, "&data=" + encodeURIComponent(JSON.stringify(markerItem)));
        }
        $('.custominfowindow').html(contentString);
        if (hasImage==false) {
            var imgInfoWindow = document.querySelector(".custominfowindow .img-zoom");
            if (imgInfoWindow) {imgInfoWindow.style.display="none";}
        }
        if ( !(markerItem.target)) {
            var osmbtn = document.querySelector(".custominfowindow .osm_btn");
            if (osmbtn) {osmbtn.style.display="none";}
        }

        return contentString;
    },

    markerOnMouseLeave : function(e){
        //$('.custominfowindow').hide();
    },

    mapOnClick: function(e) {
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Map Click Detected"); 
        $('.custominfowindow').hide();
    },

    markerOnMouseOver : function(e){
        if (typeof app == 'undefined') {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Mouse Over Map Marker");
            var markerItem=this.options;
            var h=openStreetMapPlugin.setInfoWindow(markerItem);
            $('.custominfowindow').hide();
            e.target.bindPopup(h).openPopup();
        }    
    },

    markerOnClick : function(e){
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Marker Click Detected"); 
        var markerItem=this.options;
        openStreetMapPlugin.setInfoWindow(markerItem);
        if (typeof app !== 'undefined') {
            $('.custominfowindow').show();
            $('.custominfowindow').css('height', 'auto');
        } else {
            //Bootstrap
            $('.custominfowindow').hide();
            if ( (markerItem.target) && (markerItem.target.length>0)) {
                var url=markerItem.target + ".html";
                if (markerItem.id) {
                    url=url+"?id=" + hash_encode(markerItem.id);
                }
                location =url
            }
        }
        if (!(markerItem.target)) {$('#osm_btn').hide(); }
    },

    addtileLayer: function (map,urltemplate,options) {
        urltemplate=urltemplate||null;
        options=options||'';
        if (!urltemplate) {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] adding default Tile Layer from url [https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png]");
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        } else {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] adding Tile Layer from url ["+urltemplate+"] with options ["+options+"]");
            try {
                L.tileLayer(urltemplate, { options }).addTo(map);
            } catch (error) {
                thoriumapi.logEvent(2,"[com.thoriumbuilder.leaflet] Error while adding Title Layer ["+error+"]");
                openStreetMapPlugin.showAlert("Error while adding Title Layer "+error);
            }    
        }
    },

    setWMSService : function(id,service,layers) {
        var mapObject=document.getElementById(id);
        if (!mapObject) {return;}
        var map=mapObject.data;
        if (!map) {return;}
        var wmsLayer = L.tileLayer.wms(service, {
            layers: layers
        }).addTo(map);
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] WMS Service ["+service+"] with option ["+layers+"] Added to OSM Map with id:"+id);
        setTimeout(function(){ map.invalidateSize();}, 100);
    },

    addGeoJSON : function(id,geojson) {
        var geojson=geojson||null;
        if (!geojson) {return;}
        var mapObject=document.getElementById(id);
        if (!mapObject) {return;}
        var map=mapObject.data;
        if (!map) {return;}
        L.geoJSON(geojson).addTo(map);
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Geojson Added to OSM Map with id:"+id);
        setTimeout(function(){ map.invalidateSize();}, 500);
    },

    addCircle : function(id,position,styles) {
        var position=position||null;
        if (!position) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Add Circle to OSM Map: Position not set");
            return;
        }
        var mapObject=document.getElementById(id);
        if (!mapObject) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Add Circle to OSM Map: Undefined Map");
            return;}
        var map=mapObject.data;
        if (!map) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Add Circle to OSM Map: Undefined Map");
            return;
        }
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Circle Added to OSM Map with id:"+id);
        var circle = L.circle(position, styles).addTo(map);
        setTimeout(function(){ map.invalidateSize();}, 500);
    },

    addPolygon : function(id,position,styles) {
        var position=position||null;
        if (!position) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Add Polygon to OSM Map: Position not set");
            return;
        }
        var mapObject=document.getElementById(id);
        if (!mapObject) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Add Polygon to OSM Map: Undefined Map");
            return;}
        var map=mapObject.data;
        if (!map) {
            thoriumapi.logEvent(1,"[com.thoriumbuilder.leaflet] Add Polygon to OSM Map: Undefined Map");
            return;
        }
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Polygon Added to OSM Map with id:"+id);
        var polygon = L.polygon(position, styles).addTo(map);
        setTimeout(function(){ map.invalidateSize();}, 500);
    },

    showStaticMarkers : function(mapObject) {
        var dataMarkers = mapObject.getAttribute("data-markers") || "";
        var dataTarget = mapObject.getAttribute("data-target") || "";
        if (dataMarkers.length > 0) {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Loading Static Markers for Map");
            var jsonBlock = Base64.decode(dataMarkers);
            var myMarkers = JSON.parse(jsonBlock);
           for (item of myMarkers) {
                if (!item.target) {
                    item.target="";
                }    
                openStreetMapPlugin.addMarkerAt(mapObject.data, item.latitude, item.longitude,item);
            }
        }
    },

    initAllMaps : function() {
        var i = 0;
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Calling initAllMaps function");
        var i=0;
		$('.openstreetmap-api').each(function (field) {
			var mapObject = document.getElementById(field.id);
			if (mapObject) {
                var dataLoaded = mapObject.getAttribute("data-loaded") || "false";
                var markerSource= mapObject.getAttribute("data-dbsource") || null;
				if (dataLoaded == "false") {
                    openStreetMapPlugin.showPreloader();
                    var map=openStreetMapPlugin.initMap(field.id);
                    if (map) {
                        if (markerSource=="firebase") {
                            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Markers from Firebase for OSM Map with id:"+field.id);
                            openStreetMapPlugin.getFirebaseData(mapObject, map);
                        } 
                        else if (markerSource=="sqlite") {
                            //nothing, initialized in dbexpress
                        }
                        else if (markerSource=="json") {
                            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Markers from JSON API for OSM Map with id:"+field.id);
                            openStreetMapPlugin.loadMarkersFromJsonApi(field,mapObject);
                        }
                        else if (markerSource=="static") {
                            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Markers from Static list for OSM Map with id:"+field.id);
                            openStreetMapPlugin.showStaticMarkers(mapObject);
                        }
                    }
				} else {
                    thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Map with ID ["+field.id+"] already initialized");
                }
				i = i + 1;
			}
		});
		return i;
    },

    clearMapLayer : function(id) {
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Clear Map Leyer for OSM Map with id:"+id);
        var mapObject=document.getElementById(id);
        var map=mapObject.data;
        var layerGroup=map.data;
        layerGroup.clearLayers();
    },

    reloadAllMaps : function()   {
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Reloading All Maps in DOM");
        $('.openstreetmap-api').each(function (i, field) {
            openStreetMapPlugin.refreshMap(field.id);
        });
    },


    refreshMap : function(id) {
        openStreetMapPlugin.showPreloader();
        openStreetMapPlugin.clearMapLayer(id);
        var mapObject=document.getElementById(id);
        if (!mapObject) {return;}
        var map=mapObject.data;
        if (!map) {return;}
        var layerGroup=map.data;
        var markerSource= mapObject.getAttribute("data-dbsource") || null;
        mapObject.setAttribute("data-loaded","false");
        thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Reload Markers from Firebase for OSM Map with id:"+mapObject.id);
        if (markerSource=="firebase") {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Markers from Firebase for OSM Map with id:"+mapObject.id);
            openStreetMapPlugin.getFirebaseData(mapObject, map);
        } 
        else if (markerSource=="sqlite") {
            if (typeof thoriumSqlitePlugin !== 'undefined') {
                thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Markers from Sqlite for OSM Map with id:"+mapObject.id);
                thoriumSqlitePlugin.loadPlaces(mapObject,'osm');
            }
        }
        else if (markerSource=="json") {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Markers from JSON API for OSM Map with id:"+mapObject.id);
            openStreetMapPlugin.loadMarkersFromJsonApi(mapObject,mapObject);
        }
        else if (markerSource=="static") {
            thoriumapi.logEvent(0,"[com.thoriumbuilder.leaflet] Get Markers from Static list for OSM Map with id:"+mapObject.id);
            openStreetMapPlugin.showStaticMarkers(mapObject);
        }
        return;
    },

    initialize : function () {
        if (typeof app !== 'undefined') {
			app.on('pageMounted', function (page) {
                setTimeout(function(){ openStreetMapPlugin.initAllMaps();}, 100); 
			});
        }
        setTimeout(function(){ openStreetMapPlugin.initAllMaps();}, 100); 
    }

};

document.addEventListener('deviceready', openStreetMapPlugin.initialize);
document.addEventListener('DOMContentLoaded', openStreetMapPlugin.initialize);