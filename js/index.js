$(window).on('load', function(){
    $('html').animate({
        scrollLeft:0
    }, 100)
    $('.sprite').css({
        left: '0'
    });
})

let sectArray = []
function sectDist(){
    for (let i=0; i<$('.section').length; i++) {
        sectArray[i] = $('.section').eq(i).offset().left
    }
}
sectDist()
console.log(sectArray)

$(window).on('resize', function(){
    sectDist()
})

$(window).on('scroll', function(){
    let sct = $(this).scrollLeft()
    // console.log(sct)

    if ( sct>=sectArray[0] && sct<sectArray[1] && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('.skillContainer > div').removeClass('on')
        $('.autoClock').css({
            left:'300px',
            top:'100px'
        })
    } else if ( sct>=sectArray[1] && sct<sectArray[2] && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        if ( !$('.skillContainer > div').hasClass('on') ) {
            $('.skillContainer > div').addClass('on')
            count(70, '.html', 10)
            count(60, '.css', 20)
            count(80, '.script', 30)
            count(60, '.jquery', 40)
            count(50, '.react', 50)
        }
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
        $('.autoClock').css({
            left:'50%',
            top:'100px',
        })
    } else if ( sct>=sectArray[2] && sct<sectArray[3] && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('#sect4').removeClass('on')
        $('#sect3').addClass('on')
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'0.'+i+'s' })    
        }
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
        $('.autoClock').css({
            left:'90%',
            top:'90%'
        })
    } else if ( sct>=sectArray[3] && !cflag) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
        $('#sect4').addClass('on')
        $('.autoClock').css({
            left:'10%',
            top:'10%'
        })
    } 
})    


let scrollTimeout;
let spriteLeft = 0;
$('.section').on('wheel DOMMouseScroll', function(e) {
    $(".sprite").addClass('walking');
    let delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    let scrollAmount = delta > 0 ? -100 : 100; // 휠 이동에 따라 스크롤 양 설정
    
    // 스크롤 위치 업데이트
    let newScrollLeft = $(window).scrollLeft() + scrollAmount;
    $('html, body').scrollLeft(newScrollLeft);
    
    // 스프라이트의 현재 left 값
    let currentLeft = parseFloat($('.sprite').css('left'));

    // 애니메이션 처리
    if (delta > 0) { // 위로 휠을 굴릴 때
        if (currentLeft > 0) {
            $('.sprite').stop().animate({
                left: Math.max(currentLeft - 250, 0) // 최소 left 값은 0으로 제한
            }, 1000);
        }
    } else { // 아래로 휠을 굴릴 때
        let wrapWidth = $('#wrap').width();
        let spriteWidth = $('.sprite').width();
        if (currentLeft + spriteWidth < wrapWidth) {
            $('.sprite').stop().animate({
                left: Math.min(currentLeft + 250, wrapWidth - spriteWidth) // 최대 left 값은 화면 너비에서 스프라이트 너비를 뺀 값으로 제한
            }, 1000);
        }
    }
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function() {
        $(".sprite").removeClass('walking');
    }, 1000); 
});


let cflag = false;
$('#menu li a').on('click focus', function(e){
   e.preventDefault()
   cflag = true;
   let num = $(this).parent().index()
   // console.log(num)
   $(this).parent().addClass('on').siblings().removeClass('on')

   let sectionLeft = $('.section').eq(num).offset().left;
    $('.sprite').stop().animate({
        left: sectionLeft
    }, 1000);


   if (num<1) {
        $('.skillContainer > div').removeClass('on')
    } else {
        if ( !$('.skillContainer > div').hasClass('on')) {
            $('.skillContainer > div').addClass('on')
            count(70, '.html', 10)
            count(60, '.css', 20)
            count(80, '.script', 30)
            count(60, '.jquery', 40)
            count(50, '.react', 50)
        }
    }

    if (num<2) {
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({
            transitionDelay:'0s'
        })
    } else {
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'1.'+i+'s' })    
        }
        $('#sect3').addClass('on')
    }

   $('html, body').animate({
      scrollLeft: sectArray[num]
   }, 500, function(){ cflag = false })
})


function count(jumsu, cname, time) {
    let count = 0
    let stop = setInterval(function(){
        count++
        if (count<=jumsu) {
            $(cname).find('.myscore').text(count+'%')
        } else {
            clearInterval(stop)
        }
    }, time)
}

// 첫번째 섹션의 슬릭슬라이더
$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:3000,
    dots:true
})

$('.slideOuter .plpa').on('click', function(){
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }
})


$('#sect3 .category a').on('click', function(e){
    e.preventDefault()
    let filterValue = $(this).attr('href')
    $('#sect3 .grid').isotope({
        filter:filterValue,
        layoutMode:'masonry',   // fitRows, masonry
        itemSelector:'.item'
    })
})

$('#sect3 .grid li a').on('click', function(){
    var href = $(this).attr('href')
    var title = $(this).attr('title')
    var src = $(this).find('img').attr('src')
    var alt = $(this).find('img').attr('alt')

    $('body').append(`<div class="outLayer"><div class="inLayer"><h2>${title}</h2><div><img src="${src}" alt="${alt}"><a href="${href}" target="_blank">사이트이동</a></div></div><button type="button">닫기</button></div>`)
    $('.outLayer').css({
        position:'fixed',
        top:0, left:0, right:0, bottom:0,
        background:'rgba(0,0,0,0.5)',
        zIndex:9999999999,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    })
    $('.inLayer').css({
        maxWidth:'600px',
        fontSize:'30px',
        textAlign:'center',
        color:'#fff'
    })
    $('.inLayer a').css({
        border:'2px solid #f00',
        display:'block',
        padding:'10px 20px',
        background:'blue',
        width:'200px',
        fontSize:'20px',
        margin:'10px auto'
    })
    $('.outLayer button').css({
        position:'absolute',
        top:'10px', right:'10px',
        fontSize:'30px',
        color:'#fff'
    })
    return false
})

$(document).on('click', '.outLayer button, .outLayer', function(){
    $('.outLayer').remove()
})

$(document).on('click', '.inLayer', function(e){
    e.stopPropagation()
})


