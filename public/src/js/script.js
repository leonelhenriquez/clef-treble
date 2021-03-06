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
		cursorWidth: 3,
		cursorColor: '#f82979',
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
			close: document.getElementById('player-song-close'),
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

		player.playerComponent.close.addEventListener('click', player.closePlayer);
	},
	closePlayer: () => {
		player.playerComponent.container.classList.remove('open');
		player.wavesurfer.pause();
		player.songPlaying = { id: 0 };
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
	renderSongList: () => {
		let componentSongList = document.getElementById('song-list');
		componentSongList.innerHTML = '';
		componentSongList.style.minHeight = `${
			100 * Object.keys(player.songList).length
		}px`;

		let i = 0;
		for (let key in player.songList) {
			setTimeout(() => {
				componentSongList.append(player.songComponent(player.songList[key]));
			}, i * 60);
			i++;
		}
	},
	events: {
		play: () => {
			let componentSong = document.querySelectorAll(
				`[data-id-cancion="${player.songPlaying.id}"]`,
			)[0];
			if (componentSong !== undefined) {
				componentSong.classList.add('play');
			}
			player.playerComponent.container.classList.add('play');
		},
		pause: () => {
			let componentSong = document.querySelectorAll(
				`[data-id-cancion="${player.songPlaying.id}"]`,
			)[0];
			if (componentSong !== undefined) {
				componentSong.classList.remove('play');
			}
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
	songComponent: songData => {
		let component = document.createElement('DIV');
		component.classList.add('card');
		component.classList.add('card-song');
		component.setAttribute('data-id-cancion', songData.id);

		if (player.songPlaying.id == songData.id && player.wavesurfer.isPlaying()) {
			component.classList.add('play');
		}

		component.addEventListener('click', () => {
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

		component.innerHTML = content;
		return component;
	},
};

const loadSongList = async (eventResponse, page = 0) => {
	fetch(`/getcanciones?p=${page}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(response => response.json())
		.then(response => eventResponse(response));
};

const eventResultFetch = result => {
	player.songList = result.songList;
	player.renderSongList();
	let totalPagination = Math.ceil(result.total / 10);
	if (pagination.total != totalPagination) {
		pagination.total = totalPagination;
		pagination.renderPavigation();
	}
};

const pagination = {
	total: 0,
	current: 0,
	component: undefined,
	componentNav: undefined,
	init: () => {
		pagination.component = document.getElementById('pagination');
		pagination.componentNav = document.getElementById('nav-pagination');
		pagination.componentNav.classList.add('hide-pagination');
	},
	renderPavigation: () => {
		if (pagination.total <= 1) {
			return;
		}
		pagination.component.innerHTML = '';
		pagination.component.append(
			pagination.componentNavItem('Anterior', () => {
				if (pagination.current > 0) {
					pagination.current--;
					loadSongList(eventResultFetch, pagination.current);
				}
			}),
		);
		for (let i = 0; i < pagination.total; i++) {
			let itemNav = pagination.componentNavItem(i + 1, () => {
				if (pagination.current !== i) {
					pagination.current = i;
					loadSongList(eventResultFetch, pagination.current);
				}
			});
			if (pagination.current == i) {
				itemNav.classList.add('active');
			}
			pagination.component.append(itemNav);
		}
		pagination.component.append(
			pagination.componentNavItem('Siguiente', () => {
				if (pagination.current < pagination.total - 1) {
					pagination.current++;
					loadSongList(eventResultFetch, pagination.current);
				}
			}),
		);

		pagination.componentNav.classList.remove('hide-pagination');
	},
	componentNavItem: (text, event) => {
		let component = document.createElement('LI');
		component.classList.add('page-link');
		component.addEventListener('click', () => {
			event();
			pagination.changeActivate();
		});

		component.innerHTML = `${text}`;

		return component;
	},
	changeActivate: () => {
		pagination.componentNav
			.querySelector('.page-link.active')
			?.classList?.remove('active');

		console.log(pagination.current + 1);
		pagination.componentNav.querySelectorAll('.page-link')?.forEach(element => {
			if (parseInt(element.innerHTML) == pagination.current + 1) {
				element.classList.add('active');
			}
		});
	},
};

const navigation = {
	navs: undefined,
	contents: undefined,
	init: () => {
		navigation.navs = document.querySelectorAll('header nav.nav .nav-link');
		navigation.contents = document.querySelectorAll('.contents-page > *');
		window.addEventListener('hashchange', navigation.events.hashchange);
		navigation.events.hashchange();
	},
	events: {
		hashchange: () => {
			let hash = location.hash;
			if (hash == '' || hash === '#page/home') {
				navigation.events.changeTab('#page/home');
				navigation.events.changeContent('home');
				navigation.loaders.home();
			} else if (hash === '#page/info') {
				navigation.events.changeTab('#page/info');
				navigation.events.changeContent('info');
			} else {
				navigation.events.changeTab('#page/error');
				navigation.events.changeContent('error');
			}
			document.body.classList.remove('openDrawer');
		},
		changeTab: hash => {
			navigation.navs.forEach(nav => {
				if (nav.getAttribute('href') === hash) {
					nav.classList.add('activate');
				} else {
					nav.classList.remove('activate');
				}
			});
		},
		changeContent: page => {
			navigation.contents.forEach(content => {
				if (content.getAttribute('data-page') === page) {
					content.style.display = 'block';
				} else {
					content.style.display = 'none';
				}
			});
		},
	},
	loaders: {
		home: () => {
			loadSongList(eventResultFetch);
		},
	},
};

window.addEventListener('load', () => {
	navigation.init();
	pagination.init();
	player.init();
	document.getElementById('menu-btn').addEventListener('click', () => {
		if (document.body.classList.contains('openDrawer')) {
			document.body.classList.remove('openDrawer');
		} else {
			document.body.classList.add('openDrawer');
		}
	});
});
