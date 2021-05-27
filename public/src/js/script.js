const player = {
	songList: {},
	songPlaying: { id: 0 },
	wavesurfer: undefined,
	wavesurferConfig: {
		container: '#waveform',
		waveColor: '#cccccc',
		progressColor: '#f82979',
		height: 45,
		responsive: true,
		barWidth: 5,
		barRadius: 4,
		hideScrollbar: true,
	},
	isLoadingSong: false,
	playerComponent: {},
	init: () => {
		player.playerComponent = {
			container: document.getElementById('player'),
			songName: document.getElementById('player-song-name'),
			nameArtistGender: document.getElementById('player-song-artist-gender'),
			time: document.getElementById('player-song-time'),
			timeElapsed: document.getElementById('player-song-time-elapsed'),
			playPause: document.getElementById('btn-player-play-pause'),
			volumenControl: document.getElementById('player-song-volumen-control'),
		};

		player.wavesurfer = WaveSurfer.create(player.wavesurferConfig);

		player.wavesurfer.on('play', player.events.play);

		player.wavesurfer.on('pause', player.events.pause);

		player.wavesurfer.on(
			'ready',
			player.wavesurfer.play.bind(player.wavesurfer),
		);
		player.wavesurfer.on('ready', player.events.ready);

		player.wavesurfer.on('audioprocess', player.events.audioProcess);

		player.playerComponent.playPause.addEventListener(
			'click',
			player.playPauseSong,
		);

		player.playerComponent.volumenControl.addEventListener(
			'change',
			player.events.volumen,
		);

		player.loadSongList(songList => {
			let componetSongList = document.getElementById('song-list');

			componetSongList.innerHTML = '';

			player.songList = songList;

			let i = 0;
			for (let key in player.songList) {
				setTimeout(() => {
					componetSongList.append(player.songComponent(player.songList[key]));
				}, i * 60);
				i++;
			}
		});
	},
	playPauseSong: () => {
		if (!player.isLoadingSong) {
			player.wavesurfer.playPause();
		}
	},
	resetSongComponent: () => {
		document.querySelectorAll('[data-id-cancion]').forEach(element => {
			element.classList.remove('play');
		});
	},

	events: {
		play: () => {
			let componetSong = document.querySelectorAll(
				`[data-id-cancion="${player.songPlaying.id}"]`,
			)[0];
			componetSong.classList.add('play');
			player.playerComponent.container.classList.add('play');
		},
		pause: () => {
			let componetSong = document.querySelectorAll(
				`[data-id-cancion="${player.songPlaying.id}"]`,
			)[0];
			componetSong.classList.remove('play');
			player.playerComponent.container.classList.remove('play');
		},
		ready: () => {
			player.isLoadingSong = false;
			player.playerComponent.container.classList.remove('loading');
		},
		audioProcess: () => {
			if (player.wavesurfer.isPlaying()) {
				let currentTime = player.wavesurfer.getCurrentTime();
				let min = Math.floor(currentTime / 60).toString();
				let sec = Math.floor(currentTime - min * 60).toString();
				sec = sec.length == 1 ? '0' + sec : sec;
				let time = `${min}:${sec}`;

				if (player.playerComponent.timeElapsed.innerHTML !== time) {
					player.playerComponent.timeElapsed.innerHTML = time;
				}
			}
		},
		volumen: event => {
			player.wavesurfer.setVolume(event.target.value / 100);
		},
	},

	addSongToPlayer: id => {
		let song = player.songList[id];

		player.isLoadingSong = true;
		player.playerComponent.container.classList.add('loading');
		player.playerComponent.container.classList.add('open');
		player.playerComponent.songName.innerHTML = song.nombre;
		player.playerComponent.nameArtistGender.innerHTML =
			song.artista.nombre + ' - ' + song.genero.nombre;
		player.playerComponent.time.innerHTML = '/' + song.tiempo;
		player.playerComponent.timeElapsed.innerHTML = '00:00';
		player.wavesurfer.load(song.url);
		player.songPlaying = song;
	},
	loadSongList: async eventResponse => {
		fetch('/getcanciones')
			.then(response => response.json())
			.then(response => eventResponse(response));
	},
	songComponent: songData => {
		let componet = document.createElement('DIV');
		componet.classList.add('card');
		componet.classList.add('card-song');
		componet.setAttribute('data-id-cancion', songData.id);

		componet.addEventListener('click', () => {
			player.resetSongComponent();
			if (player.songPlaying.id !== songData.id) {
				player.addSongToPlayer(songData.id);
			} else {
				player.playPauseSong();
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
	},
};
window.addEventListener('load', () => {
	player.init();
});
