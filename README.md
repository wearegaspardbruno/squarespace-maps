# Squarespace store locator (jQuery plugin)

Description for this plugin...

## Dependencies
* [jQuery](http://jquery.com)

## Installation

### Manually (only)
Description for installation, download bla bla bla

```html
<!-- jQuery src -->
<script src="your/folder/squarespace-map.min.js" type="text/javascript"></script>

<div id="yourDivSelector"></div>
```

## How to use:
### Via JavaScript (Squarespace code injection)
```javascript
$('#yourDivSelector').squarespaceMap();
```

## Options
<!-- | Name                 | Type           | Default    | Description  |   
|:----------------------|:----------------|:------------|:--------------|
| position	   		  	| string	   		| 'default'  | Position of the modal (can be 'default', 'right', 'left') |
| pushContent	  	   		| boolean			| false      | Option used to move the boby depending on 'position'|
| openAnimation      	| string      	| 'jelly'    | This will add a css class containing an animation|
| closeAnimation			| string			| 'unjelly'  | This will add a css class containing an animation|
| reload					| boolean			| false      | Reload page when closing the modal |
| css						| string			| ''         | Custom css class to be added to the modal container| -->

## Run:
Clone this repo then:
```shell
npm install
```
and

```shell
grunt watch
```

## Contributing
Pull Requests are always welcome!
