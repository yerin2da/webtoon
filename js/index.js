let swiper; // 전역에 선언
let isMuted = true;

//이전화, 다음화
$(".episode_btn").load("episode_btn.html");

//슬라이드
$("#slide").load("slide.html");

//뷰어설정
$("#view_setting").load("view_setting.html");

//뷰어설정
$('#view_setting').hide();
$('.setting_btn').click(function () {
    $('#view_setting').fadeIn(300);//0.3초
});
$(document).on('click', '#view_setting .view_setting_close_btn', function () {
    $('#view_setting').fadeOut(300);//0.3초
});

$("#slide").load("slide.html", function () {
    slide_reset('');//기본 슬라이드
    intro_animation();
    // 초기 슬라이드 소리 재생
    console.log(isMuted)
    if(!isMuted) sound[0].play();
});

$(document).on('click', '#sound_btn', function () {
    initSoundBtn();
    // 첫 슬라이드 사운드 자동 재생
    if (!isMuted && sound[0]) {
        sound[0].play();
    }
});

function initSoundBtn() {
    isMuted = !isMuted;
    if (isMuted) {
        sound.forEach(s => s.volume(0));
        $('#sound_btn i').attr('class', 'fa-solid fa-volume-xmark');
    } else {
        sound.forEach(s => s.volume(0.5));
        $('#sound_btn i').attr('class', 'fa-solid fa-volume-high');
    }
    console.log(isMuted)

}

function intro_animation() {
    const intro = $('.lottie_img_wrap');
    if (window.innerWidth > 1179) {
        $('.pc-lottie').show();
        $('.mob-lottie').hide();
    } else {
        $('.pc-lottie').hide();
        $('.mob-lottie').show();
    }
    // 3초 후 서서히 사라지기
    setTimeout(() => {
        intro.fadeOut(500); // 0.5초 동안 사라짐
    }, 3000); // 3초 후 실행
}

$('.go_first').click(function () {
    swiper.slideToLoop(0);//슬라이드 맨 처음으로 이동
});


// 슬라이드별 사운드 미리 정의
const sound = [
    new Howl({ src: ['./img/sound/cute-bgm.m4a'], volume: 0.5, loop:true }),//1

    new Howl({ src: ['./img/sound/bubble-pop.mp3'], volume: 0.5,}),//2

    new Howl({ src: ['./img/sound/funny-boing.mp3'], volume: 0.5,}),//3

    new Howl({ src: ['./img/sound/food-splat.mp3'], volume: 0.5,}),//4

    new Howl({ src: ['./img/sound/glass-breaking.mp3'], volume: 0.5,}),//5

    new Howl({ src: ['./img/sound/cute-twinkle.mp3'], volume: 0.5, }),//6

    new Howl({ src: ['./img/sound/cute-bgm.m4a'], volume: 0.5, loop:true }),//7
];



// Swiper 초기화 함수 (중복 제거)
function slide_reset(selectedEffect = '') {
    // 기존 swiper destroy
    if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        effect: selectedEffect,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination-bullets",
            clickable: true
        },
        scrollbar: {
            el: ".swiper-scrollbar"
        },
        mousewheel: { invert: false, sensitivity: 1 },
        keyboard: { enabled: true, onlyInViewport: true },
        creativeEffect: selectedEffect === 'creative' ? {
            prev: { shadow: false, translate: ["-100%", 0, -400], rotate: [0, -180, 0] },
            next: { shadow: false, rotate: [0, 0, 0] }
        } : {},
        on: {
            slideChange: function () {
                const index = this.realIndex;
                const progressBar = document.querySelector(".swiper-pagination-progress");
                if (progressBar) progressBar.style.width = ((index + 1) / this.slides.length * 100) + "%";

                sound.forEach(s => s.stop());
                // if (sound[index]) sound[index].play();
                // 뮤트 상태가 아니라면 해당 슬라이드 소리 재생
                if (!isMuted && sound[index]) {
                    sound[index].play();
                }
            }
        }
    });
}

// 넘김효과 선택
$(document).on('change', 'input[name="effect-input"]', function () {
    $('input[name="effect-input"]').prop('checked', false);
    $(this).prop('checked', true);
    let selectedEffect = '';
    let slideFile = 'slide.html';

    if (this.id === 'fade-input') {
        selectedEffect = 'fade';
    }
    else if (this.id === 'flip-input') {
        selectedEffect = 'creative';
    }

    $("#slide").load(slideFile, function () {
        $("#flip").hide();
        $("#slide").show();
        slide_reset(selectedEffect);
    });
});
