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

    var id = null;

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
        function showAngleC(){
            angleCInDegrees();
            context.strokeStyle = "#3d443d";
            context.strokeText("Angle C is : " , canvas.width - 100 , 15);
            context.strokeText(resultOfAngleC , canvas.width - 45 , 15 );
        }
        function showAngleB(){
            angleBInDegrees();
            context.strokeText("Angle B is : ", canvas.width - 100 , 30);
            context.strokeText(resultOfAngleB , canvas.width - 45 , 30);
        }
        function showAngleA(){
            angleAInDegrees();
            context.strokeText("Angle A is : " , canvas.width - 100 , 45);
            context.strokeText(resultOfAngleA , canvas.width - 45 , 45);
        }
        
        function LengthOfSideC(){
            //--------------------------------------------------declaring the needed variables to calculate side C
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("Length of side C is : " , canvas.width - 130 , 60);
            context.strokeText(resultOfSideC , canvas.width - 35 , 60);
        }

        function LengthOfSideB(){
            //--------------------------------------------------declaring the needed variables to calculate side B
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("Length of side B is : " , canvas.width - 130 , 75);
            context.strokeText(resultOfSideB , canvas.width - 35 , 75);
        }

        function LengthOfSideA(){
            //--------------------------------------------------declaring the needed variables to calculate side A
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("Length of side A is : " , canvas.width - 130 , 90);
            context.strokeText(resultOfSideA , canvas.width - 35 , 90);
        }

        function AreaOfTriangle(){
            //--------------------------------------------------declaring the needed variables
            var lengthXA = pointStartC.x - pointDestinationA.x;
            var lengthYA = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthXA * lengthXA + lengthYA * lengthYA);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;
            
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //--------------------------------------------------calculating the area
            var Area = ((resultOfSideB)*(resultOfSideA)*Math.sin(resultOfAngleC))/2;
            Area = Math.abs(Area);
            Area = Math.round((Area + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("Area of triangle is : " , canvas.width - 130 , 105);
            context.strokeText(Area , canvas.width - 38 , 105);
            if(Area === 0){
                window.alert("Area of triangle cannot be zero");
            }
        }

        function CircumscribedCircle(){
            //--------------------------------------------------declaring the needed variables
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;

            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //--------------------------------------------------calculating the Radius
            var Radius = (resultOfSideC)/(2*(Math.sin(resultOfAngleC)));
            Radius = Math.abs(Radius);
            Radius = Math.round((Radius + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("The Circumscribed Circle's length is : " , canvas.width - 210 , 120);
            context.strokeText(Radius , canvas.width - 38 , 120);

        }
        function sizeOfTriangle(){
            //--------------------------------------------------declaring the needed variables
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
    
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;
    
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            //--------------------------------------------------calculating the sum of the sides of the original ABC triangle
            var sumOfSides;
            sumOfSides = resultOfSideA + resultOfSideB + resultOfSideC;
            sumOfSides = Math.round((sumOfSides + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("Size of triangle is : " , canvas.width - 130 , 135);
            context.strokeText(sumOfSides , canvas.width - 38 , 135);
        }

        function lengthOfInnerCircleRad(){
            //--------------------------------------------------declaring the needed variables
            //--------------------------------------------------and finding the radius
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
    
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;
    
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //--------------------------------------------------Calculating the area of the abc triangle
            var Area = ((resultOfSideB)*(resultOfSideA)*Math.sin(resultOfAngleC))/2;
            Area = Area * 180 / Math.PI;
            Area = Math.abs(Area);
            Area = Math.round((Area + Number.EPSILON) * 100) / 100;

            var semka,erka;
            //semka is the semiperimeter of the ABC (original) triangle
            //erka is the radius of the inercircle
            semka = (a + b + c)/2;
            erka = (Math.sqrt(semka*(semka - a)*(semka - b)*(semka - c)))/semka;
            erka = erka * 3 / 100;
            erka = Math.round((erka + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("Size of inner circle of triangle is : " , canvas.width - 190 , 150);
            context.strokeText(erka , canvas.width - 38 , 150);
        }

        function lengthOfAllAngleBisectors(){
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            var semka , angbisA , angbisB , angbisC;
            semka = (a + b + c)/2;
            angbisA = 2*((Math.sqrt(b*c*semka*(semka - a))/(b+c)));
            angbisB = 2*((Math.sqrt(a*c*semka*(semka - b))/(a+c)));
            angbisC = 2*((Math.sqrt(b*a*semka*(semka - c))/(b+a)));
            angbisA = angbisA * 3 / 100;
            angbisB = angbisB * 3 / 100;
            angbisC = angbisC * 3 / 100;
            angbisA = Math.round((angbisA + Number.EPSILON) * 100) / 100;
            angbisB = Math.round((angbisB + Number.EPSILON) * 100) / 100;
            angbisC = Math.round((angbisC + Number.EPSILON) * 100) / 100;
            context.strokeStyle = "#3d443d";
            context.strokeText("Size of angle bisector of angle A is : " , canvas.width - 205 , 165);
            context.strokeText(angbisA , canvas.width - 38 , 165);
            context.strokeText("Size of angle bisector of angle B is : " , canvas.width - 205 , 180);
            context.strokeText(angbisB , canvas.width - 38 , 180);
            context.strokeText("Size of angle bisector of angle C is : " , canvas.width - 205 , 195);
            context.strokeText(angbisC , canvas.width - 38 , 195);
        }

        function lengthOfAllAltitudes(){
            var lengthXA = pointStartC.x - pointDestinationA.x;
            var lengthYA = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthXA * lengthXA + lengthYA * lengthYA);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;

            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
            
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //--------------------------------------------------calculating the area
            var Area = ((resultOfSideB)*(resultOfSideA)*Math.sin(resultOfAngleC))/2;
            Area = Math.abs(Area);
            Area = Math.round((Area + Number.EPSILON) * 100) / 100;
            var heightA , heightB , heightC;
            heightA = 2*Area/resultOfSideA;
            heightB = 2*Area/resultOfSideB;
            heightC = 2*Area/resultOfSideC;
            heightA = Math.round((heightA + Number.EPSILON) * 100) / 100;
            heightB = Math.round((heightB + Number.EPSILON) * 100) / 100;
            heightC = Math.round((heightC + Number.EPSILON) * 100) / 100;
            //------------------------------------------------------------------------
            context.strokeStyle = "#3d443d";
            context.strokeText("Size of Altitude A is : " , canvas.width - 137 , 210);
            context.strokeText(heightA , canvas.width - 38 , 210);
            context.strokeText("Size of Altitude B is : " , canvas.width - 137 , 225);
            context.strokeText(heightB , canvas.width - 38 , 225);
            context.strokeText("Size of Altitude C is : " , canvas.width - 137 , 240);
            context.strokeText(heightC , canvas.width - 38 , 240);
        }

        function lengthOfAllMedians(){
            var lengthXA = pointStartC.x - pointDestinationA.x;
            var lengthYA = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthXA * lengthXA + lengthYA * lengthYA);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;

            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
            var AMDOUBLED,BMDOUBLED,CMDOUBLED,AM,BM,CM;
            AMDOUBLED = (resultOfSideC*resultOfSideC/2) + (resultOfSideB*resultOfSideB/2) - (resultOfSideA*resultOfSideA/4);
            BMDOUBLED = (resultOfSideC*resultOfSideC/2) + (resultOfSideA*resultOfSideA/2) - (resultOfSideB*resultOfSideB/4);
            CMDOUBLED = (resultOfSideA*resultOfSideA/2) + (resultOfSideB*resultOfSideB/2) - (resultOfSideC*resultOfSideC/4);
            AM = Math.sqrt(AMDOUBLED);
            BM = Math.sqrt(BMDOUBLED);
            CM = Math.sqrt(CMDOUBLED);

            AM = Math.round((AM + Number.EPSILON) * 100) / 100;
            BM = Math.round((BM + Number.EPSILON) * 100) / 100;
            CM = Math.round((CM + Number.EPSILON) * 100) / 100;

            //------------------------------------------------------------------------
            context.strokeStyle = "#3d443d";
            context.strokeText("Size of Median CM is : " , canvas.width - 145 , 255);
            context.strokeText(CM , canvas.width - 38 , 255);
            context.strokeText("Size of Median BM is : " , canvas.width - 145 , 270);
            context.strokeText(BM , canvas.width - 38 , 270);
            context.strokeText("Size of Median AM is : " , canvas.width - 145 , 285);
            context.strokeText(AM , canvas.width - 38 , 285);
        }

        function lengthOfExcirclesRadiuses(){
            //angles
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
            resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
            resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
            resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;

            //side C
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;

            //side B
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;

            //side A
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            var Area = ((resultOfSideB)*(resultOfSideA)*Math.sin(resultOfAngleC))/2;
            Area = Math.abs(Area);
            Area = Math.round((Area + Number.EPSILON) * 100) / 100;

            var sumOfSides,innerRadius;
            sumOfSides = resultOfSideA + resultOfSideB + resultOfSideC;
            sumOfSides = Math.round((sumOfSides + Number.EPSILON) * 100) / 100;
            sumOfSides = sumOfSides / 2;
            innerRadius = Area/sumOfSides;

            r1 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideA);
            r2 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideB);
            r3 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideC);
            r1 = r1*100/3;
            r2 = r2*100/3;
            r3 = r3*100/3;
            r1 = Math.abs(r1);
            r2 = Math.abs(r2);
            r3 = Math.abs(r3);
            r1 = Math.round((r1 + Number.EPSILON) * 100) / 100;
            r2 = Math.round((r2 + Number.EPSILON) * 100) / 100;
            r3 = Math.round((r3 + Number.EPSILON) * 100) / 100;

            //------------------------------------------------------------------------
            context.strokeStyle = "#3d443d";
            context.strokeText("Size of Excircle tangent to AC is : " , canvas.width - 190 , 300);
            context.strokeText(r2 , canvas.width - 38 , 300);
            context.strokeText("Size of Excircle tangent to AB is : " , canvas.width - 190 , 315);
            context.strokeText(r3 , canvas.width - 38 , 315);
            context.strokeText("Size of Excircle tangent to BC is : " , canvas.width - 190 , 330);
            context.strokeText(r1 , canvas.width - 38 , 330);
        }

        function areaOfExtouchTriangle(){
            //----------------------------------------------------------As usual declaring the needed variables
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            //angle c
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //angle b
            resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
            resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
            //angle a
            resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
            resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;
            //side C
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
            //side B
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;
            //side A
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;

            //---------------------------------------------------finding the area of the extouch triangle
        
            var K,areaOfIncircleTr,semka,erka;
            semka = (resultOfSideA + resultOfSideB + resultOfSideC)/2;
            erka = (Math.sqrt(semka*(semka - resultOfSideC)*(semka - resultOfSideB)*(semka - resultOfSideA)))/semka;
            areaOfIncircleTr = semka*erka;
        
            K = (areaOfIncircleTr*2*erka*erka*semka/resultOfSideA*resultOfSideB*resultOfSideC);
            K = K / 100 * 3;
            K = Math.abs(K);
            K = Math.round((K + Number.EPSILON) * 100) / 100;

            //------------------------------------------------------------------------
            context.strokeStyle = "#3d443d";
            context.strokeText("Area of Extouch Triangle is : " , canvas.width - 185 , 345);
            context.strokeText(K , canvas.width - 55 , 345);
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

        function angleBisectorC(){
            //--------------------------------------------------declaring the needed variables
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));

            var xOfBisectingPoint,yOfBisectingPoint;
            //xOfBisectingPoint and yOfBisectingPoint are the coorinates where the angle bisector of angle C is intersecting with the opposite side
            xOfBisectingPoint = ((b * pointDestinationA.x) + (a * pointStartA.x)) / (b + a);
            yOfBisectingPoint = ((b * pointDestinationA.y) + (a * pointStartA.y)) / (b + a);
            context.fillStyle = "#9ACD32";
            context.beginPath();
            context.moveTo(pointStartC.x,pointStartC.y);
            context.lineTo(xOfBisectingPoint,yOfBisectingPoint);
            context.stroke();
            context.beginPath();
            context.arc(xOfBisectingPoint , yOfBisectingPoint , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side A
            context.fillText("LC" , xOfBisectingPoint - 8, yOfBisectingPoint + 20);
            context.fill();
        }

        function angleBisectorB(){
            //--------------------------------------------------declaring the needed variables
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));

            var xOfBisectingPointB,yOfBisectingPointB;
            //xOfBisectingPointB and yOfBisectingPointB are the coorinates where the angle bisector of angle B is intersecting with the opposite side
            xOfBisectingPointB = ((a * pointStartA.x) + (c * pointStartC.x)) / (c + a);
            yOfBisectingPointB = ((a * pointStartA.y) + (c * pointStartC.y)) / (c + a);
            context.fillStyle = "#9ACD32";
            context.beginPath();
            context.moveTo(pointDestinationA.x,pointDestinationA.y);
            context.lineTo(xOfBisectingPointB,yOfBisectingPointB);
            context.stroke();
            context.beginPath();
            context.arc(xOfBisectingPointB , yOfBisectingPointB , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side A
            context.fillText("LB" , xOfBisectingPointB - 20, yOfBisectingPointB - 5);
            context.fill();
        }

        function angleBisectorA(){
            //--------------------------------------------------declaring the needed variables
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));

            var xOfBisectingPointA,yOfBisectingPointA;
            //xOfBisectingPointA and yOfBisectingPointA are the coorinates where the angle bisector of angle A is intersecting with the opposite side
            xOfBisectingPointA = ((b * pointDestinationA.x) + (c * pointStartC.x)) / (c + b);
            yOfBisectingPointA = ((b * pointDestinationA.y) + (c * pointStartC.y)) / (c + b);
            context.fillStyle = "#9ACD32";
            context.beginPath();
            context.moveTo(pointStartA.x,pointStartA.y);
            context.lineTo(xOfBisectingPointA,yOfBisectingPointA);
            context.stroke();
            context.beginPath();
            context.arc(xOfBisectingPointA , yOfBisectingPointA , 5 , 0 , Math.PI * 2 , false);
            context.fill();
            context.beginPath();
            //defining the position(X,Y) of the midpoint of side A
            context.fillText("LA" , xOfBisectingPointA + 8, yOfBisectingPointA - 5);
            context.fill();
        }

        function altitudeAngleC(){
            context.fillStyle = "#3d443d";
            //algorithm for finding the altitude from a point(angle(in this case C)) to a line segment
            var a_to_p , a_to_b;
            a_to_p = {
                x: pointStartC.x - pointStartA.x,
                y: pointStartC.y - pointStartA.y
            }
            a_to_b = {
                x: pointDestinationA.x - pointStartA.x,
                y: pointDestinationA.y - pointStartA.y
            }
            var atb2 = a_to_b.x * a_to_b.x + a_to_b.y * a_to_b.y;
            var atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
            var t = atp_dot_atb / atb2;
            var pointResultX,pointResultY;
            pointResultX = pointStartA.x + a_to_b.x * t;
            pointResultY = pointStartA.y + a_to_b.y * t;
            context.beginPath();
            context.moveTo(pointStartC.x,pointStartC.y);
            context.lineTo(pointResultX,pointResultY);
            context.stroke();
            //drawing the prolongation of the altitude with the side
            if(resultOfAngleA > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartA.x , pointStartA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Ha" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleB > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointDestinationA.x , pointDestinationA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hb" , pointResultX + 20 , pointResultY);
                context.fill();
            }
            if(resultOfAngleA < 90 && resultOfAngleB < 90){
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("HC" , pointResultX + 5 , pointResultY - 5);
                context.fill();
            }
        }

        function altitudeAngleB(){
            context.fillStyle = "#3d443d";
            //algorithm for finding the altitude from a point(angle(in this case B)) to a line segment
            var a_to_p , a_to_b;
            a_to_p = {
                x: pointDestinationA.x - pointStartA.x,
                y: pointDestinationA.y - pointStartA.y
            }
            a_to_b = {
                x: pointStartC.x - pointStartA.x,
                y: pointStartC.y - pointStartA.y
            }
            var atb2 = a_to_b.x * a_to_b.x + a_to_b.y * a_to_b.y;
            var atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
            var t = atp_dot_atb / atb2;
            var pointResultX,pointResultY;
            pointResultX = pointStartA.x + a_to_b.x * t;
            pointResultY = pointStartA.y + a_to_b.y * t;
            context.beginPath();
            context.moveTo(pointDestinationA.x,pointDestinationA.y);
            context.lineTo(pointResultX,pointResultY);
            context.stroke();
            //drawing the prolongation of the altitude with the side
            if(resultOfAngleA > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartA.x , pointStartA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Ha" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleC > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartC.x , pointStartC.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hc" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleA < 90 && resultOfAngleC < 90){
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("HB" , pointResultX + 10 , pointResultY + 3);
                context.fill();
            }
        }

        function altitudeAngleA(){
            context.fillStyle = "#3d443d";
            //algorithm for finding the altitude from a point(angle(in this case A)) to a line segment
            var a_to_p , a_to_b;
            a_to_p = {
                x: pointStartA.x - pointStartC.x,
                y: pointStartA.y - pointStartC.y
            }
            a_to_b = {
                x: pointDestinationA.x - pointStartC.x,
                y: pointDestinationA.y - pointStartC.y
            }
            var atb2 = a_to_b.x * a_to_b.x + a_to_b.y * a_to_b.y;
            var atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
            var t = atp_dot_atb / atb2;
            var pointResultX,pointResultY;
            pointResultX = pointStartC.x + a_to_b.x * t;
            pointResultY = pointStartC.y + a_to_b.y * t;
            context.beginPath();
            context.moveTo(pointStartA.x,pointStartA.y);
            context.lineTo(pointResultX,pointResultY);
            context.stroke();
            //drawing the prolongation of the altitude with the side
            if(resultOfAngleB > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointDestinationA.x , pointDestinationA.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hb" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleC > 90){
                context.beginPath();
                context.moveTo(pointResultX , pointResultY);
                context.lineTo(pointStartC.x , pointStartC.y);
                context.stroke();
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("Hc" , pointResultX - 30 , pointResultY);
                context.fill();
            }
            if(resultOfAngleB < 90 && resultOfAngleC < 90){
                context.beginPath();
                context.arc(pointResultX , pointResultY , 5 , 0 , Math.PI * 2 , false);
                context.stroke();
                context.beginPath();
                //defining the name of the prolongation
                context.fillText("HA" , pointResultX + 10 , pointResultY + 3);
                context.fill();
            }
        }

        document.getElementById("innercircle").onclick = function innerCircle(){
            //--------------------------------------------------declaring the needed variables
            //--------------------------------------------------and finding the radius
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
    
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;
    
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
            
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //--------------------------------------------------Calculating the area of the abc triangle
            var Area = ((resultOfSideB)*(resultOfSideA)*Math.sin(resultOfAngleC))/2;
            Area = Area * 180 / Math.PI;
            Area = Math.abs(Area);
            Area = Math.round((Area + Number.EPSILON) * 100) / 100;

            var rx,ry,semka,erka;
            //rx is the X coordianate and ry is the Y coordinate of circle's position (X,Y)
            //semka is the semiperimeter of the ABC (original) triangle
            //erka is the radius of the inercircle
            semka = (a + b + c)/2;
            erka = (Math.sqrt(semka*(semka - a)*(semka - b)*(semka - c)))/semka;
            rx = (pointStartA.x*resultOfSideA + pointDestinationA.x*resultOfSideB + pointStartC.x*resultOfSideC)/(resultOfSideC + resultOfSideB + resultOfSideA);
            ry = (pointStartA.y*resultOfSideA + pointDestinationA.y*resultOfSideB + pointStartC.y*resultOfSideC)/(resultOfSideC + resultOfSideB + resultOfSideA);

            context.fillStyle = "#3d443d";
            context.beginPath();
            context.arc(rx , ry , erka, 0 , Math.PI * 2 , false);
            context.fillText("r", rx , ry - 7);
            context.stroke();
            context.beginPath();
            context.arc(rx , ry , 2, 0 , Math.PI * 2 , false);
            context.stroke();

            id = requestAnimationFrame(innerCircle);

            function innercircleOn(){
                document.getElementById("innercircle").style.display = "none";
                document.getElementById("undoinnercircle").style.display = "block";
            }
            innercircleOn();
        
            document.getElementById('undoinnercircle').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function innercircleOff(){
                    document.getElementById("undoinnercircle").style.display = "none";
                    document.getElementById("innercircle").style.display = "block";
                }
                innercircleOff();
                
            });

        }

        document.getElementById("circumcircle").onclick = function circumcircle() {
            //--------------------------------------------------declaring the needed variables
            a = pointStartA;
            b = pointDestinationA;
            c = pointStartC;
          
            //------------------And here just using the compatible algorithm to find the circumscribed circle of ABC triangle
            var A = b.x - a.x,
                B = b.y - a.y,
                C = c.x - a.x,
                D = c.y - a.y,
                E = A * (a.x + b.x) + B * (a.y + b.y),
                F = C * (a.x + c.x) + D * (a.y + c.y),
                G = 2 * (A * (c.y - b.y) - B * (c.x - b.x)),
                minx, miny, dx, dy;
          
            if(Math.abs(G) < 0.000001) {
              minx = Math.min(a.x, b.x, c.x);
              miny = Math.min(a.y, b.y, c.y);
              dx   = (Math.max(a.x, b.x, c.x) - minx) * 0.5;
              dy   = (Math.max(a.y, b.y, c.y) - miny) * 0.5;
          
              this.x = minx + dx;
              this.y = miny + dy;
              this.r = dx * dx + dy * dy;
            }
          
            else {
              this.x = (D*E - B*F) / G;
              this.y = (A*F - C*E) / G;
              dx = this.x - a.x;
              dy = this.y - a.y;
              this.r = Math.sqrt(dx * dx + dy * dy);
            }

            context.fillStyle = "#A52A2A";
            context.beginPath();
            context.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
            context.fillText("R",this.x , this.y - 7);
            context.stroke();
            context.beginPath();
            context.arc(this.x , this.y , 2 , 0 , Math.PI * 2 , false);
            context.stroke();

            //making the function to be drawn every possible frame on the screen by clicking a button
            //
            id = requestAnimationFrame(circumcircle);
            
            function circumcircleOn(){
                document.getElementById("circumcircle").style.display = "none";
                document.getElementById("undocircumcircle").style.display = "block";
            }
            circumcircleOn();

            document.getElementById('undocircumcircle').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function circumcircleOff(){
                    document.getElementById("undocircumcircle").style.display = "none";
                    document.getElementById("circumcircle").style.display = "block";
                }
                circumcircleOff();
                
            });
        }

          //algorithm for line bisector c
          //there is no algorithm for line bisector A and B because it's the same like in c , just the variables are replaced 
          //so it's compatible for side A and respectivly for B
          //----------------------------------------------------
          //and the Algorithm is not used because its infinite line which is not smootly looking in the canvas
          //because its lagging and disappearing and appearing all the time
          function lineBisectorC(){
            var x,x1,x2,y,y1,y2,m,result,y3,x3;
            x1 = pointStartA.x;
            x2 = pointDestinationA.x;
            y1 = pointStartA.y;
            y2 = pointDestinationA.y;
            x = (x1 + x2)/2;
            y = (y1 + y2)/2;
            m = -1*((x2 - x1) / (y2 - y1));
            y3 = m * (x3 - x) + y;
            y3 = m*(-x) + y;
            x3 = (m*x - y)/m;
            context.beginPath();
            context.moveTo(x , y);
            context.lineTo(x3 , y3);
            context.stroke();
        }

        document.getElementById("excirclesoftr").onclick = function excirclesOfTriangle(){
            //--------------------------------------------------declaring the needed variables
            //side C
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;

            //side B
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;

            //side A
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;

            //--------------declaring the needed variables for every excircle's X and Y 
            var x1,y1,x2,y2,x3,y3,i1x,i1y,i2x,i2y,i3x,i3y,innerRadius;
            x1 = pointStartA.x;
            y1 = pointStartA.y;
            x2 = pointDestinationA.x;
            y2 = pointDestinationA.y;
            x3 = pointStartC.x;
            y3 = pointStartC.y;

            i1x = (resultOfSideB*x2 + resultOfSideC*x3 + (-1*resultOfSideA*x1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            i1y = (resultOfSideB*y2 + resultOfSideC*y3 + (-1*resultOfSideA*y1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            i2x = (resultOfSideA*x1 + resultOfSideC*x3 + (-1*resultOfSideB*x2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            i2y = (resultOfSideA*y1 + resultOfSideC*y3 + (-1*resultOfSideB*y2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            i3x = (resultOfSideA*x1 + resultOfSideB*x2 + (-1*resultOfSideC*x3))/(resultOfSideA + resultOfSideB - resultOfSideC);
            i3y = (resultOfSideA*y1 + resultOfSideB*y2 + (-1*resultOfSideC*y3))/(resultOfSideA + resultOfSideB - resultOfSideC);

            var r1,r2,r3;
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
            resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
            resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
            resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;
            //declaring the calculated already area and sum of the sides
            var Area = ((resultOfSideB)*(resultOfSideA)*Math.sin(resultOfAngleC))/2;
            Area = Math.abs(Area);
            Area = Math.round((Area + Number.EPSILON) * 100) / 100;

            var sumOfSides;
            sumOfSides = resultOfSideA + resultOfSideB + resultOfSideC;
            sumOfSides = Math.round((sumOfSides + Number.EPSILON) * 100) / 100;
            sumOfSides = sumOfSides / 2;
            innerRadius = Area/sumOfSides;

            r1 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideA);
            r2 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideB);
            r3 = innerRadius*sumOfSides / ((sumOfSides) - resultOfSideC);
            r1 = r1*100/3;
            r2 = r2*100/3;
            r3 = r3*100/3;
            r1 = Math.abs(r1);
            r2 = Math.abs(r2);
            r3 = Math.abs(r3);

            //drawing the excircles on the canvas

            context.beginPath();
            context.arc(i1x , i1y , r1 , 0 , Math.PI * 2 , false);
            context.stroke();

            context.beginPath();
            context.arc(i2x , i2y , r2 , 0 , Math.PI * 2 , false);
            context.stroke();

            context.beginPath();
            context.arc(i3x , i3y , r3 , 0 , Math.PI * 2 , false);
            context.stroke();

            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.stroke();

            context.fillStyle= "#cc9900";
            context.beginPath();
            context.fillText("JA" , i1x , i1y + 20);
            context.fillText("J B" , i2x - 10 , i2y - 10);
            context.fillText("JC" , i3x , i3y + 15);
            context.fill();

            //-------------------------------here we will create the tangent lines to the excircles

            var C,P,Ja_to_A,directionAngle,T1x,T1y,T2x,T2y,C1,C2,P1,P2;
            //creating the points
            C = {
                x: i1x,
                y: i1y
            }
            P = {
                x: pointStartA.x,
                y: pointStartA.y
            }
            C1 = {
                x: i2x,
                y: i2y
            }
            P1 = {
                x: pointDestinationA.x,
                y: pointDestinationA.y
            }
            C2 = {
                x: i3x,
                y: i3y
            }
            P2 = {
                x: pointStartC.x,
                y: pointStartC.y
            }

            //tangents of Ja(r1)

            Ja_to_A = Math.sqrt(Math.pow((P.x - C.x),2) + Math.pow((P.y - C.y),2));
            cosanostra = Math.acos(r1 / Ja_to_A);
            directionAngle = Math.atan2(P.y - C.y , P.x - C.x);
            dirTo1 = directionAngle + cosanostra;
            dirTo2 = directionAngle - cosanostra;

            T1x = C.x + r1 * Math.cos(dirTo1);
            T1y = C.y + r1 * Math.sin(dirTo1);
            T2x = C.x + r1 * Math.cos(dirTo2);
            T2y = C.y + r1 * Math.sin(dirTo2);

            //tangents of Jb(r2)

            Ja_to_B = Math.sqrt(Math.pow((P1.x - C1.x),2) + Math.pow((P1.y - C1.y),2));
            cosanostrab = Math.acos(r2 / Ja_to_B);
            directionAngleb = Math.atan2(P1.y - C1.y , P1.x - C1.x);
            dirTo1b = directionAngleb + cosanostrab;
            dirTo2b = directionAngleb - cosanostrab;

            T1xb = C1.x + r2 * Math.cos(dirTo1b);
            T1yb = C1.y + r2 * Math.sin(dirTo1b);
            T2xb = C1.x + r2 * Math.cos(dirTo2b);
            T2yb = C1.y + r2 * Math.sin(dirTo2b);

            //tangents of Jc(r3)

            Ja_to_C = Math.sqrt(Math.pow((P2.x - C2.x),2) + Math.pow((P2.y - C2.y),2));
            cosanostrac = Math.acos(r3 / Ja_to_C);
            directionAnglec = Math.atan2(P2.y - C2.y , P2.x - C2.x);
            dirTo1c = directionAnglec + cosanostrac;
            dirTo2c = directionAnglec - cosanostrac;

            T1xc = C2.x + r3 * Math.cos(dirTo1c);
            T1yc = C2.y + r3 * Math.sin(dirTo1c);
            T2xc = C2.x + r3 * Math.cos(dirTo2c);
            T2yc = C2.y + r3 * Math.sin(dirTo2c);

            //------------the triangle formed by the excircle's centers 

            context.beginPath();
            context.moveTo(i1x , i1y);
            context.lineTo(i2x , i2y);
            context.lineTo(i3x , i3y);
            context.lineTo(i1x , i1y);
            context.stroke();

            //drawing the tangents to the excircles on the canvas

            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.lineTo(T1x , T1y);
            context.stroke();

            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.lineTo(T2x , T2y);
            context.stroke();

            context.beginPath();
            context.moveTo(pointDestinationA.x , pointDestinationA.y);
            context.lineTo(T1xb , T1yb);
            context.stroke();

            context.beginPath();
            context.moveTo(pointDestinationA.x , pointDestinationA.y);
            context.lineTo(T2xb , T2yb);
            context.stroke();
            
            context.beginPath();
            context.moveTo(pointStartC.x , pointStartC.y);
            context.lineTo(T1xc , T1yc);
            context.stroke();

            context.beginPath();
            context.moveTo(pointStartC.x , pointStartC.y);
            context.lineTo(T2xc , T2yc);
            context.stroke();

            //drawing the points of the tangents of the excircles
            //A-Excircle
            context.beginPath();
            context.arc(T1x , T1y , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            context.arc(T2x , T2y , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            //B-Excircle
            context.arc(T1xb , T1yb , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            context.arc(T2xb , T2yb , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            //C-Excircle
            context.arc(T1xc , T1yc , 3 , 0 , Math.PI * 2 , false);
            context.stroke();
            context.beginPath();
            context.arc(T2xc , T2yc, 3 , 0 , Math.PI * 2 , false);
            context.stroke();

            //making the function to be drawn every possible frame on the screen by clicking a button
            id = requestAnimationFrame(excirclesOfTriangle);

            function exCirclesOn(){
                document.getElementById("excirclesoftr").style.display = "none";
                document.getElementById("undoex").style.display = "block";
            }
            exCirclesOn();

            document.getElementById('undoex').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function exCirclesOff(){
                    document.getElementById("undoex").style.display = "none";
                    document.getElementById("excirclesoftr").style.display = "block";
                }
                exCirclesOff();
                
            });

        }            

        document.getElementById("incentraltr").onclick = function incentralTriangle(){
            //angle bisector A
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var xOfBisectingPointA,yOfBisectingPointA;
            xOfBisectingPointA = ((b * pointDestinationA.x) + (c * pointStartC.x)) / (c + b);
            yOfBisectingPointA = ((b * pointDestinationA.y) + (c * pointStartC.y)) / (c + b);

            //angle bisector B
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            var xOfBisectingPointB,yOfBisectingPointB;
            xOfBisectingPointB = ((a * pointStartA.x) + (c * pointStartC.x)) / (c + a);
            yOfBisectingPointB = ((a * pointStartA.y) + (c * pointStartC.y)) / (c + a);

            //angle bisector C
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            var xOfBisectingPoint,yOfBisectingPoint;
            xOfBisectingPoint = ((b * pointDestinationA.x) + (a * pointStartA.x)) / (b + a);
            yOfBisectingPoint = ((b * pointDestinationA.y) + (a * pointStartA.y)) / (b + a);
            
            //declaring the points of the incentral triangle

            var i1,i2,i3;

            i1 = {
                x: xOfBisectingPointA,
                y: yOfBisectingPointA,
                radius: 10
            },

            i2 = {
                x: xOfBisectingPointB,
                y: yOfBisectingPointB,
                radius: 10
            },

            i3 = {
                x: xOfBisectingPoint,
                y: yOfBisectingPoint,
                radius: 10
            },

            a = i1;
            b = i2;
            c = i3;
            //we using here tha algorithm for circumscribed circle to draw the circumscribed circle of the incentral triangle
            var A = b.x - a.x,
                B = b.y - a.y,
                C = c.x - a.x,
                D = c.y - a.y,
                E = A * (a.x + b.x) + B * (a.y + b.y),
                F = C * (a.x + c.x) + D * (a.y + c.y),
                G = 2 * (A * (c.y - b.y) - B * (c.x - b.x)),
                minx, miny, dx, dy;
          
            if(Math.abs(G) < 0.000001) {
              minx = Math.min(a.x, b.x, c.x);
              miny = Math.min(a.y, b.y, c.y);
              dx   = (Math.max(a.x, b.x, c.x) - minx) * 0.5;
              dy   = (Math.max(a.y, b.y, c.y) - miny) * 0.5;
          
              this.x = minx + dx;
              this.y = miny + dy;
              this.r = dx * dx + dy * dy;
            }
          
            else {
              this.x = (D*E - B*F) / G;
              this.y = (A*F - C*E) / G;
              dx = this.x - a.x;
              dy = this.y - a.y;
              this.r = Math.sqrt(dx * dx + dy * dy);
            }
            
            context.beginPath();
            context.moveTo(xOfBisectingPointA , yOfBisectingPointA);
            context.lineTo(xOfBisectingPointB , yOfBisectingPointB);
            context.lineTo(xOfBisectingPoint , yOfBisectingPoint);
            context.lineTo(xOfBisectingPointA , yOfBisectingPointA);
            context.stroke();

            context.beginPath();
            context.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
            context.stroke();

            //drawing circles that are playing the role of showing where the points of the sides are at
            //
            //For IA
            context.fillStyle = "#20B2AA";
            context.beginPath();
            context.arc(xOfBisectingPointA , yOfBisectingPointA , 5 , Math.PI * 2 , false);
            context.fill();
            //For IB
            context.beginPath();
            context.arc(xOfBisectingPointB , yOfBisectingPointB , 5 , Math.PI * 2 , false);
            context.fill();
            //For IC
            context.beginPath();
            context.arc(xOfBisectingPoint , yOfBisectingPoint , 5 , Math.PI * 2 , false);
            context.fill();

            //drawing the incentral triangle notations
            context.beginPath();
            context.fillStyle = "#20B2AA";
            context.fillText("IA" , i1.x + 8, i1.y + 3);
            context.fillText("IB" , i2.x - 15, i2.y + 3);
            context.fillText("IC" , i3.x - 5 , i3.y + 13);
            context.fillText("I" , this.x + 8, this.y + 3);
            context.fill();
            context.beginPath();
            context.arc(this.x , this.y , 2 , 0 , Math.PI * 2 , false);
            context.stroke();

            //making the function to be drawn every possible frame on the screen by clicking a button
            id = requestAnimationFrame(incentralTriangle);

            function incentraltrOn(){
                document.getElementById("incentraltr").style.display = "none";
                document.getElementById("undoincentraltr").style.display = "block";
            }
            incentraltrOn();

            document.getElementById('undoincentraltr').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function incentraltrOff(){
                    document.getElementById("undoincentraltr").style.display = "none";
                    document.getElementById("incentraltr").style.display = "block";
                }
                incentraltrOff();
                
            });
        }

        document.getElementById("eulertr").onclick = function eulersTriangle(){
            //------------------------------------------------Intersecting of altitude A and B
            var a_to_pA , a_to_bA;
            //-----------------------here is the algorithm for altitude a:
            a_to_pA = {
                x: pointStartA.x - pointStartC.x,
                y: pointStartA.y - pointStartC.y
            }
            a_to_bA = {
                x: pointDestinationA.x - pointStartC.x,
                y: pointDestinationA.y - pointStartC.y
            }
            var atb2A = a_to_bA.x * a_to_bA.x + a_to_bA.y * a_to_bA.y;
            var atp_dot_atbA = a_to_pA.x * a_to_bA.x + a_to_pA.y * a_to_bA.y;
            var tA = atp_dot_atbA / atb2A;
            var pointResultXa,pointResultYa;
            pointResultXa = pointStartC.x + a_to_bA.x * tA;
            pointResultYa = pointStartC.y + a_to_bA.y * tA;
            //
            //-----------------------here is the algorithm for altitude b:
            var a_to_p , a_to_b;
            a_to_p = {
                x: pointDestinationA.x - pointStartA.x,
                y: pointDestinationA.y - pointStartA.y
            }
            a_to_b = {
                x: pointStartC.x - pointStartA.x,
                y: pointStartC.y - pointStartA.y
            }
            var atb2 = a_to_b.x * a_to_b.x + a_to_b.y * a_to_b.y;
            var atp_dot_atb = a_to_p.x * a_to_b.x + a_to_p.y * a_to_b.y;
            var t = atp_dot_atb / atb2;
            var pointResultXb,pointResultYb;
            pointResultXb = pointStartA.x + a_to_b.x * t;
            pointResultYb = pointStartA.y + a_to_b.y * t;

            //
            //-----------------------here is the algorithm for altitude c:
            var a_to_pc , a_to_bc;
            a_to_pc = {
                x: pointStartC.x - pointStartA.x,
                y: pointStartC.y - pointStartA.y
            }
            a_to_bc = {
                x: pointDestinationA.x - pointStartA.x,
                y: pointDestinationA.y - pointStartA.y
            }
            var atb2c = a_to_bc.x * a_to_bc.x + a_to_bc.y * a_to_bc.y;
            var atp_dot_atbc = a_to_pc.x * a_to_bc.x + a_to_pc.y * a_to_bc.y;
            var tc = atp_dot_atbc / atb2c;
            var pointResultXc,pointResultYc;
            pointResultXc = pointStartA.x + a_to_bc.x * tc;
            pointResultYc = pointStartA.y + a_to_bc.y * tc;

            //coordinates(X,Y) of intersection of the altitudes

            var A1 = pointResultYa - pointStartA.y;
            var B1 = pointStartA.x - pointResultXa;
            var C1 = A1 * pointStartA.x + B1 * pointStartA.y;
            var A2 = pointResultYb - pointDestinationA.y;
            var B2 = pointDestinationA.x - pointResultXb;
            var C2 = A2 * pointDestinationA.x + B2 * pointDestinationA.y;
            var den = A1 * B2 - A2 * B1;
            var xOrtpoint , yOrtpoint;
            xOrtpoint = (B2 * C1 - B1 * C2) / den;
            yOrtpoint = (A1 * C2 - A2 * C1) / den;

            //-------------------------------------------------------Coordinates of Euler's triangle

            var ahx,ahx1,ahx2,ahy,ahy1,ahy2;
            ahx1 = pointStartA.x;
            ahx2 = xOrtpoint;
            ahy1 = pointStartA.y;
            ahy2 = yOrtpoint;
            ahx = (ahx1 + ahx2)/2;
            ahy = (ahy1 + ahy2)/2;

            var bhx,bhx1,bhx2,bhy,bhy1,bhy2;
            bhx1 = xOrtpoint;
            bhx2 = pointDestinationA.x;
            bhy1 = yOrtpoint;
            bhy2 = pointDestinationA.y;
            bhx = (bhx1 + bhx2)/2;
            bhy = (bhy1 + bhy2)/2;

            var chx,chx1,chx2,chy,chy1,chy2;
            chx1 = pointStartC.x;
            chx2 = xOrtpoint;
            chy1 = pointStartC.y;
            chy2 = yOrtpoint;
            chx = (chx1 + chx2)/2;
            chy = (chy1 + chy2)/2;

            //----------------------------------------------------------drawing the Euler triangle
            
            //this is the point where all the orthocenter of the Euler's triangle
            context.fillStyle = "#C71585";
            context.beginPath();
            context.arc(xOrtpoint, yOrtpoint , 5 , 0 ,Math.PI * 2, false);
            context.fill();
            context.fillStyle = "#C71585";
            context.fillText("EH" ,xOrtpoint+2, yOrtpoint - 10);

            context.beginPath();
            context.arc(ahx, ahy , 5 , 0 ,Math.PI * 2, false);
            context.fill();

            context.beginPath();
            context.arc(bhx, bhy , 5 , 0 ,Math.PI * 2, false);
            context.fill();
            
            context.beginPath();
            context.arc(chx, chy , 5 , 0 ,Math.PI * 2, false);
            context.fill();

            context.beginPath();
            context.moveTo(ahx , ahy);
            context.lineTo(bhx , bhy);
            context.lineTo(chx , chy);
            context.lineTo(ahx , ahy);
            context.stroke();

            //drawing the points with their relative colors
            context.fillStyle = "#C71585";
            context.fillText("EA" , ahx + 15, ahy-2);
            context.fillText("EB" , bhx + 8, bhy);
            context.fillText("EC" , chx + 8, chy-5);
            //drawing the ratio between the altitudes and the points of the Euler's triangle that is forming
            context.beginPath();
            context.moveTo(pointStartA.x , pointStartA.y);
            context.lineTo(ahx , ahy);
            context.lineTo(xOrtpoint , yOrtpoint);
            context.lineTo(pointResultXa , pointResultYa);
            context.stroke();
            context.beginPath();
            context.moveTo(pointDestinationA.x , pointDestinationA.y);
            context.lineTo(bhx , bhy);
            context.lineTo(xOrtpoint , yOrtpoint);
            context.lineTo(pointResultXb , pointResultYb);           
            context.stroke();
            context.beginPath();
            context.moveTo(pointStartC.x , pointStartC.y);
            context.lineTo(chx , chy);
            context.lineTo(xOrtpoint , yOrtpoint);
            context.lineTo(pointResultXc , pointResultYc);           
            context.stroke();

            //Radius of Euler's triangle--------------------------------------------------------------

            var a = {
                x: ahx,
                y: ahy
            }
            var b = {
                x: bhx,
                y: bhy
            }
            var c = {
                x: chx,
                y: chy
            }
          
            var A = b.x - a.x,
                B = b.y - a.y,
                C = c.x - a.x,
                D = c.y - a.y,
                E = A * (a.x + b.x) + B * (a.y + b.y),
                F = C * (a.x + c.x) + D * (a.y + c.y),
                G = 2 * (A * (c.y - b.y) - B * (c.x - b.x)),
                minx, miny, dx, dy;
          
            if(Math.abs(G) < 0.000001) {
              minx = Math.min(a.x, b.x, c.x);
              miny = Math.min(a.y, b.y, c.y);
              dx   = (Math.max(a.x, b.x, c.x) - minx) * 0.5;
              dy   = (Math.max(a.y, b.y, c.y) - miny) * 0.5;
          
              this.x = minx + dx;
              this.y = miny + dy;
              this.r = dx * dx + dy * dy;
            }
          
            else {
              this.x = (D*E - B*F) / G;
              this.y = (A*F - C*E) / G;
              dx = this.x - a.x;
              dy = this.y - a.y;
              this.r = Math.sqrt(dx * dx + dy * dy);
            }

            context.fillStyle = "#C71585"
            context.beginPath();
            context.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
            context.fillText("ER" , this.x - 10, this.y - 8);
            context.stroke();

            context.beginPath();
            context.arc(this.x , this.y , 2 , 0 , Math.PI * 2 , false);
            context.stroke();

            //making the function to be drawn every possible frame on the screen by clicking a button
            id = requestAnimationFrame(eulersTriangle);

            function eulertrOn(){
                document.getElementById("eulertr").style.display = "none";
                document.getElementById("undoeulertr").style.display = "block";
            }
            eulertrOn();

            document.getElementById('undoeulertr').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function eulertrOff(){
                    document.getElementById("undoeulertr").style.display = "none";
                    document.getElementById("eulertr").style.display = "block";
                }
                eulertrOff();
                
            });
        }
        document.getElementById("extouchtr").onclick = function extouchTriangle(){
            context.lineWidth=1;
            //----------------------------------------------------------As usual declaring the needed variables
            var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
            var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
            var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
            //angle c
            resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b));
            resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
            //angle b
            resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
            resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
            //angle a
            resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
            resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;
            //side C
            var lengthX = pointDestinationA.x - pointStartA.x;
            var lengthY = pointDestinationA.y - pointStartA.y;
            var resultOfSideC = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideC = resultOfSideC / 100;
            resultOfSideC = resultOfSideC * 3;
            resultOfSideC = Math.round((resultOfSideC + Number.EPSILON) * 100) / 100;
            //side B
            var lengthX = pointStartA.x - pointStartC.x;
            var lengthY = pointStartA.y - pointStartC.y;
            var resultOfSideB = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideB = resultOfSideB / 100;
            resultOfSideB = resultOfSideB * 3;
            resultOfSideB = Math.round((resultOfSideB + Number.EPSILON) * 100) / 100;
            //side A
            var lengthX = pointStartC.x - pointDestinationA.x;
            var lengthY = pointStartC.y - pointDestinationA.y;
            var resultOfSideA = Math.sqrt(lengthX * lengthX + lengthY * lengthY);
            resultOfSideA = resultOfSideA / 100;
            resultOfSideA = resultOfSideA * 3;
            resultOfSideA = Math.round((resultOfSideA + Number.EPSILON) * 100) / 100;
        
            x1 = pointStartA.x;
            y1 = pointStartA.y;
            x2 = pointDestinationA.x;
            y2 = pointDestinationA.y;
            x3 = pointStartC.x;
            y3 = pointStartC.y;
        
            o2x = (resultOfSideA*x1 + resultOfSideC*x3 + (-1*resultOfSideB*x2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            o2y = (resultOfSideA*y1 + resultOfSideC*y3 + (-1*resultOfSideB*y2))/(resultOfSideA + resultOfSideC - resultOfSideB);
            o1x = (resultOfSideB*x2 + resultOfSideC*x3 + (-1*resultOfSideA*x1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            o1y = (resultOfSideB*y2 + resultOfSideC*y3 + (-1*resultOfSideA*y1))/(resultOfSideB + resultOfSideC - resultOfSideA);
            o3x = (resultOfSideA*x1 + resultOfSideB*x2 + (-1*resultOfSideC*x3))/(resultOfSideA + resultOfSideB - resultOfSideC);
            o3y = (resultOfSideA*y1 + resultOfSideB*y2 + (-1*resultOfSideC*y3))/(resultOfSideA + resultOfSideB - resultOfSideC);
        
            //the circle intersecting with AB
        
            context.fillStyle = "#2F4F4F";
            var LABc,Dxc,Dyc,tc,Exc,Eyc;
            LABc = c;
            Dxc = (pointDestinationA.x - pointStartA.x)/LABc;
            Dyc = (pointDestinationA.y - pointStartA.y)/LABc;
            tc = Dxc*(o3x - pointStartA.x) + Dyc*(o3y - pointStartA.y);
            Exc = tc*Dxc+pointStartA.x;
            Eyc = tc*Dyc+pointStartA.y;
            //
            context.beginPath();
            context.arc(Exc , Eyc , 5 , Math.PI * 2 , false);
            context.fill();
        
            //the circle intersecting with AC
        
            var LABb,Dxb,Dyb,tb,Exb,Eyb;
            LABb = b;
            Dxb = (pointStartC.x - pointStartA.x)/b;
            Dyb = (pointStartC.y - pointStartA.y)/b;
            tb = Dxb*(o2x - pointStartA.x) + Dyb*(o2y - pointStartA.y);
            Exb = tb*Dxb+pointStartA.x;
            Eyb = tb*Dyb+pointStartA.y;
            //
            context.beginPath();
            context.arc(Exb , Eyb , 5 , Math.PI * 2 , false);
            context.fill();
        
            //the circle intersecting with BC
        
            var LABa,Dxa,Dya,ta,Exa,Eya;
            LABa = a;
            Dxa = (pointDestinationA.x - pointStartC.x)/LABa;
            Dya = (pointDestinationA.y - pointStartC.y)/LABa;
            ta = Dxa*(o1x - pointDestinationA.x) + Dya*(o1y - pointDestinationA.y);
            Exa = ta*Dxa+pointDestinationA.x;
            Eya = ta*Dya+pointDestinationA.y;
            //
            context.beginPath();
            context.arc(Exa , Eya , 5 , Math.PI * 2 , false);
            context.fill();
        
            //drawing the extouch triangle
        
            context.beginPath();
            context.moveTo(Exa , Eya);
            context.lineTo(Exb , Eyb);
            context.lineTo(Exc , Eyc);
            context.lineTo(Exa , Eya);
            context.stroke();
        
            //notating the extouch triangle's angles
            context.fillStyle = "#2F4F4F";
            context.fillText("TA" , Exa + 10, Eya);
            context.fillText("TB" , Exb - 20, Eyb);
            context.fillText("TC" , Exc-5, Eyc + 20);
        
            //drawing the extouch triangle's circumscribed Circle
        
            a = {
                x: Exa,
                y: Eya
            }
            b = {
                x: Exb,
                y: Eyb
            }
            c = {
                x: Exc,
                y: Eyc
            }
          
            var A = b.x - a.x,
                B = b.y - a.y,
                C = c.x - a.x,
                D = c.y - a.y,
                E = A * (a.x + b.x) + B * (a.y + b.y),
                F = C * (a.x + c.x) + D * (a.y + c.y),
                G = 2 * (A * (c.y - b.y) - B * (c.x - b.x)),
                minx, miny, dx, dy;
          
            if(Math.abs(G) < 0.000001) {
              minx = Math.min(a.x, b.x, c.x);
              miny = Math.min(a.y, b.y, c.y);
              dx   = (Math.max(a.x, b.x, c.x) - minx) * 0.5;
              dy   = (Math.max(a.y, b.y, c.y) - miny) * 0.5;
          
              this.x = minx + dx;
              this.y = miny + dy;
              this.r = dx * dx + dy * dy;
            }
          
            else {
              this.x = (D*E - B*F) / G;
              this.y = (A*F - C*E) / G;
              dx = this.x - a.x;
              dy = this.y - a.y;
              this.r = Math.sqrt(dx * dx + dy * dy);
            }
        
            context.beginPath();
            context.arc(this.x , this.y , this.r , 0 , Math.PI * 2 , false);
            context.stroke();
            context.fillText("TR" , this.x + 3, this.y);
            context.beginPath();
            context.arc(this.x , this.y , 2 , 0 , Math.PI * 2 , false);
            context.stroke();
        
            //---------------------------------------------------finding the area of the extouch triangle
        
            var K,areaOfIncircleTr,semka,erka;
            semka = (resultOfSideA + resultOfSideB + resultOfSideC)/2;
            erka = (Math.sqrt(semka*(semka - resultOfSideC)*(semka - resultOfSideB)*(semka - resultOfSideA)))/semka;
            areaOfIncircleTr = semka*erka;
        
            K = (areaOfIncircleTr*2*erka*erka*semka/resultOfSideA*resultOfSideB*resultOfSideC);
            K = K / 100 * 3;
            K = Math.abs(K);
            K = Math.round((K + Number.EPSILON) * 100) / 100;
        
            //making the function to be drawn every possible frame on the screen by clicking a button
            //
            id = requestAnimationFrame(extouchTriangle);
            
            function exTouchOn(){
                document.getElementById("extouchtr").style.display = "none";
                document.getElementById("undoextouchtr").style.display = "block";
            }
            exTouchOn();
        
            document.getElementById('undoextouchtr').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function exTouchOff(){
                    document.getElementById("undoextouchtr").style.display = "none";
                    document.getElementById("extouchtr").style.display = "block";
                }
                exTouchOff();
                
            });
            
        }

        document.getElementById("midpoints").onclick = function midPoints(){
            
            midPointA();
            midPointB();    
            midPointC();

            id = requestAnimationFrame(midPoints);

            function midpointsOn(){
                document.getElementById("midpoints").style.display = "none";
                document.getElementById("undomidpoints").style.display = "block";
            }
            midpointsOn();
        
            document.getElementById('undomidpoints').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function midpointsOff(){
                    document.getElementById("undomidpoints").style.display = "none";
                    document.getElementById("midpoints").style.display = "block";
                }
                midpointsOff();
                
            });
        }

        document.getElementById("altitudes").onclick = function altitudes(){
            
            altitudeAngleA();
            altitudeAngleB();    
            altitudeAngleC();

            id = requestAnimationFrame(altitudes);

            function midpointsOn(){
                document.getElementById("altitudes").style.display = "none";
                document.getElementById("undoaltitudes").style.display = "block";
            }
            midpointsOn();
        
            document.getElementById('undoaltitudes').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function midpointsOff(){
                    document.getElementById("undoaltitudes").style.display = "none";
                    document.getElementById("altitudes").style.display = "block";
                }
                midpointsOff();
                
            });
        }

        document.getElementById("angleBisectors").onclick = function angleBisectors(){
            angleBisectorA();
            angleBisectorB();    
            angleBisectorC();

            id = requestAnimationFrame(angleBisectors);

            function angleBisectorsOn(){
                document.getElementById("angleBisectors").style.display = "none";
                document.getElementById("undoangleBisectors").style.display = "block";
            }
            angleBisectorsOn();
        
            document.getElementById('undoangleBisectors').addEventListener('click',function(){
                cancelAnimationFrame(id);
                drawAndUpointDestinationAteFunction();
                function angleBisectorsOff(){
                    document.getElementById("undoangleBisectors").style.display = "none";
                    document.getElementById("angleBisectors").style.display = "block";
                }
                angleBisectorsOff();
                
            });
        }

        function ifTriangleZeroOrInf(){
            angleAInDegrees();
            angleBInDegrees();
            angleCInDegrees();
            //console.log(resultOfAngleC);
            if(resultOfAngleC === 0 || resultOfAngleC === 180){
                console.log("Angle C cannot be zero or 180 degrees");
                window.alert("Angle C cannot be zero or 180 degrees");
            }
            else if(resultOfAngleB === 0 || resultOfAngleB === 180){
                console.log("Angle B cannot be zero or 180 degrees");
                window.alert("Angle B cannot be zero or 180 degrees");
            }
            else if(resultOfAngleA === 0 || resultOfAngleA === 180){
                console.log("Angle A cannot be zero or 180 degrees");
                window.alert("Angle A cannot be zero or 180 degrees");
            }
        }
        
        areaOfExtouchTriangle();
        lengthOfExcirclesRadiuses();
        lengthOfAllMedians();
        lengthOfAllAltitudes();
        lengthOfAllAngleBisectors();
        lengthOfInnerCircleRad();
        ifTriangleZeroOrInf();
        sizeOfTriangle();
        AreaOfTriangle();
        CircumscribedCircle();
        showAngleA();
        showAngleB();
        showAngleC();
        LengthOfSideC();
        LengthOfSideB();
        LengthOfSideA();
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

    function angleAInDegrees(){
        //declaring the point of the triangle
        var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
        var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
        var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
        //using cosine theorem to calculate the wanted angle
        resultOfAngleA = Math.acos(((Math.pow(c, 2)) + (Math.pow(b, 2)) - (Math.pow(a, 2))) / (2 * c * b)) * 180 / Math.PI;
        resultOfAngleA = Math.round((resultOfAngleA + Number.EPSILON) * 100) / 100;
        return resultOfAngleA;
    }

    function angleBInDegrees(){
        //declaring the point of the triangle
        var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
        var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
        var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
        //using cosine theorem to calculate the wanted angle
        resultOfAngleB = Math.acos(((Math.pow(c, 2)) + (Math.pow(a, 2)) - (Math.pow(b, 2))) / (2 * c * a)) * 180 / Math.PI;
        resultOfAngleB = Math.round((resultOfAngleB + Number.EPSILON) * 100) / 100;
        return resultOfAngleB;
    }

    function angleCInDegrees(){
        //declaring the point of the triangle
        var c = Math.sqrt(Math.pow((pointStartA.x - pointDestinationA.x),2) + Math.pow((pointStartA.y - pointDestinationA.y),2));
        var b = Math.sqrt(Math.pow((pointStartA.x - pointStartC.x),2) + Math.pow((pointStartA.y - pointStartC.y),2));
        var a = Math.sqrt(Math.pow((pointDestinationA.x - pointStartC.x),2) + Math.pow((pointDestinationA.y - pointStartC.y),2));
        //using cosine theorem to calculate the wanted angle
        resultOfAngleC = Math.acos(((Math.pow(a, 2)) + (Math.pow(b, 2)) - (Math.pow(c, 2))) / (2 * a * b)) * 180 / Math.PI;
        resultOfAngleC = Math.round((resultOfAngleC + Number.EPSILON) * 100) / 100;
        return resultOfAngleC;
    }

}
