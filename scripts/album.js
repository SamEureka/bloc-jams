
var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">' + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'

    +'<td class="song-item-title">' + songName + '</td>' + '<td class="song-item-duration">' + filterTimeCode(songLength) + '</td>' + '</tr>';
    
    // makes a row variable for jQuery to use
    var $row = $(template);

    // $(this) = .song-item-number passed from -> $row.find('.song-item-number').click(clickHandler);
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        // if no song is playing, set the song clicked to playing
        if (currentlyPlayingSongNumber !== null) {
            currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        
        // if the song clicked is not the current playing song, make the song clicked the current song          
        if (currentlyPlayingSongNumber !== songNumber) {
            currentlyPlayingCell = $(this).html(pauseButtonTemplate); 
            setSong(songNumber);
            currentSoundFile.play();
            updatePlayerBarSong();
            updateSeekBarWhileSongPlays();
            
            var $volumeBar = $('.volume .fill');
            var $volumeThumb = $('.volume .thumb');
            $volumeBar.width = (currentVolume + '%');
            $volumeThumb.css({
                left: currentVolume + '%'
            });
            
            // if the current playing song is clicked, pause the song
        } else if (currentlyPlayingSongNumber === songNumber) {
            //$(this).html(playButtonTemplate);
            //currentSoundFile.pause();
            //$('.left-controls .play-pause').html(playerBarPlayButton);
            if (currentSoundFile.isPaused()) {
                currentSoundFile.play();
                updateSeekBarWhileSongPlays();
                $('.left-controls .play-pause').html(playerBarPauseButton);
                $(this).html(pauseButtonTemplate);
            } else {
                currentlyPlayingCell = $(this).html(playButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();
            }
            //setSong(null);
            
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

// var updatePlayerBarSong = function() {
//     $('.currently-playing .song-name').text(currentSongFromAlbum.name);
//     $('.currently-playing .artist-name').text(currentAlbum.artist);
//     $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + ' - ' + currentAlbum.artist);
//     $('.left-controls .play-pause').html(playerBarPauseButton);
//     setTotalTimeInPlayerBar(currentSoundFile.getDuration());
// };

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function() {

    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    // Use the trackIndex() helper function to get the index of the 
    // current song and then increment the value of the index.
    currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Call the setSong function
    setSong(currentSongIndex +1);
    
    // play the song file
    currentSoundFile.play();

    // Update the player bar to show the new song.
    updatePlayerBarSong();

    // Update the seek bar
    updateSeekBarWhileSongPlays();

    // Update the HTML of the previous song's .song-item-number element with a number.
    prevSongNumber = getLastSongNumber(currentSongIndex);
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

    currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0){
        currentSongIndex = currentAlbum.songs.length -1;
    }
    
    // call the setSong function
    setSong(currentSongIndex + 1);

    // play the song file
    currentSoundFile.play();

    // Update the player bar to show the new song.
    updatePlayerBarSong();

    // Update the seek bar
    updateSeekBarWhileSongPlays();

    // Update the HTML of the previous song's .song-item-number element with a number.
    prevSongNumber = getLastSongNumber(currentSongIndex);
    $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    $prevSongNumberCell = getSongNumberCell(prevSongNumber);

    $prevSongNumberCell.html(prevSongNumber);

    // Update the HTML of the new song's .song-item-number element with a pause button
    $nextSongNumberCell.html(pauseButtonTemplate);


};


// Set Song function
var setSong = function(songNumber) {
    if (currentSoundFile){
        currentSoundFile.stop();
    }
        currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber -1];
        currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
            formats: ['mp3'],
            preload: true
        })
        duration = currentSoundFile.getDuration();
        setVolume(currentVolume);
    };

var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var togglePlayFromPlayerBar = function() {
    (currentSoundFile.isPaused() === true) ? togglePlay() : togglePause();

    function togglePause() {
        currentSoundFile.pause();
        currentlyPlayingCell.html(playButtonTemplate);
        $playerBarToggleButton.html(playerBarPlayButton);
    };
    function togglePlay() {
        currentlyPlayingCell.html(pauseButtonTemplate);
        $playerBarToggleButton.html(playerBarPauseButton);
        currentSoundFile.play();
    };
};


// It was easier just to write this function now.
var getSongNumberCell = function(songNumber){
    return $('.song-item-number[data-song-number="' + songNumber + '"]')
};

var updateSeekBarWhileSongPlays = function(){

    if (currentSoundFile) {
        currentSoundFile.bind('timeupdate', function(event) {
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');

            updateSeekPercentage($seekBar, seekBarFillRatio);
            setCurrentTimeInPlayerBar(currentSoundFile.getTime());
            duration = currentSoundFile.getDuration();
        });
    }
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + ' - ' + currentAlbum.artist);
    $('.left-controls .play-pause').html(playerBarPauseButton);
    setTotalTimeInPlayerBar(currentSongFromAlbum.length);
};

// Seek bar code
var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
 
    var offsetXPercent = seekBarFillRatio * 100;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 
}

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');
    $seekBars.click(function(event){
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;
        // console.log('bar' + $(this).parent().hasClass('seek-control'));

    if ($(this).parent().hasClass('seek-control')){
        console.log('bar - change play head');
        seek(seekBarFillRatio * currentSoundFile.getDuration());
    } else {
        setVolume(seekBarFillRatio * 100);
        console.log('bar - change volume')
    }

        updateSeekPercentage($(this), seekBarFillRatio);
    });
    
    $seekBars.find('.thumb').mousedown(function(event){
        var $seekBar = $(this).parent();
        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX /barWidth;
            // console.log('thumb' + $seekBar.parent().hasClass('seek-control'));

        if ($seekBar.parent().hasClass('seek-control')){
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);
        }

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
        
        $(document).bind('mouseup.thumb', function(){
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};

// sets the time bar running time in the player bar
var setCurrentTimeInPlayerBar = function(currentTime) {
    $('.current-time').text(filterTimeCode(currentTime)); 
};

// sets the total play time in the player bar
var setTotalTimeInPlayerBar = function(totalTime) {
    $('.total-time').text(filterTimeCode(totalTime));
};

// converts time variables to number with 2 decimal places, formatted X:XX
var filterTimeCode = function(timeInSeconds) {
    var secNum = parseInt(timeInSeconds, 10);
    var runningTimeHours = Math.floor(secNum /3600);
    var runningTimeMinutes = Math.floor((secNum - (runningTimeHours * 3600)) / 60);
    var runningTimeSeconds = secNum - (runningTimeHours * 3600) - (runningTimeMinutes * 60);
    if (runningTimeSeconds < 10) {runningTimeSeconds = "0"+runningTimeSeconds;}
    filteredTime = runningTimeMinutes+':'+runningTimeSeconds;
    return filteredTime;
};

// song list stuff
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var $playerBarToggleButton = $('.left-controls .play-pause');


// global vars to hold song and album info
var currentlyPlayingSongNumber = null;
var currentAlbum = null;
//var currentSongFromAlbum = null;
//var currentSongIndex = null;
var currentSoundFile = null;
var currentVolume = 80;
var prevSongNumber = null;
//var currentlyPlayingCell = null;

// player bar selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playerBarToggleButton.click(togglePlayFromPlayerBar);
});

