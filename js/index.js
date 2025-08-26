let swiper; // 전역에 선언

//이전화, 다음화
$(".episode_btn").load("episode_btn.html");

//슬라이드
$("#slide").load("slide.html");

//뷰어설정
$("#view_setting").load("view_setting.html");

//뷰어설정
$('#view_setting').hide();
$('.setting_btn').click(function (){
    $('#view_setting').fadeIn(300);//0.3초
});
$(document).on('click', '#view_setting .view_setting_close_btn',function (){
    $('#view_setting').fadeOut(300);//0.3초
});

// Swiper 초기화
$("#slide").load("slide.html", function () {
    slide_reset('');//기본 슬라이드
    intro_animation();
});

function intro_animation(){
    const intro = $('.lottie_img_wrap');
    if (window.innerWidth > 1179) {
        // 로티이미지-스와이프
        $('.lottie_img_wrap >dotlottie-wc').attr('src', 'https://lottie.host/a5f1cad7-1a3e-4105-9168-dec688961643/qMuRvRIt5c.lottie');
    } else {
        //로티이미지-터치
        $('.lottie_img_wrap >dotlottie-wc').attr('src', 'https://lottie.host/932fdd66-b9b5-45d3-8a00-a14a758f7c69/r0XaoX28T8.lottie');

    }
    // 3초 후 서서히 사라지기
    setTimeout(() => {
        intro.fadeOut(500); // 0.5초 동안 사라짐
    }, 3000); // 3초 후 실행
}

$('.go_first').click(function (){
    swiper.slideToLoop(0);//슬라이드 맨 처음으로 이동
});
//넘김효과 선택
$(document).on('change', 'input[name="effect-input"]', function () {
    // 현재 선택된 것만 checked
    $('input[name="effect-input"]').prop('checked', false);
    $(this).prop('checked', true);

    let selectedEffect = '';//넘김 효과
    if (this.id === 'fade-input') {//페이드
        selectedEffect = 'fade';

        $("#slide").load("slide.html", function () {
            slide_reset(selectedEffect);
            $("#flip").hide();
            $("#slide").show();
            $('input[name="fade-input"]').prop('checked', true);
        });

    } else if (this.id === 'flip-input') {// 플립
        $("#flip").load("slide2.html", function() {
            $("#slide").hide();
            $("#flip").show();
            flip_slide();
        });

    } else {
        selectedEffect = ''; // 기본 슬라이드
        // Swiper 초기화
        $("#slide").load("slide.html", function () {
            slide_reset(selectedEffect);
            $("#flip").hide();
            $("#slide").show();
        });
    }
});

//슬라이드 초기설정
function slide_reset(selectedEffect){
    const progressCircle = document.querySelector(".autoplay-progress svg");
    const progressContent = document.querySelector(".autoplay-progress span");

    swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        effect: selectedEffect, // 선택된 효과 적용
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination-bullets",
            clickable: true
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        // 마우스휠
        mousewheel: {
            invert: false,    // false: 아래로 → 다음 슬라이드
            sensitivity: 1,   // 감도
        },
        // 키보드
        keyboard: {
            enabled: true,    // 키보드 이벤트 활성화
            onlyInViewport: true, // 화면 안에서만 작동
        },
        on: {
            slideChange: function () {
                let progress = ((this.realIndex + 1) / this.slides.length) * 100;
                document.querySelector(".swiper-pagination-progress").style.width = progress + "%";
            }
        }
    });
}

function flip_slide() {
    swiper = new Swiper(".mySwiper.perspective", {
        slidesPerView: 1,
        spaceBetween: 0,
        rtl: true,
        centeredSlides: false,
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination-bullets",
            clickable: true,
        },
        mousewheel: {
            invert: false,
            sensitivity: 1,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: false,
                translate: ["-100%", 0, -400],//x축, y축, z축
                rotate: [0, -180, 0],
            },
            next: {
                shadow: false,
                // translate: ["-100%", 0, -400],
                rotate: [0, 0, 0],
            },
        },
        on: {
            slideChange: function () {
                const progressBar = document.querySelector("#flip .swiper-pagination-progress");
                if (progressBar) {
                    progressBar.style.width = ((this.realIndex + 1) / this.slides.length * 100) + "%";
                }
            },
        }
    });
}