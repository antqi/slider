// var dom = require('./dom')
// var toggleClass = dom.toggleClass
// var getStyle = dom.getStyle
// var hasClass = dom.getStyle

/**
 * 
 * @param {Object} 
 * {
 *    container : contianerELe, 
 *    list : listEles, 
 *    dots : dotsEles 
 * } 
 */
function Slider(params) {
    var container = document.getElementsByClassName(params.list)[0]
    var list = container.children
    var dots = document.getElementsByClassName(params.dots)[0].children

    this.container = container
    this.list = list
    this.dots = dots

    this.timer
    this.animateTimer
    this.interval = 3000
    this.time = 400
    this.speed = 0
    this.animateInterval = 30
    this.currentIndex = 0
    this.dotActiveSign = 'active'

    this.loop = true
}

Slider.prototype.init = function() {
    this.setStyle()
    this.speed = this.width / (this.time / this.animateInterval)

    this.loopPlay()
}

Slider.prototype.loopPlay = function() {
    var self = this
    if (self.loop) {
        self.timer = setTimeout(function() {
            console.log(1)
                // self.once()
        }, self.interval);
    }
}

Slider.prototype.setStyle = function() {
    this.width = parseInt(getStyle(this.list[0], 'width').replace('px', ''))
    this.len = this.list.length
    this.container.style.width = this.width * (this.len + 1) + 'px'

    var copyLast = this.list[0].cloneNode(true)
    this.container.appendChild(copyLast)
}

Slider.prototype.once = function() {
    var self = this
    if (!self.width || !self.speed) { return }
    var endX = parseInt(getStyle(self.container, 'left').replace('px', '')) + -1 * self.width

    function move() {
        var currentLeft = parseInt(getStyle(self.container, 'left').replace('px', ''))

        if (currentLeft > endX) {
            var moveX = currentLeft + -1 * self.speed
            self.container.style.left = (moveX <= endX ? endX : moveX) + 'px'
            animateTimer = setTimeout(function() {
                move()
            }, self.animateInterval);
        } else {
            clearTimeout(self.animateTimer)
            self.animateTimer = null
                // debugger;

            self.container.style.left = endX + 'px'
            if (self.currentIndex + 1 >= self.len) {
                self.currentIndex = 0
                self.container.style.left = 0
            } else {
                self.currentIndex = self.currentIndex + 1
            }
            self.toggleDot()
            if (self.loop) {
                self.loopPlay()
            }
        }
    }
    move()
}

Slider.prototype.play = function(params) {
    var self = this

    for (var i = 0; i < this.len; i++) {
        self.dots[i].addEventListener('click', function() {
            var target = this

            if (self.animateTimer) {
                return
            }
            if (!hasClass(target, self.dotActiveSign)) {
                return
            }

            var targetIndex = parseInt(target.getAttribute('index'))
            var offset = self.width * (targetIndex - self.currentIndex)

            self.once()
            self.currentIndex = targetIndex
        })

    }
}

Slider.prototype.toggleDot = function() {
    var self = this
    for (var i = 0; i < this.len; i++) {
        var dot = self.dots[i];
        if (hasClass(dot, self.dotActiveSign)) {
            toggleClass(dot, self.dotActiveSign)
        }
    }
    toggleClass(self.dots[self.currentIndex], self.dotActiveSign)
}

function toggleClass(el, className) {
    if (hasClass(el, className)) {
        var reg = new RegExp(className, 'g')
        el.className = el.className.replace(reg, '')
    } else {
        var classes = el.className.split(' ')
        classes.push(className)
        el.className = classes.join(' ')
    }
}

function hasClass(el, className) {
    return el.className.indexOf(className) !== -1
}

function getStyle(el, styleName) {
    var styleObj, style

    if (el.currentStyle) {
        styleObj = el.currentStyle
        if (styleName.indexOf('-') > 0) {
            var temp = styleName.split('-')
            temp[1].charAt(0).toUpeercase() + substring(1)
            styleName = temp.join('')
        }
        style = styleObj.getAttribute(styleName)
    } else {
        styleObj = window.getComputedStyle(el, null)
        style = styleObj.getPropertyValue(styleName)
    }

    return style
}

// module.exports = Slider