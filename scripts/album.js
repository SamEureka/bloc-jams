
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
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            updatePlayerBarSong();
            
            // if the current playing song is clicked, pause the song
        } else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.left-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
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

    // Set a new current song to currentSongFromAlbum.
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    
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
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

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

var getLastSongNumber = function(index) {
    return index == 0 ? currentAlbum.songs.length : index;
};


// It was easier just to write this function now.
var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]')
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



/* Confused..... start over
// Implement the nextSong() Function
var nextSong = function(){

// missed this in my code. takes the number passed and if it's 0 returns 
// the number of songs in the curent album, if not it returns the number passed in
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };


    // matt helping now
    // var previousSongNumber = $('.album-song-button').parent().data('song-number');
    // var nextSongNumber = null;

    // if (currentSongNumber) {
    //     nextSongNumber = currentSongNumber++;
    // } else {

    // }

// Use the trackIndex() helper function to get the index of the current song
// and then increment the value of the index.
var currentSongIndex = trackIndex(currentAlbum, currentlyPlayingSongNumber);
currentSongIndex++;

// This includes the situation in which the next song is the first song,
// following the final song in the album (that is, it should "wrap" around).    
    if (currentSongIndex >= currentAlbum.songs.length){
        currentSongIndex = 0;
    }

// Set a new current song to currentSongFromAlbum.
currentlyPlayingSongNumber = currentSongIndex;
currentSongFromAlbum = currentlyPlayingSongNumber;

// update the player bar to show the new song. 
// call the function to do this
 updatePlayerBarSong();

// Update the HTML of the previous song's .song-item-number element with a number.
    // my code
 // var prevSongNumber = currentSongIndex-1;
 // var nextSongNumber = currentSongIndex++;      

// bloc code NOTE: they use a funtion not yet defined... getSongNumberCell wft??
var _lastSongNumber = $('.album-song-button').parent().data('song-number') || 1; // 1-5
var lastSongNumber = getLastSongNumber(_lastSongNumber);
var $nextSongNumberCell = $('.song-item-number:eq('+ lastSongNumber +')');
var $lastSongNumberCell = $('.song-item-number:eq('+ (lastSongNumber - 1) +')');

$nextSongNumberCell.html(pauseButtonTemplate);
$lastSongNumberCell.html(lastSongNumber);
// Update the HTML of the new song's .song-item-number element with a pause button.

    console.log('nextSong()', {
        nextSongNumberCell: $nextSongNumberCell,
        lastSongNumberCell: $lastSongNumberCell,
    });

};
*/