//Navbar issue ->  
//1. web에서는 호버효과, tablet과 mobile에서만 toggle 탭 시 나타나야하는데, 3가지 다 탭했을 때 나타나도록 적용됨
//2. toggle 탭 시 열렸다가 닫혀야하는데, 닫히지 않음

$(function() {
  var $header = $("#main_header");
  var $toggle = $header.find(".toggle");
  var $gnb = $header.find(".gnb");
  var $gnbLinks = $gnb.find("> ul > li > a");
  var $subMenus = $gnb.find("> ul > li > .sub");
  var $subBg = $header.find(".sub_bg");

  // 초기화 함수
  function initMenu() {
    if ($(window).width() <= 1366) { // 태블릿
      $gnb.hide();          // gnb 전체 숨김
      $subBg.hide();        // 배경 숨김
      $header.removeClass("active");
    } else { // 데스크탑
      $gnb.show();
      $subBg.hide();
      $header.removeClass("active");
    }
  }

  initMenu();
  // toggle 버튼 클릭 (태블릿)
  $toggle.on("click", function() {
    if ($header.hasClass("active")) {
      // 닫기
      $header.removeClass("active");
      $gnb.stop(true,true).slideUp(200);
      $subBg.stop(true,true).fadeOut(200);
    } else {
      // 열기
      $header.addClass("active");
      $gnb.stop(true,true).slideDown(200).css("display","flex");
      $gnbLinks.stop(true,true).fadeIn(200);
      $subMenus.stop(true,true).slideDown(200);
      $subBg.stop(true,true).fadeIn(200);
    }
  });
  // 화면 리사이즈 시 초기화
  $(window).on("resize", function() {
    initMenu();
  });
  // 데스크탑 hover 효과
  $gnb.on("mouseenter", function() {
    if ($(window).width() > 1366) {
      $subMenus.stop().slideDown(350);
      $subBg.stop().slideDown(350);
    }
  });
  $gnb.on("mouseleave", function() {
    if ($(window).width() > 930) {
      $subMenus.stop().slideUp(350);
      $subBg.stop().slideUp(350);
    }
  });
});





$(document).ready(function () {
  // what's on 영역 _ pagination
  const posters = $("#posters a");             
  const infos = $(".info_wrap > div");         
  const pageNums = $(".pagination .num");      
  const prevBtn = $(".page > a:first-of-type"); 
  const nextBtn = $(".page > a:last-of-type");  
  let currentIndex = 0; // 현재 인덱스
  function showSlide(index) {
  /*
    posters.hide()  =  posters라는 요소 집합을 모두 숨김
    .eq(index)  =   숨겨진 요소 중 index번째 요소만 선택
    ).fadeIn(400)  = 선택된 요소만 400ms 동안 서서히 나타나게 함
  */
    posters.hide().eq(index).css('display','flex') ; //마진,패딩 등 고정된 채로 변경
    infos.hide().eq(index).css('display','flex') ;
    // active 상태 변경
    pageNums.removeClass("active").eq(index).addClass("active");
    // 버튼 비활성화 처리
    if (index === 0) {
      prevBtn.addClass("disabled");
    } else {
      prevBtn.removeClass("disabled");
    }
    if (index === posters.length - 1) {
      nextBtn.addClass("disabled");
    } else {
      nextBtn.removeClass("disabled");
    }
  }
  // 페이지 번호 클릭
  pageNums.click(function (event) {
    event.preventDefault();
    currentIndex = $(this).parent().index();
    showSlide(currentIndex);
  });
  // 이전 버튼
  prevBtn.click(function (event) {
    event.preventDefault();
    if (currentIndex > 0) {
      currentIndex--;
      showSlide(currentIndex);
    }
  });
  // 다음 버튼
  nextBtn.click(function (event) {
    event.preventDefault();
    if (currentIndex < posters.length - 1) {
      currentIndex++;
      showSlide(currentIndex);
    }
  });
  // 초기 표시
  showSlide(currentIndex);

});




  //main_visual
    const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");
    
    var swiper = new Swiper(".swiper1", {
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      /* progress 오류
      on: {
        autoplayTimeLeft(s, time, progress) {
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
      }
        */
    });
// DOM, CSS 적용 후 컨테이너 높이 재계산
swiper.update();



// notice >
var swiper = new Swiper("#swiper2", {
  slidesPerView: 3,
  spaceBetween: 50,
  loop: true,
  on: {
    slideChangeTransitionEnd: function () {
      // 모든 슬라이드에서 active 제거 후 현재 슬라이드에 추가
      document.querySelectorAll('#swiper2 .swiper-slide').forEach(slide => {
        slide.classList.remove('active');
      });
      this.slides[this.activeIndex].classList.add('active');
    }
  }
});




//event > track.bar
$(function(){
  
  const $bar = $('.bar');
  const $track = $('.track');
  const $events = $('.events');
  const $eventImg = $('.event_img');

  function updateDrag() {
    const barMax = $track.width() - $bar.width();
    const imgMax = Math.max(0, $events[0].scrollWidth - $eventImg.width());
    if (imgMax <= 0) {
      $track.hide();
      $events.css('transform', 'translateX(0)');
      return;
    } else {
      $track.show();
    }
    const ratio = $eventImg.width() / $events[0].scrollWidth;
    $bar.css('width', `${ratio * 100}%`);
    $bar.off('drag').on('drag', function(){
      const barCurrent = parseInt($bar.css('left')) || 0;
      const barRatio = barCurrent / barMax;
      const targetPosition = imgMax * barRatio * (-1);
      $events.css('transform', `translateX(${targetPosition}px)`);
    });
  }
  $bar.draggable({ axis: 'x', containment: 'parent' });
  updateDrag();
  $(window).on('resize', updateDrag);
});



/*
$(function(){
  function initDrag() {
    $('.bar').draggable({ axis: 'x', containment: 'parent' });

    const barMax = $('.track').width() - $('.bar').width();
    const imgMax = $('.events').width() - $('.event_img').width();

    $('.bar').on('drag', function(){
      const barCurrent = parseInt($('.bar').css('left')) || 0;
      const barRatio = barCurrent / barMax;
      const targetPosition = imgMax * barRatio * (-1);
      $('.events').css('left', targetPosition);
    });
  }
});
*/




//charlotte dinning > imgs (fadeIn/Out - loop)
$(function(){
  function slidePoster(){ // setInterval에 사용될 사용자정의함수 slidePoster생성
    const imgs = $('.imgs').find('img'); // slide_container에서 img요소들 찾아서 imgs정의
      imgs.eq(0).fadeOut(800, function(){  //imgs중에서 첫번째 요소를 fadeOut 시키고 난뒤 
      imgs.eq(0).appendTo( $('.imgs') ); //slide_container에 다시 추가삽입으로 제일 뒤에 배치
      });
      imgs.eq(1).fadeIn(800); // imgs중에서 두번째 요소를 fadeIn 0.5초만에 
    }
    let timer = setInterval( slidePoster, 3000 );//slidePoster함수를 3초마다 반복실행함을 timer에 정의
    $('.imgs').on('mouseenter', function(){ //slide_container영역에 마우스가 진입하면
      clearInterval(timer);    // interval반복실행 해제
    })
    $('.imgs').on('mouseleave', function(){
      timer=setInterval( slidePoster, 3000 );
    });


  //top btn
    const $popup = $('.popup');
    const $parkingInfo = $('.parking_info');
    const $topButton = $('.top');

    // 데스크탑 hover 제어는 CSS로 처리하므로 JS에서는 제외

    // 태블릿 / 모바일 (1366px 이하)
    function isMobileOrTablet() {
      return $(window).width() <= 1366;
    }

    // parking 클릭 시 popup 토글
    $parkingInfo.on('click', function(e) {
      if (isMobileOrTablet()) {
        e.preventDefault();
        const $targetPopup = $(this).next('.popup');

        // 이미 열려있으면 닫기, 아니면 열기
        if ($targetPopup.is(':visible')) {
          $targetPopup.fadeOut(200);
        } else {
          $popup.fadeOut(200); // 다른 팝업 닫기
          $targetPopup.fadeIn(200);
        }
      }
    });

  
  //searchbox
   const $searchBtn = $('#searchbtn');
  const $searchBox = $('#search_box');
  const $closeBtn = $('#closeBtn');

  // 검색 버튼 클릭 시 검색 박스 표시
  $searchBtn.on('click', function(e) {
    e.preventDefault();
    $searchBox.addClass('active');
  });

  // 닫기 버튼 클릭 시 검색 박스 숨김
  $closeBtn.on('click', function() {
    $searchBox.removeClass('active');
  });


});

