#Bootstrap extra modal [Demo](http://vascogaspar.github.io/bootstrap-extra-modal/)

A wrapper to the Bootstrap 3 modal Javascript we developed at [HOKO](https://hokolinks.com). It uses the HTML already on the page (the modal 'container' and adds remote HTML to it).

## Dependencies
* [jQuery](http://jquery.com)
* [Bootstrap 3](http://getbootstrap.com)

## Installation
### Via npm
```shell
npm install bootstrap-extra-modal
```

### Manually
[Download the project](https://github.com/vascogaspar/bootstrap-extra-modal/archive/gh-pages.zip) and include the sources inside your head tag.
Make sure you include the files **after** including jQuery and Bootstrap 3 sources

```html
<!-- jQuery src -->
<!-- Bootstrap 3 src -->

<link rel="stylesheet" type="text/css" href="your/folder/bootstrap-extra-modal.css">
<script src="your/folder/bootstrap-extra-modal.min.js" type="text/javascript"></script>
```

## How to use:
### Via data attributes
```html
<button data-em-selector="#fancyModal" data-em-position="left" data-em-push-content="true">Ignite!</button>
```

### Via JavaScript
```javascript
$('#fancyModal').bootstrapExtraModal(options).show();
```

## Options
| Name                 | Type           | Default    | Description  |   
|:----------------------|:----------------|:------------|:--------------|
| position	   		  	| string	   		| 'default'  | Position of the modal (can be 'default', 'right', 'left') |
| pushContent	  	   		| boolean			| false      | Option used to move the boby depending on 'position'| 
| openAnimation      	| string      	| 'jelly'    | This will add a css class containing an animation|
| closeAnimation			| string			| 'unjelly'  | This will add a css class containing an animation|
| reload					| boolean			| false      | Reload page when closing the modal |
| css						| string			| ''         | Custom css class to be added to the modal container|

## Run:
```shell
npm install
```
Then:

```shell
grunt watch
```

## Contributing
Pull Requests are always welcome!
