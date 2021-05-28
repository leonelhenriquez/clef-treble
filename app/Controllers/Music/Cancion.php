<?php

namespace App\Controllers\Music;

use App\Controllers\BaseController;
use App\Models\CancionModel;

class Cancion extends BaseController
{
	public function getCanciones()
	{
		$pagina = $this->request->getVar("p");
		$pagina = isset($pagina) ? $pagina : 0;
		$cancionModel = new CancionModel();
		$data = $cancionModel->getAll($pagina);
		$this->response->setContentType('Content-Type: application/json');
		return json_encode($data);
	}
	public function getCancionesByGender($genero)
	{
		$cancionModel = new CancionModel();
		$data = $cancionModel->getAllByGenero();
		$this->response->setContentType('Content-Type: application/json');
		return json_encode($data);
	}
	public function getCancionesByArtist($genero)
	{
		$cancionModel = new CancionModel();
		$data = $cancionModel->getAllByArtista();
		$this->response->setContentType('Content-Type: application/json');
		return json_encode($data);
	}
}
