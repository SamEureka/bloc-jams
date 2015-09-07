var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    lable: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        {
            name: 'Blue',
            length: '4:26'
        },
        {
            name: 'Green',
            length: '3:14'
        },
        {
            name: 'Red',
            length: '5:01'
        },
        {
            name: 'Pink',
            length: '3:21'
        },
        {
            name: 'Magenta',
            length: '2:15'
        }
    ]
};

var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    lable: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        {
            name: 'Hello, Operator?',
            length: '1:01'
        },
        {
            name: 'Ring, ring, ring',
            length: '5:01'
        },
        {
            name: 'Fits in your pocket',
            length: '3:21'
        },
        {
            name: 'Can you hear me now?',
            length: '3.14'
        },
        {
            name: 'Wrong phone number',
            length: '2:15'
        }
    ]
};

var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' 
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'

    + '<td class="song-item-title">' + songName + '</td>' + '<td class="song-item-duration">' + songLength + '</td>' + '</tr>';
    return template;
};

var setCurrentAlbum = function (album) {
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.lable;
    albumImage.setAttribute('src', album.albumArtUrl);

    albumSongList.innerHTML = '';

    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
};

//my solution to find parent function based on http://goo.gl/NrUzSs 
/*
var findParentByClassName = function(element, searchClass){
    console.log('findParentByClassName', element);
    while((element = element.parentElement) && element.classList.contains(searchClass)){return element;}
};*/
 
// bloc's solution for find parent
var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    while (currentParent.className != targetClass) {
        currentParent = currentParent.parentElement
    }
    return currentParent;
};

// bloc solution for get song item
var getSongItem = function(element){
switch (element.className){
case 'album-song-button':
case 'ion-play':
case 'ion-pause':
return findParentByClassName(element, 'song-item-number');
case 'album-view-song-item':
return element.querySelector('.song-item-number');
case 'song-item-title':
case 'song-item-duration':
return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
case 'song-item-number':
return element;
default:
return;
}
};

var clickHandler = function(targetElement) {
//stores the song item number element
var songItem = getSongItem(targetElement)

// if nothing is playing set the song item html to the pause template and change
// the currently playing song variable to what ever was clicked
if (currentlyPlayingSong === null){
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
// if something is playing, change the song item html to the play template and change
// the song to null 
} else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')){
 songItem.innerHTML = playButtonTemplate;
 currentlyPlayingSong = null;   
// if what you clicked isn't the current song, set the new song to the pause
} else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
} 

};



// song list stuff
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// button template
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// store state of playing song
var currentlyPlayingSong = null;


window.onload = function () {
        setCurrentAlbum(albumPicasso);
    
        // this wasnt working until we moved it down here
        // console.log(findParentByClassName(document.getElementsByClassName('song-item-duration')[0], 'album-view-song-item'));

        songListContainer.addEventListener('mouseover', function (event) {
            if (event.target.parentElement.className === 'album-view-song-item') {
                var songItem = getSongItem(event.target);
                if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                    songItem.innerHTML = playButtonTemplate;
                }
            }
        });
for (i = 0; i < songRows.length; i++) {
            songRows[i].addEventListener('mouseleave', function (event) {
                var leavingSongItem = getSongItem(event.target);
                var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');
                if (leavingSongItemNumber !== currentlyPlayingSong){
                    leavingSongItem.innerHTML = leavingSongItemNumber;
                }
            });

            songRows[i].addEventListener('click', function(event){
                clickHandler(event.target);

            });
};
        };
