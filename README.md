# Squarespace store locator


## Dependencies
* [jQuery](http://jquery.com)

## Usage

### Pre-Setup
1. Create a event list page and make sure it is not linked (for this example, the url slug will be '/stores')
2. Create an event for each location you want to show on the map
3. Make sure you put the address of the event on the **Location** tab 
4. On the page you want the map to appear, add a new component type **Code** and add the following markup: `<div id="yourDivSelector"></div>`


### Setup
1. Go to your Squarespace admin panel, then navigate to **Settings** -> **Advanced** -> **Code Injection**
2. On the **Header** section, load **jQuery**
3. Load the [Google Maps api](https://console.developers.google.com/flows/enableapi?apiid=maps_backend&keyType=CLIENT_SIDE&reusekey=true) script tag (don't forget to load the geometry and places libraries)
4. Copy [this code](https://raw.githubusercontent.com/wearegaspardbruno/squarespace-maps/master/dist/js/squarespace-map.min.js) into another `script` tag 
5. Initialize the plugin with the selector where you want the map to appear, and the URL ehere you have your locations (events).

In the end, your **Head** section will look something like this:

```html
<script src="path/to/jquery.js" type="text/javascript"></script>

<script src="https://maps.googleapis.com/maps/api/js?key=__YOUR-API-KEY__&callback=initMap&libraries=geometry,places" async defer></script>

<script type="text/javascript">
	**** Plugin code goes here ****
</script>

<script type="text/javascript">
	// Plugin initialization
	function initMap() {
	  $(function(){ // Make sure it's initialized on Document Ready
	    $('#map').squarespaceMap({
	      storesURL: '/stores',
	      ...
	    });
	  })
	}
</script>
```

## Options
| Name                 | Type           | Default    | Description  |   
|:----------------------|:----------------|:------------|:--------------|
| storesURL	   		  	| string	   		| '/stores'  | URL for the stores (events) page |
| storeSelector	  	   		| string			| '.eventlist-meta-address-maplink'      | DOM selector for the item with the google maps link|
| squarespaceContainer      	| string      	| '#main'    | DOM selector for filtering the HTML response|
| locatedMessage			| string			| 'You are here'  | Message that appears when user is geo-located|
| styles					| array			| []      | Map style costumization array. [More info](https://developers.google.com/maps/documentation/javascript/styling#overview) |
| markerIcon						| string			| ''         | Custom marker image. Should be an image url like http://something.xyz/image.png|

## Contributing:

Clone this repo then:

```shell
npm install
```
and

```shell
grunt watch
```

Pull Requests are always welcome!
