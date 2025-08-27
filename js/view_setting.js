// 배경색 설정
$('input[name="bg-input"]').change(function() {
    if (this.id === 'white-input') {// 라이트 모드
        document.documentElement.style.setProperty('--white', '#fff');
        document.documentElement.style.setProperty('--black', '#000');
        document.documentElement.style.setProperty('--text-gray', '#9ca3af');
        $('.btn_border').removeClass('dark');

    } else if (this.id === 'black-input') {// 다크 모드
        document.documentElement.style.setProperty('--white', '#000');
        document.documentElement.style.setProperty('--black', '#fff');
        document.documentElement.style.setProperty('--text-gray', '#fff');
        $('.btn_border').addClass('dark');

    }
});

// 상하단바 숨기기
$('.switch-input').click(function() {
    let isChecked = $(this).is(':checked');

    if (isChecked) {
        if ($('header').length) $('header .content').slideUp(300);// header가 있으면
        if ($('footer').length) $('footer .content').slideUp(300);// footer가 있으면
    } else {
        if ($('header').length) $('header .content').slideDown(300);
        if ($('footer').length) $('footer .content').slideDown(300);
    }
});