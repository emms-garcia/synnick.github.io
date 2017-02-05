(function () {
    function isInsideCircle(point, center, radius) {
        return (
            Math.pow(point[0] - center[0], 2) +
            Math.pow(point[1] - center[1], 2)
        ) < Math.pow(radius, 2);
    }

    function isInsideTriangle(point, t1, t2, t3){
        function sign(p1, p2, p3){
            return (
                ((p1[0] - p3[0]) * (p2[1] - p3[1])) -
                ((p2[0] - p3[0]) * (p1[1] - p3[1]))
            );
        }

        var b1 = sign(point, t1, t2) < 0.0;
        var b2 = sign(point, t2, t3) < 0.0;
        var b3 = sign(point, t3, t1) < 0.0;
        return ((b1 == b2) && (b2 == b3));
    }

    var canvas = document.getElementById('main');
    var ctx = canvas.getContext('2d');

    canvas.width = document.getElementById('wrapper').clientWidth;
    canvas.height = document.getElementById('wrapper').clientHeight;

    var globalCenter = { x: canvas.width / 2, y: canvas.height / 2 };

    var HEART = {
        circle1: {
            center: [
                globalCenter.x - canvas.width * 0.12,
                globalCenter.y - canvas.height * 0.15,
            ],
            radius: canvas.width * 0.15,
        },
        circle2: {
            center: [
                globalCenter.x + canvas.width * 0.12,
                globalCenter.y - canvas.height * 0.15,
            ],
            radius: canvas.width * 0.15,
        },
        triangle: {
            points: [
                [
                    globalCenter.x - (canvas.width * 0.125) * 2,
                    globalCenter.y,
                ],
                [
                    globalCenter.x + (canvas.width * 0.125) * 2,
                    globalCenter.y,
                ],
                [
                    globalCenter.x,
                    canvas.height / 2 + (canvas.width * 0.2),
                ],
            ],
        },
    };

    var vertices = new Array(4056);
    for(var i = vertices.length; i--;) {
        do{
            var x = Math.random() - 0.53;
            var y = Math.random() - 0.5;
        } while(x * x + y * y > 0.55);
        x = (x * 0.96875 + 0.5) * canvas.width;
        y = (y * 0.96875 + 0.5) * canvas.height;
        vertices[i] = [x, y];
    }

    var triangles = Delaunay.triangulate(vertices);

    var randomColors = [
        '#00769C', '#7DD449', '#7DD449', '#648C84',
        '#035762', '#05918E', '#D4F3EE', '#FFD006',
        '#F4EBCE', '#C4BBB4', '#8F4171', '#831659',
        '#BC121D', '#65D8D3', '#FEFDAA', '#FFEE00',
        '#FADEDB', '#FFFEFF', '#C84236', '#544C88',
        '#21317C',
    ];

    var heartColors = [
        '#8F4171', '#831659', '#BC121D',
        '#C84236', '#F46441', '#E50568',
    ];

    for(var i = triangles.length; i;) {
        ctx.beginPath();
        --i;
        ctx.moveTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
        --i;
        ctx.lineTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
        --i;
        ctx.lineTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
        ctx.closePath();

        var isInsideHeart = false;
        for (var j = i; j < i + 3; j++){
            if (isInsideCircle(
                vertices[triangles[j]], HEART.circle1.center, HEART.circle1.radius
            ) || isInsideCircle(
                vertices[triangles[j]], HEART.circle2.center, HEART.circle2.radius
            )) {
                isInsideHeart = true;
                break
            }

            if (isInsideTriangle(
                vertices[triangles[j]],
                HEART.triangle.points[0],
                HEART.triangle.points[1],
                HEART.triangle.points[2]
            )) {
                isInsideHeart = true;
                break;
            }
        }
        if (isInsideHeart) {
            ctx.fillStyle = heartColors[Math.floor((Math.random() * heartColors.length))];
        } else {
            ctx.fillStyle = randomColors[Math.floor((Math.random() * randomColors.length))];
        }

        ctx.fill();
    }
}());
