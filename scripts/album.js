
var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'

    +'<td class="song-item-title">' + songName + '</td>' + '<td class="song-item-duration">' + songLength + '</td>' + '</tr>';
    
    // makes a row variable for jQuery to use
    var $row = $(template);

    // $(this) = .song-item-number passed from -> $row.find('.song-item-number').click(clickHandler);
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        // if no song is playing, set the song clicked to playing
        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingElement = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingElement.html(currentlyPlayingSongNumber)
        }
        
        // if the song clicked is not the current playing song, make the song clicked the current song          
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            //currentlyPlayingSongNumber = songNumber;
            //currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            updatePlayerBarSong();
            
            // if the current playing song is clicked, pause the song
        } else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.left-controls .play-pause').html(playerBarPlayButton);
            setSong(null);
            //currentlyPlayingSongNumber = null;
            //currentSongFromAlbum = null;
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        // console.log(event);
        // console.log(songNumberCell);
       // var songNumberCell = getSongNumberCell();
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        
        var songNumberCell = $(this).find('.song-item-number');
        //var songNumberCell = getSongNumberCell(event);
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber)
        }
    };

    // sets the click handler to act on the whole row?? 
    $row.find('.song-item-number').click(clickHandler);

    // sets a function for hover and then a function to execute when hover is no longer true
    $row.hover(onHover, offHover);

    return $row;
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.lable);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }

};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + ' - ' + currentAlbum.artist);
    $('.left-controls .play-pause').html(playerBarPauseButton);
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {

    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    // Use the trackIndex() helper function to get the index of the 
    // current song and then increment the value of the index.
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    setSong(currentSongIndex +1);
    // Set a new current song to currentSongFromAlbum.
    //currentlyPlayingSongNumber = currentSongIndex + 1;
    //currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
    // Update the player bar to show the new song.
    updatePlayerBarSong();

    // Update the HTML of the previous song's .song-item-number element with a number.
    var prevSongNumber = getLastSongNumber(currentSongIndex);
    $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    $prevSongNumberCell = getSongNumberCell(prevSongNumber);

    $prevSongNumberCell.html(prevSongNumber);

    // Update the HTML of the new song's .song-item-number element with a pause button.
    $nextSongNumberCell.html(pauseButtonTemplate);

};

var previousSong = function() {
    var getLastSongNumber = function(index){
        if (index == (currentAlbum.songs.length - 1)){ 
            return 1;
            } else { 
                return index + 2;
        }
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0){
        currentSongIndex = currentAlbum.songs.length -1;
    }
    
    // Same as nextSong function cutNpaste
    // Set a new current song to currentSongFromAlbum.
    setSong(currentSongIndex + 1);
    //currentlyPlayingSongNumber = setSong(currentSongIndex + 1);
    //currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the player bar to show the new song.
    updatePlayerBarSong();

    // Update the HTML of the previous song's .song-item-number element with a number.
    var prevSongNumber = getLastSongNumber(currentSongIndex);
    $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    $prevSongNumberCell = getSongNumberCell(prevSongNumber);

    $prevSongNumberCell.html(prevSongNumber);

    // Update the HTML of the new song's .song-item-number element with a pause button.
    $nextSongNumberCell.html(pauseButtonTemplate);


};


// Set Song function
var setSong = function(songNumber) {
    if (songNumber === null){
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
    } else {
        currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber -1];
    }
};



// It was easier just to write this function now.
var getSongNumberCell = function(songNumber){
    return $('.song-item-number[data-song-number="' + songNumber + '"]')
};

// song list stuff
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


// global vars to hold song and album info
var currentlyPlayingSongNumber = null;
var currentAlbum = null;
var currentSongFromAlbum = null;

// player bar selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);

});

