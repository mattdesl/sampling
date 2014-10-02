var lerp = require('lerp');
var smoothstep = require('smoothstep');

module.exports.nearest = function(data, width, height, x, y) {
    var px = ~~x % width,
        py = ~~y % height;
    return data[ px + (py * width) ];
};

module.exports.bilinear = function(data, width, height, x, y) {
    //bilinear interpolation 
    //http://www.scratchapixel.com/lessons/3d-advanced-lessons/noise-part-1/creating-a-simple-2d-noise/
    var xi = Math.floor( x );
    var yi = Math.floor( y );
 
    var tx = x - xi;
    var ty = y - yi;
    
    var rx0 = xi % width;
    var rx1 = ( rx0 + 1 ) % width;
    var ry0 = yi % height;
    var ry1 = ( ry0 + 1 ) % height;
 
    /// random values at the corners of the cell using permutation table
    var c00 = data[ (ry0 * width + rx0) ];
    var c10 = data[ (ry0 * width + rx1) ];
    var c01 = data[ (ry1 * width + rx0) ];
    var c11 = data[ (ry1 * width + rx1) ];

    /// remapping of tx and ty using the Smoothstep function
    var sx = smoothstep( 0, 1, tx );
    var sy = smoothstep( 0, 1, ty );
 
    /// linearly interpolate values along the x axis
    var nx0 = lerp( c00, c10, sx );
    var nx1 = lerp( c01, c11, sx );
        
    /// linearly interpolate the nx0/nx1 along they y axis
    var v = lerp( nx0, nx1, sy );
    return v;
}; 