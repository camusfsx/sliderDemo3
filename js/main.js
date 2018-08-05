let $icons = $('.slideIcon>li')
let $slides = $('.slideWindow')
let $images = $slides.children('li')
let current = 0
$slides.css({ transform: 'translateX(-480px)' })

window.onload = () => {
    makeFakeSlides()
    bindEvents()
}
let timer = setInterval(function () {
    goToSlide(current + 1)
}, 2000)
$(`.slideIcon .iconT`).eq(0).show()
$('.slideWrapper').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(function () {
        goToSlide(current + 1)
    }, 2000)
})

function bindEvents() {
    $('.slideIcon').on('click', 'li', function (e) {
        let $li = $(e.currentTarget)
        let index = $li.index()
        goToSlide(index)
    })
}

function goToSlide(index) {
    if (index > $icons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $icons.length - 1
    }
    $(`.slideIcon .iconT`).hide().eq(index).show()
    if (current === $icons.length - 1 && index === 0) {
        $slides.css({ transform: `translateX(${-($icons.length + 1) * 480}px)` })
            .one('transitionend', function () {
                $slides.hide()
                $slides.offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 480}px)` }).show()
            })
    } else if (current === 0 && index === $icons.length - 1) {
        $slides.css({ transform: `translateX(0px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 480}px)` }).show()
            })
    } else {
        $slides.css({ transform: `translateX(${- (index + 1) * 480}px)` })
    }
    current = index
}

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
