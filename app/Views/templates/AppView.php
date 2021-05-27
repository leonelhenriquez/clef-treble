<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Clef Treble</title>
		<link rel="stylesheet" href="src/css/style.css" />
		<link rel="shortcut icon" href="favicon.ico" />
		<script src="src/js/script.js"></script>
	</head>
	<body>
		<header>
			<div class="wrapper-header">
				<a href="/" class="header-logo">
					<img src="src/img/logo/logo.svg" class="header-logo-img" />
					<div class="header-app-name">Clef Treble</div>
				</a>
			</div>
		</header>

		<section class="wrapper">
			<div class="song-list" id="song-list"></div>
		</section>

		<div class="player" id="player">
			<div class="wrapper">
				<div class="card card-song">
					<div class="card-song-icon" id="btn-player-play-pause">
						<span class="material-icons-round icon"></span>
						<div class="spinner-border text-light" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
					<div class="card-body">
						<h5 class="card-title card-song-name" id="player-song-name"></h5>
						<div
							class="card-text card-song-artist-gender"
							id="player-song-artist-gender"
						></div>
					</div>
					<div class="card-song-canvas-wave" id="waveform"></div>
					<div class="card-song-time">
						<span class="material-icons-round icon">schedule</span>
						<span class="time" id="player-song-time-elapsed">00:00</span>
						<span class="time" id="player-song-time"></span>
					</div>
				</div>
			</div>
		</div>

		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
			crossorigin="anonymous"
		/>
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
			rel="stylesheet"
		/>
		<script src="https://unpkg.com/wavesurfer.js"></script>
		<script
			src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
			integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
			crossorigin="anonymous"
		></script>
		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
			integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
			crossorigin="anonymous"
		></script>
	</body>
</html>
