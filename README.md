Slide and Push Menus
==============

AngularJS Directive to make Slide and Push menus. 

Based in http://tympanus.net/codrops/2013/04/17/slide-and-push-menus/

###Dependecies: Angular, jQuery

###Installation:

```
bower install ng-slide-push
```

###Building:
```
npm install
gulp
```

## Basic Usage

```
<ng-slide-push-menu menu-open="false" position="right" button="push" button-icon-class="fa fa-menu">
  <!--insert your content here-->
</ng-slide-push-menu>

```

## Calling from external button
Use the value passed to the menu-open attribute to control the state of the menu

## Attributes

```
  position: Position of the menu // [ 'top', 'right', 'bottom', 'left' ]
  fix-top: To fix the top position // In px
  fix-left: To fix the left position // In px
  spm-class: Classes added to the menu element
  button: true/false if the internal button is to appear
  menu-open: true/false if the menu is open (bound value)
  menu-type: Type of menu to be used, default is 'slide' //['slide', 'push']
  button-class: extra class string to be added to the button toggle
```

### TODO

- Make docs more robust
- Continue to Angularize jQuery parts
- Create demo page
