"use strict";

var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    var colors = [];

    // And, add our vertices point into our array of points
    points = [];
    var numTris =Math.random()*100+50;
    var totalTris = numTris;
    
    for(var height = -10; height<=10; height+=.5){
        for(var width = -10; width <= 10; width++){
            points.push(vec2(width*.1,height*.1));
            points.push(vec2(width*.1+.05,height*.1+.05));
            points.push(vec2(width*.1+.1,height*.1));
    
            colors.push(getColor(width, height));
            colors.push(getColor(width, height));
            colors.push(getColor(width, height));
    
            points.push(vec2(width*.1-.05,height*.1+.05));
            points.push(vec2(width*.1,height*.1));
            points.push(vec2(width*.1+.05,height*.1+.05));
    
            colors.push(getColor2(width, height));
            colors.push(getColor2(width, height));
            colors.push(getColor2(width, height));
            totalTris+=2;
        }
    }
    function getColor(width, height, opp = false){
        if(opp){
            width*=-1;
            height*=-1;
        }
        width+=10;
        height+=10;
        var r = 1-width/20;
        var b = width/30;
        var g = .275;

        r*=height/20+.25;
        g*=height/20+.25;
        b*=height/20+.25;
        return vec3(r,g,b);
    }
    function getColor2(width, height, opp = false){
        if(opp){
            width*=-1;
            height*=-1;
        }
        width+=10;
        height+=10;
        var r = .25;
        var b = width/20;
        var g = 1-width/20;

        r*=height/20+.25;
        g*=height/20+.25;
        b*=height/20+.25;
        return vec3(r,g,b);
    }
    
    // for(var i = 0; i < numTris; i++){

    //     var x1 = (Math.random()-.5)*2;
    //     var x2 = (Math.random()-.5)*2;
    //     var y1= x1+(Math.random()* - .5);
    //     var y2= x2+(Math.random()* -.5);
    //     var z1= y1 - (Math.random()* - .5);
    //     var z2= y2 -  (Math.random()* - .5);

    //     points.push(vec2(x1, x2));
    //     points.push(vec2(y1, y2));
    //     points.push(vec2(z1, z2));

    //     colors.push(vec3(Math.random(),Math.random(),Math.random()));
    //     colors.push(vec3(Math.random(),Math.random(),Math.random()));
    //     colors.push(vec3(Math.random(),Math.random(),Math.random()));
    // }
    canvas.addEventListener("click",function(){
        alert("There are " + Math.floor(totalTris) + " triangles on the screen");
    })

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    //note that the 2 below is because each of our 
    //data points has only 2 values (2D application)
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
