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

var albumClash = {
    name: 'London Calling',
    artist: 'The Clash',
    lable: 'CBS',
    year: '1979',
    albumArtUrl: 'assets/images/album_covers/TheClashLondonCallingalbumcover.jpg',
    songs: [
        {
            name: 'London Calling',
            length: '3:19'
        },
        {
            name: 'Brand New Cadillac',
            length: '2:09'
        },
        {
            name: 'Jimmy Jazz',
            length: '3:52'
        },
        {
            name: 'Hateful',
            length: '2:45'
        },
        {
            name: 'Rudie Can\'t Fail',
            length: '3:26'
        },
        {
            name: 'Spanish Bombs',
            length: '3:19'
        },
        {
            name: 'The Right Profile',
            length: '3:56'
        },
        {
            name: 'Lost in the Supermarket',
            length: '3:47'
        },
        {
            name: 'Clampdown',
            length: '3:49'
        },
        {
            name: 'The Guns of Brixton',
            length: '3:07'
        },
    ]
};

var createSongRow = function (songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + '<td class="song-item-number">' + songNumber + '</td>' + '<td class="song-item-title">' + songName + '</td>' + '<td class="song-item-duration">' + songLength + '</td>' + '</tr>';
    return template;
};

var currentAlbum = '';

var setCurrentAlbum = function (album) {
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    currentAlbum = album.name;

    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.lable;
    albumImage.setAttribute('src', album.albumArtUrl);

    albumSongList.innerHTML = '';

    for (i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
};

var albumToggle = function () {
    if (currentAlbum == albumPicasso.name) {
        setCurrentAlbum(albumMarconi);
    } else if (currentAlbum == albumMarconi.name) {
        setCurrentAlbum(albumClash);
    } else {
        setCurrentAlbum(albumPicasso);
    }
};

window.onload = function () {
    setCurrentAlbum(albumPicasso);

document.getElementsByClassName('album-cover-art')[0].addEventListener('click', albumToggle);
};

//$(window).on('click', '.toggle', function () {});