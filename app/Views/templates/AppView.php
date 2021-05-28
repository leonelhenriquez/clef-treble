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
				<div class="menu-btn" id="menu-btn">
					<span class="material-icons-round">menu</span>
				</div>
				<a href="#page/home" class="header-logo">
					<img src="src/img/logo/logo.svg" class="header-logo-img" />
					<div class="header-app-name">Clef Treble</div>
				</a>
				<nav class="nav">
					<a class="nav-link" href="#page/home">Inicio</a>
					<a class="nav-link" href="#page/info">Información</a>
				</nav>
			</div>
		</header>

		<section class="wrapper contents-page">
			<div data-page="home" style="display: none">
				<div class="song-list" id="song-list" style="min-height: 0px"></div>
				<nav aria-label="Page navigation" id="nav-pagination">
					<ul class="pagination" id="pagination"></ul>
				</nav>
			</div>
			<div data-page="info" style="display: none">
				<img src="src/img/logo/logo2_op.svg" class="info-logo" />
				<div class="content-information">
					<figure class="text-center">
						<h1>Del desarrollador de Clef Treble</h1>
						<blockquote class="blockquote">
							<p>
								Esta es una pequeña App de prueba combinando las tecnologías.
							</p>
						</blockquote>
						<figcaption class="blockquote-footer">Leonel Henriquez</figcaption>
					</figure>
				</div>
			</div>
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
					<div class="card-song-volumen" id="player-song-volumen">
						<span class="material-icons-round icon" id="volumen-icon">
							volume_up
						</span>
						<input
							type="range"
							class="form-range"
							value="100"
							min="0"
							max="100"
							step="1"
							id="player-song-volumen-control"
						/>
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
						<div class="timers">
							<span class="time" id="player-song-time-elapsed"></span>
							<span class="time" id="player-song-time"></span>
						</div>
					</div>
					<div class="card-song-close-player">
						<span class="material-icons-round icon" id="player-song-close"
							>close</span
						>
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
