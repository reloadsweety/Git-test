var n=5 //countDown
var num=0;
var result;
var ready = true;
//music1 = new Audio('songBack.mp3');music1.loop=true;music1.play();
music2 = new Audio('dog.mp3');music2.loop=true;music2.play();
music3 = new Audio('cat.mp3');
$(function(){
	$("#showVocab").css("display","none");
	$("#countDown").css("display","none");
	$("#startTest").css("display","none");
	loadFileVocab();
	
});

function loadFileVocab(){
	$.ajax({
		url: "loadFile.php",
	}).done(function(data) { 
		$("#selectMode").append(data);
		borderColorAnimate()
		selcteMode();
	});
}

function selcteMode(){
	$(".mode").click(function(){
		$.ajax({
		  	method: "post",
			url: "Controller.php",
		  	data: {src:$(this).attr("fullname")}
		}).done(function(data) {
			$("#showListVocab").html(data);
			$("#selectMode").fadeOut( "slow" );
			var showvocablist = function(){ $("#showVocab").fadeIn(2000);};
			$(".border").animate({left:"25%",width:'50%',borderRadius:"15%",backgroundColor:"white"},1500,showvocablist);
		});
	});
}

function start(){
	$("#showVocab").fadeOut("slow");
	$(".border").animate({borderRadius:"60%",width:"17%",height:"275px",backgroundColor:getRandomColor()},3000,startExamBorder);
	bodyColorAnimate();
	
}


function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function bodyColorAnimate(){
//	var gg = function(){ $("body").animate({backgroundColor:getRandomColor()},n,gg);};
	$("body").animate({backgroundColor:getRandomColor()},200,bodyColorAnimate);
}

function borderColorAnimate(){
//	var gg = function(){ $("body").animate({backgroundColor:getRandomColor()},n,gg);};
	$(".border").animate({borderColor:getRandomColor()},200,borderColorAnimate);
}

function startExam(){
	result={score:0,checkTF:[]}
	$("#startTest").fadeIn(1000);
	animateSizeVocab();
	$("#vocab").text(jsonData[num].vocab);
	$("#a").text(jsonData[num].choice.a);
	$("#b").text(jsonData[num].choice.b);
	$("#c").text(jsonData[num].choice.c);
	$("#d").text(jsonData[num].choice.d);
	checkChoiceClick();
}
function animateSizeVocab(){
	$("#vocab").stop()
	if($("#vocab").css("font-size")=="50px"){
		$("#vocab").animate({fontSize:"20px"},1500,animateSizeVocab)
	}else{
		$("#vocab").animate({fontSize:"50px"},1500,animateSizeVocab)
	}
}
var startExamBorder = function(){ $(".border").animate({left:"25%",width:'50%',height:"500px",borderRadius:"15%",backgroundColor:"#fffff"},1500,startExam);};
function countDown(){
	if(n>0){
		$("#countDown").text(n);
		var fadeOut = function(){
			n--;
			$("#countDown").fadeOut(500,countDown)
		};
		$("#countDown").fadeIn(500,fadeOut)
	}else{
		
		$("body").stop();
		$("body").animate({backgroundColor:"#00000"},1000,startExamBorder);
	}
}

function checkChoiceClick(){
	$(".choice").click(function(){
		if(ready){
			ready = false;
			if($(this).text() == jsonData[num].tran ){
				correct();
			}else{
				wrong();
			}
		}
	});
}

function correct(){
	$("#vocab").text("");
	aFadeOut = function(){$("#showAns").fadeOut(1500,next);};
	$("#showAns").fadeIn(1500,aFadeOut);
	result.score++;
	result.checkTF.push(true);
}


function wrong(){
	returnD = function(){ 
		$("body").removeClass("wrongDisplay");
		$("body").css("background-size","100%")
		$(".border").show(0,next);
		$("#firework").show();
	};
	$(".border").hide();
	$("#firework").hide();
	music3.play()
	$("body").addClass("wrongDisplay");
	$("body").animate({backgroundSize:"120%"},2000,returnD);
	result.checkTF.push(false);
}

function next(){
	num++;
	if(num ==jsonData.length){
		$(".choice").fadeOut(1000)
		setTimeout(concludeResult, 1000);
	}else{
		cFadeIn = function(){
			$("#vocab").text(jsonData[num].vocab);
			$("#a").text(jsonData[num].choice.a);
			$("#b").text(jsonData[num].choice.b);
			$("#c").text(jsonData[num].choice.c);
			$("#d").text(jsonData[num].choice.d);
			rTrue = function(){ready = true;} 
			$(".choice").fadeIn(1000,rTrue);
		};
	$(".choice").fadeOut(1000,cFadeIn)
	}
	
}

function concludeResult(){
	var colorScore = ["#FF1919","#FF1919","#FF0066","#FF3300","#CC66FF","#9999FF","#0066FF","#00FFFF","#00FF99","#66FF99","#00FF00"];
	var marigScore = "+="+(result.score*(-53.8));
	for(x=0;x<jsonData.length;x++){
		if(result.checkTF[x])
			$("#showResult").append("<div class='listVT' style='color:#00E600;display:none;'>"+jsonData[x].vocab+" :: "+jsonData[x].tran+"</div></br>");
		else
			$("#showResult").append("<div class='listVT' style='color:red;display:none;'>"+jsonData[x].vocab+" :: "+jsonData[x].tran+"</div></br>");
	}
	
	$(".border").children().fadeOut();
	showConclue2 = function(){
		showFinalScore = function(){
			again = function(){
				$("#btnAgain").fadeIn(500);
			}
			$("#finalScore").fadeIn(500,again);
			$("#finalScore").css("color",colorScore[result.score]);
			$("#finalScore").text("Score "+result.score+"/"+result.checkTF.length);
		};
		$(".b2").animate({marginTop:marigScore,backgroundColor:colorScore[result.score]},5000,showFinalScore);
		showFadeResult()
	}
	showConclude = function(){
		$("#conclude").fadeIn(1000,showConclue2);
	};
	
	$(".border").animate({left:"25%",width:'50%',height:700,borderRadius:"10%"},1500,showConclude);
	
}

fr = 0;
function showFadeResult(){
	if($(".listVT")[fr]){
		$($(".listVT")[fr]).fadeIn(500,showFadeResult);
		fr++;
	}
}

function refresh(){
	location.reload();
}
