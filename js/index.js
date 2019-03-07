$(function () {
	// 预加载
	setTimeout(function() {  
        // preload image  
        new Image().src = "./images/empty.png";  
		new Image().src = "./images/hit.png";  
		new Image().src = "./images/nnh01.png";  
		new Image().src = "./images/nnh02.png";  
		new Image().src = "./images/nnh03.png";  
		new Image().src = "./images/nnh04.png";  
		new Image().src = "./images/nnh05.png";  
		new Image().src = "./images/nnh06.png";  
		new Image().src = "./images/ymm01.png";  
		new Image().src = "./images/ymm02.png";  
		new Image().src = "./images/ymm03.png";  
		new Image().src = "./images/ymm04.png";  
		new Image().src = "./images/ymm05.png";  
		new Image().src = "./images/ymm06.png";  
    }, 1000);  
	
	
    //1.监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    })

    //2.监听关闭按钮的点击
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    })

    //3.监听开始游戏按钮的点击
    $(".start").click(function () {
		
        $(this).stop().fadeOut(100);
        $(".rules").stop().fadeOut(100);
        progressHandler();
        startpopAnimation();
    })
    
    //4.监听重新开始按钮的点击
    $(".restart").click(function () {
        $(".mask").stop().fadeOut(100);
        $(".score").html(0);
        progressHandler();
        startpopAnimation();
    })

    //倒计时
    function progressHandler() {
        $(".timer").html(30);
        var timer = setInterval(function () {
            var t = $(".timer").text();
            t --;
            if(t<=0){
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stoppopAnimation();
            }
            if(t < 10){
                $(".timer").html('0'+t);
            }
            else{
                $(".timer").html(t);
            }
        },1000)
    }

    var animationTimer;
	var animationTimer1;
		var arr=[
		{left:"210px",top:"185px"},
		{left:"536px",top:"180px"},
		{left:"100px",top:"250px"},
		{left:"319px",top:"270px"},
		{left:"682px",top:"250px"},
		{left:"100px",top:"400px"},
		{left:"311px",top:"410px"},
		{left:"686px",top:"390px"},
		{left:"539px",top:"331px"},
		{left:"536px",top:"457px"},
	];
	
    //动画
    function startpopAnimation() {
        //建立一个数组存放nnh图片
        var nnh=['./images/nnh01.png','./images/nnh02.png','./images/nnh03.png',
                 './images/nnh04.png','./images/nnh05.png','./images/nnh06.png',
                 './images/nnh05.png','./images/nnh04.png','./images/nnh03.png',
                 './images/nnh02.png','./images/nnh01.png','./images/empty.png','./images/empty.png'];
        //建立一个数组存放yumemi图片
        var ymm=['./images/ymm01.png','./images/ymm02.png','./images/ymm03.png',
                 './images/ymm04.png','./images/ymm05.png','./images/ymm06.png',
                 './images/ymm05.png','./images/ymm04.png','./images/ymm03.png',
                 './images/ymm02.png','./images/ymm01.png','./images/empty.png',,'./images/empty.png'];
        //存放洞的位置


        //创建一个图片
        var image = $("<img src='' class='image'> ");
        //随机获取图片的位置
        var pos = getRandom(0,9);
        //设置图片显示的位置
        image.css({
            position:"absolute",
            left:arr[pos].left,
            top:arr[pos].top
        });
		/*
		for(pos = 0;pos<10;pos++)
		{
			var image = $("<img src='' class='image'> ");
			image.css({
				position:"absolute",
				left:arr[pos].left,
				top:arr[pos].top
			});
			image.attr("src",pop[6]);
			$(".container").append(image);
		}
		*/
        //随机获取数组类型
        var array = Math.round(Math.random()) == 0 ? nnh : ymm;
        //设置图片的内容
        window.index = 0;
        window.indexEnd = 6;
        animationTimer = setInterval(function () {
            if(index > indexEnd){
                image.remove();
                clearInterval(animationTimer);
                startpopAnimation();
            }
            image.attr("src",array[index]);
            index ++;
        },getRandom(100,200));
        //将图片添加到界面上
        $(".container").append(image);
		
        //调用处理游戏规则方法
        gameRules(image);
    }

    //停止动画
    function stoppopAnimation() {
        $(".image").remove();
        clearInterval(animationTimer);
    }
	
	function showHit(pos)
	{		
		window.hindex = 0;
        window.hindexEnd = 1;
		var image1 = $("<img src='' class='image'> ");
        //设置图片显示的位置
        image1.css({
            position:"absolute",
            left:pos.left,
            top:pos.top
        });
		animationTimer1 = setInterval(function () {
            if(hindex > hindexEnd){
                image1.remove();
                clearInterval(animationTimer1);
            }
            image1.attr("src","./images/hit.png");
            hindex ++;
        },100);
		$(".container").append(image1);
	}

    //得到[min. max]的任一随机数
    function getRandom(min, max) {
        var num1 = Math.random() * (max - min);
        var num2 = Math.round(num1 + min);
        num2 = Math.max(Math.min(num2,max),min);
        return num2;
    }
	
	function toInt(number) 
	{
		return number && + number | 0 || 0;
	}

    //制定游戏规则
    function gameRules(image) {
        image.one("click",function () {
            //修改索引
            window.index = 6;
            window.indexEnd = 12;
            //拿到当前点击图片的地址
            var $src = $(this).attr("src");
            //根据图片地址判断是否是nnh
            var flag = $src.indexOf("h") >= 0;
            //根据点击的图片类型增减分数
			sc=toInt($(".score").text());
            if(flag){
				sc+=17 + getRandom(1,5);
            }
            else{
				sc-=13 + getRandom(1,5);
            }
			$(".score").text(sc);
			$(".score2").text(sc);
			console.log($(this).offset());
			showHit($(this).offset());
        })
    }
})