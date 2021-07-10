/* --- A place where you can add your own code -- */


/* -- Repeater API --*/
var myRepeater="myrepeater";
function showVlID() {
	var vl=thoriumapi.repeaters.getVirtualList(myRepeater);
	if (vl) {
		app.dialog.alert("Virtual List ID: "+vl.el.id);
	}
}
function countItems(e) {
	var count=thoriumapi.repeaters.itemsCount(myRepeater);
	app.dialog.alert("Repeater has "+count+" elements");
}

function addRepeaterItem() {
	var myItem=[];
	myItem.object_name="New Item";
	thoriumapi.repeaters.appendItem(myRepeater, myItem);
}

function scrollToItem() {
	thoriumapi.repeaters.scrollToItem(myRepeater, 10);
}

function moveItem() {
	thoriumapi.repeaters.moveItem(myRepeater,0, 5)
}

function removeFirstItem() {
	thoriumapi.repeaters.removeItemAt(myRepeater, 0);
}

function removeAllItems() {
	thoriumapi.repeaters.clear(myRepeater);
}
function renameFirstItem() {
	var item=thoriumapi.repeaters.getItemAt(myRepeater, 0);
	item.object_name="First Record (modified)";
	thoriumapi.repeaters.replaceItemAt(myRepeater, 0, item);
}
function getItem() {
	var item=thoriumapi.repeaters.getItemAt(myRepeater, 5);
	app.dialog.alert("Item #5: "+item.object_name);
}

function getAllItem() {
	var items=thoriumapi.repeaters.getAllItems(myRepeater);
	for (const [key, value] of Object.entries(items)) {
		console.log(key+":"+value.object_name+" (index: "+value.dataindex+")");
	}
}

app.on('dbExpressRepeaterLineChange', function (repeater,rowindex) {
	if (repeater.id==myRepeater) {
		var vl=thoriumapi.repeaters.getVirtualList(repeater.id);
		var item=thoriumapi.repeaters.getItemAt(myRepeater, rowindex);
		app.dialog.alert("Item Selected: "+item.object_name);
	}
});


$(document).on("click", "#button-2787", function(e){
	e.preventDefault();
	thoriumapi.repeaters.reload(myRepeater);
});

document.addEventListener('contextmenu', event => event.preventDefault());





