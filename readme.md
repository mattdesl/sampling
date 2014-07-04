Experimental package. Sampling functions for image and noise manipulation.
 
Currently all samples wrap around edges. 

e.g. 

```js
var bilinear = require('sampling').bilinear;
var nearest = require('sampling').nearest;
	
//returns the bilinear float
var N = bilinear(data, width, height, x, y);

//nearest neighbour sample
var v = nearest(data, width, height, x, y);
```