<?php

namespace App\Controllers\Music;

use App\Controllers\BaseController;
use App\Models\CancionModel;

class Cancion extends BaseController
{
	public function getCanciones()
	{
		$cancionModel = new CancionModel();
		$data = $cancionModel->getAll();
		$this->response->setContentType('Content-Type: application/json');
		return json_encode($data);
	}
}
