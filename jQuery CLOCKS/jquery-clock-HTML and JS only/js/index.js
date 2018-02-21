$(function() {

    var canvas = $("#canvas").get(0);
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    setInterval(drawClock, 1000);

    function drawClock() {
        drawFace(ctx, radius);
        drawNumbers(ctx, radius);
        drawTicks(ctx, radius);
        drawTime(ctx, radius);
    }

    function drawFace(ctx, radius) {
        ctx.beginPath();
        ctx.arc(0,0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        var grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, "#333");
        grad.addColorStop(0.5, "white");
        grad.addColorStop(1, "#333");
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
        ctx.fillStyle = "#333";
        ctx.fill();
    }

    function drawNumbers(ctx, radius) {
        var romans = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII" ];
        var ang, num;
        var fontBig = radius * 0.15 + "px Arial";
        var fontSmall = radius * 0.075 + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6;
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.78);
            ctx.rotate(-ang);
            ctx.font = fontBig;
            ctx.fillStyle = "black";
            ctx.fillText(num.toString(), 0, 0);
            //ctx.fillText(romans[num-1], 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.78);
            ctx.rotate(-ang);

            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.60);
            ctx.rotate(-ang);
            ctx.font = fontSmall;
            ctx.fillStyle = "red";
            ctx.fillText((num + 12).toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.60);
            ctx.rotate(-ang);
        }

        // Write author text
        ctx.font = fontSmall;
        ctx.fillStyle = "#3D3B3D";
        ctx.translate(0, radius * 0.30);
        ctx.fillText("@AlanMunsonTech", 0, 0);
        ctx.translate(0, -radius * 0.30);
    }

    function drawTicks(ctx, radius) {
        var numTicks, tickAng, tickX, tickY;
        for (numTicks = 0; numTicks < 60; numTicks++) {

            tickAng = (numTicks * Math.PI / 30);
            tickX = radius * Math.sin(tickAng);
            tickY = -radius * Math.cos(tickAng);

            ctx.beginPath();
            ctx.lineWidth = radius * 0.010;
            ctx.moveTo(tickX, tickY);
            if (numTicks % 5 === 0) {
                ctx.lineTo(tickX * 0.88, tickY * 0.88);
            } else {
                ctx.lineTo(tickX * 0.92, tickY * 0.92);
            }
            ctx.stroke();
        }
    }

    function drawTime(ctx, radius) {
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        // hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
        drawHand(ctx, hour, radius * 0.5, radius * 0.05);
        // minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        drawHand(ctx, minute, radius * 0.8, radius * 0.05);
        // second
        second = (second * Math.PI / 30);
        drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");

    }

    function drawHand(ctx, pos, length, width, color) {
        color = color || "black";
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    }

});