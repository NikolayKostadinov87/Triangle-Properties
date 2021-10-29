window.onload = function(){
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
	width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    height1 = 100 * (Math.sqrt(3)/2),
    pointStartA = {
        x: canvas.width / 2 - 50,
        y: canvas.height / 2 + height1,
        radius: 10
    },
    pointDestinationA = {
        x: canvas.width / 2 + 50 ,
        y: canvas.height / 2 + height1,
        radius: 10
    },
    pointStartC = {
        x: canvas.width / 2 ,
        y: canvas.height / 2 ,
        radius: 10
    },
    handles = [pointStartA, pointDestinationA, pointStartC],
    offset = {},
    isDragging = false,
    dragHandle;

    drawAndUpointDestinationAteFunction();

    function drawAndUpointDestinationAteFunction(){
        context.lineWidth=1;
        context.clearRect(0, 0, width, height);
        function TriangleDrawer(){
        context.beginPath();
        context.moveTo(pointStartA.x, pointStartA.y);
		context.lineTo(pointDestinationA.x , pointDestinationA.y);
		context.lineTo(pointStartC.x , pointStartC.y);
        context.lineTo(pointStartA.x , pointStartA.y);
        context.stroke();
        }
        TriangleDrawer();
        context.fillStyle = "#008CBA";
        for(var i = 0; i < 3; i += 1) {
            var handle = handles[i];
            if(handles[i].x >=  width - handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(handles[i].x <= handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(handles[i].y <= handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(handles[i].y >= height - handles[i].radius){
                window.alert("Don't make a triangle that is getting over the canvas's borders!");
            }
            if(isDragging && handle === dragHandle) {
                context.shadowColor = "red";
                context.shadowOffsetX = 4;
                context.shadowOffsetY = 4;
                context.shadowBlur = 10;
            }
            function drawCircles(){
            context.beginPath();    
            context.arc(handle.x, handle.y, handle.radius, 0, Math.PI * 2, false);
            context.fill();
            if(i === 0){
                context.beginPath();
                context.fillText("A" , handle.x - 30 , handle.y);
                context.fill();
            }
            else if(i === 1){
                context.beginPath();
                context.fillText("B" , handle.x + 30 , handle.y);
                context.fill();
            }
            else if(i === 2){
                context.beginPath();
                context.fillText("C" , handle.x , handle.y - 30);
                context.fill();
            }
            context.shadowColor = null;
            context.shadowOffsetX = null;
            context.shadowOffsetY = null;
            context.shadowBlur = null;
            }
            drawCircles();
        }
        function midPointA(){
            //x and y are the midpoints that we are searching 
            var x,x1,x2,y,y1,y2;
            x1 = pointStartC.x;
            x2 = pointDestinationA.x;
            y1 = pointStartC.y;
            y2 = pointDestinationA.y;
            x = (x1 + x2)/2;
            y = (y1 + y2)/2;
            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.lineTo(x , y);
            context.stroke();
            context.fillStyle = "#ff0000";
            context.beginPath();
            context.arc(x , y , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side A
            context.fillText("MA" , x + 5 , y - 5);
            context.fill();
        }

        function midPointB(){
            //x and y are the midpoints that we are searching 
            var x,x1,x2,y,y1,y2;
            x1 = pointStartA.x;
            x2 = pointStartC.x;
            y1 = pointStartA.y;
            y2 = pointStartC.y;
            x = (x1 + x2)/2;
            y = (y1 + y2)/2;
            context.beginPath();
            context.moveTo(pointDestinationA.x , pointDestinationA.y);
            context.lineTo(x , y);
            context.stroke();
            context.fillStyle = "#ff0000";
            context.beginPath();
            context.arc(x , y , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side B
            context.fillText("MB" , x - 25 , y - 5);
            context.fill();
        }

        function midPointC(){
            //x and y are the midpoints that we are searching 
            var x,x1,x2,y,y1,y2;
            x1 = pointStartA.x;
            x2 = pointDestinationA.x;
            y1 = pointStartA.y;
            y2 = pointDestinationA.y;
            x = (x1 + x2)/2;
            y = (y1 + y2)/2;
            context.beginPath();
            context.moveTo(pointStartC.x , pointStartC.y);
            context.lineTo(x , y);
            context.stroke();
            context.fillStyle = "#ff0000";
            context.beginPath();
            context.arc(x , y , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side C
            context.fillText("MC" , x - 8 , y + 20);
            context.fill();
        }

        midPointA();
        midPointB();
        midPointC();
    }

        //function to find the distance between two points on the canvas
        function distanceXY(x0, y0, x1, y1) {
            var dx = x1 - x0,
                dy = y1 - y0;
            return Math.sqrt(dx * dx + dy * dy);
        }
    
        //function checking if a point is intersecting (colliding) with a circle
        function circlePointCollision(x, y, circle) {
            return distanceXY(x, y, circle.x, circle.y) < circle.radius;
        }
    
        //here we using mouse events for the circles and checking if they are clicked or not (part 1)
        document.body.addEventListener("mousedown", function(event) {
            for(var i = 0; i < 3; i += 1) {
                var handle = handles[i];
                if(circlePointCollision(event.clientX, event.clientY, handle)) {
                    isDragging = true;
                    document.body.addEventListener("mousemove", onMouseMove);
                    document.body.addEventListener("mouseup", onMouseUp);
                    dragHandle = handle;
                    offset.x = event.clientX - handle.x;
                    offset.y = event.clientY - handle.y;
                    drawAndUpointDestinationAteFunction();
                }
            }
        });
    
        //here we using mouse events for the circles and checking if they are clicked or not (part 2)
        function onMouseMove(event) {
            dragHandle.x = event.clientX - offset.x;
            dragHandle.y = event.clientY - offset.y;
            drawAndUpointDestinationAteFunction();
        }
        
        //here we using mouse events for the circles and checking if they are clicked or not (part 3)
        function onMouseUp(event) {
            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);	
            isDragging = false;
            drawAndUpointDestinationAteFunction();
        }

}