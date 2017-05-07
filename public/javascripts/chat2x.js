/**
 * Created by hevlhayt@foxmail.com
 * Date: 2016/8/25
 * Time: 17:29
 */


$('body').bind("touchstart", function() {});

// Todo: linking server timeout
var urlRegex = /[A-Za-z0-9]*?\.?.+\.(com|net|cn|org|me)/;
var wordRegex = /(shit|fuck|bitch|傻逼|你妈|妈逼|操你|啪|[0-9]{10,})/;
var atRegex = /@([a-z0-9]*?)\s/g;

/**
 * socket.io events
 */

var socket;
if (admin !== undefined && admin) {
    var pass = prompt("Pass");
    socket = io(window.location.origin, { query: "pass="+pass });
}
else {
    socket = io();
}

// bubble color info from server
// cooling status
var colorIndex = [],
    cooling = false,
    remarking = [true, 0],
    active = 0;

coolingRemark();


socket.on('name', function(name) {
    iShow('连接到角色：'+name, 5000)
});

//
socket.on('active', function(num) {
    active = num - 1;
});

// socket events
socket.on('chat', function(msg) {

    if (msg.t.indexOf('sys') == -1)
        chat.items.unshift({
                cid: msg.cid,
                name: msg.name,
                msg: msg.msg,
                background: 'linear-gradient(to bottom, '+colorIndex[msg.cid][1]+' 50%, '+colorIndex[msg.cid][0]+' 50%)',
                avatar: "transparent url('../images/avatars/"+msg.cid+".png') no-repeat center top",
                color: colorIndex[msg.cid][2],
                t: ''});
    else
        chat.items.unshift(msg);
});

//
socket.on('info', function(infos) {

    $.each(infos, function(i, info) {
        if (!(info in colorIndex)) {
            var color = info.color,
                color1 = 'rgb(' + color.toString() + ')',
                color2 = 'rgb(' + colorLighter(color, 30).toString() + ')';

            colorIndex[info.cid] = [color1, color2];

            var luma = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
            //console.log(luma);
            if (luma > 200)
                colorIndex[info.cid].push('#2f2f2f');
            else
                colorIndex[info.cid].push('#fff');

        }
    });
});

socket.on('at', function(at) {
    iShow(at+'@了你', 6000);
});

//
socket.on('offline', function(off) {
    if (off.indexOf(socket.id) != -1) {
        socket.disconnect();
    }
});

//socket.on("disconnect", function(){
//    console.log("Client disconnected from server");
//    socket.disconnect();
//});


/**
 * vue models
 */

var message = new Vue({
    el: '.box-message-inner',
    data: {
        message: '',
        status: false,
    },
    methods: {
        changestatus: function() {
            this.status = !this.status;
        },
        send: function() {

            if (cooling) return;

            var $textarea = $('textarea');
            //$textarea.focus();

            var m = this.message.trim().slice(0, 140);

            if (blankMsgCheck(m) != 0) return;
            /*
            if (urlRegex.test(m.toLowerCase()) || wordRegex.test(m.toLowerCase())) {
                this.message = '';
                alert('alert');
                return;
            }*/
            
            // fix trim()
            emitAtMessage(m+' ');

            emitMessage(m, this.status);
            console.log(this.status);

            if (!admin) {
                this.message = 'loading...';
                $textarea.attr('disabled', true);
                cooling = true;
                setTimeout(function() {
                    message.message = '';
                    $textarea.attr('disabled', false);
                    cooling = false;
                }, 1000);
            }
            else {
                this.message = '';
            }

            // when there is no cooling
            //this.message = ''


        },

        at: function() {
            // null -> true -> false
            chat.atActive = !!this.message.match(/@$/);
        }
    }
});

var chat = new Vue({
    el: '.box-talks',
    data: {
        items: [],
        atActive: false
    },
    methods: {
        at: function(cid) {
            if (this.atActive == false) return;
            message.message += cid+' ';
            this.atActive = false;
            scrollTop();
            $("textarea").focus();
        }
    }
});

/**
 * popin
 */

$('#back-to-top').avgrund({
    width: 320,
    height: 315,
    holderClass: 'popin',
    showClose: true,
    showCloseText: '×',
    onBlurContainer: '.container',
    onLoad: function (elem) {
        scrollTop();
        elem.fadeOut();
    },
    onLoaded: function () {
        $('#active').text(activeStr());
    },
    onUnload: function (elem) {
        elem.fadeIn();
    },
    template: '<h3><strong>ChatRoom</strong>: 聊天室</h3>'
 
});

function activeStr() {
    return '';
}


/**
 * dom collector
 */

setInterval(function() {
    if (chat.items.length > 100) {
        scrollTop();
        chat.items = chat.items.slice(0, 25);
    }
}, 60 * 1000);


/**
 * util functions
 */

function colorLighter(rgb, percent) {
    return [parseInt(rgb[0] + (256 - rgb[0]) * percent / 100),
        parseInt(rgb[1] + (256 - rgb[1]) * percent / 100),
        parseInt(rgb[2] + (256 - rgb[2]) * percent / 100)]
}

function blankMsgCheck(msg) {
    if (msg.length == 0) {
        if (remarking[0]) {
            alert('say something...');
            return 1;
        }
        else if (remarking[1] > 0){
            alert('say someting...');
            return 1;
        }
        else {
            remarking[0] = true;
            remarking[1] += 2;
            coolingRemark();
            return 0;
        }
    }

    return 0;
}

function emitAtMessage(msg) {
    var ats = msg.match(atRegex);
    if (ats) {
        socket.emit('at', $.map(ats, function(at) {
            return at.trim().slice(1);
        }));
    }
}

function emitMessage(m, force) {
    socket.emit('chat', { m: m, force: force});
    if (remarking[1] > 0 && m.length != 0) remarking[1] -= 1;
    scrollTop();
}

function iShow(msg, sec) {
    var $btp = $('#back-to-top');
    $btp.width('auto');
    $btp.html('<span>'+msg+'</span>');

    setTimeout(function() {
        $btp.find('span').fadeOut();
        $btp.animate({'width': 30}, 1000, function() {
            $(this).html('<i class="fa fa-info"></i>');
        });
    }, sec);
}

function coolingRemark() {
    setTimeout(function() {
        remarking[0] = false;
    }, 30 * 1000);
}

function coolingTime() {
    if (active <= 20) return 5;
    //else if (active >= 30) return 10;
    else {
        return (active - 20) * 0.5 + 5;
    }
}

function scrollTop() {
    $('body').animate({ scrollTop: 0 }, 200);
}


