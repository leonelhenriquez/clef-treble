var SongList = {};
var songPlaying = { id: 0 };
var wavesurfer;

const addSongToPlayer = id => {
	let playerSongName = document.getElementById('player-song-name');
	let playerSongArtistGender = document.getElementById(
		'player-song-artist-gender',
	);
	let playerSongTime = document.getElementById('player-song-time');
	let song = SongList[id];

	player.classList.add('open');
	playerSongName.innerHTML = song.nombre;
	playerSongArtistGender.innerHTML =
		song.artista.nombre + ' - ' + song.genero.nombre;
	playerSongTime.innerHTML = '/' + song.tiempo;
	wavesurfer.load(song.url);
	songPlaying = song;
};

const playPauseSong = () => {
	wavesurfer.playPause();
};

const resetSongComponent = () => {
	document.querySelectorAll('[data-id-cancion]').forEach(element => {
		element.classList.remove('play');
	});
};

const songComponent = songData => {
	let componet = document.createElement('DIV');
	componet.classList.add('card');
	componet.classList.add('card-song');
	componet.setAttribute('data-id-cancion', songData.id);

	componet.addEventListener('click', () => {
		resetSongComponent();
		if (songPlaying.id !== songData.id) {
			addSongToPlayer(songData.id);
		} else {
			playPauseSong();
		}
	});

	let content = `
			<div class="card-song-icon">
				<span class="material-icons-round icon"></span>
			</div>
			<div class="card-body">
        <h5 class="card-title card-song-name">${songData.nombre}</h5>
				<div class="card-text card-song-artist-gender">${songData.artista.nombre} - ${songData.genero.nombre}</div>
			</div>
			<div class="card-song-time">
				<span class="material-icons-round icon">schedule</span>
				<span class="time">${songData.tiempo}</span>
			</div>`;

	componet.innerHTML = content;
	return componet;
};

const loadSongList = async eventResponse => {
	fetch('/getcanciones')
		.then(response => response.json())
		.then(response => eventResponse(response));
};

const waveSurferCreate = () => {
	wavesurfer = WaveSurfer.create({
		container: '#waveform',
		waveColor: '#cccccc',
		progressColor: '#f82979',
		height: 45,
		responsive: true,
	});

	wavesurfer.on('play', () => {
		let componetSong = document.querySelectorAll(
			`[data-id-cancion="${songPlaying.id}"]`,
		)[0];
		let player = document.getElementById('player');
		componetSong.classList.add('play');
		player.classList.add('play');
	});

	wavesurfer.on('pause', () => {
		let componetSong = document.querySelectorAll(
			`[data-id-cancion="${songPlaying.id}"]`,
		)[0];
		let player = document.getElementById('player');
		componetSong.classList.remove('play');
		player.classList.remove('play');
	});

	wavesurfer.on('loading', percent => {
		if (percent === 100) {
			console.log('cargada');
		}
	});
	// Autoplay song
	wavesurfer.on('ready', wavesurfer.play.bind(wavesurfer));

	timeElapsed = document.getElementById('player-song-time-elapsed');

	wavesurfer.on('audioprocess', () => {
		if (wavesurfer.isPlaying()) {
			let currentTime = wavesurfer.getCurrentTime();
			let min = Math.floor(currentTime / 60).toString();
			let sec = Math.floor(currentTime - min * 60).toString();
			sec = sec.length == 1 ? '0' + sec : sec;
			timeElapsed.innerHTML = min + ':' + sec;
		}
	});

	let player = document.getElementById('btn-player-play-pause');
	player.addEventListener('click', playPauseSong);
};

const main = () => {
	waveSurferCreate();
	loadSongList(songList => {
		let componetSongList = document.getElementById('song-list');
		componetSongList.innerHTML = '';

		SongList = songList;

		let i = 0;
		for (let key in SongList) {
			setTimeout(() => {
				componetSongList.append(songComponent(SongList[key]));
			}, i * 60);
			i++;
		}
	});
};

window.addEventListener('load', main);
