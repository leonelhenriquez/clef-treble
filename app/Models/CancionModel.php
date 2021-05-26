<?php

namespace App\Models;

use CodeIgniter\Model;

class CancionModel extends Model
{
	protected $table = 'cancion';
	protected $primaryKey = 'id_cancion';

	protected $useAutoIncrement = true;

	protected $returnType = 'array';
	protected $useSoftDeletes = true;

	protected $allowedFields = ['nombre', 'artista', 'genero', 'tiempo', 'url'];

	protected $useTimestamps = false;
	protected $createdField = 'created_at';
	protected $updatedField = 'updated_at';
	protected $deletedField = 'deleted_at';

	protected $validationRules = [];
	protected $validationMessages = [];
	protected $skipValidation = false;

	public function getAll()
	{
		$db = \Config\Database::connect();

		$builder = $this->builder();
		$builder->select(
				'cancion.id_cancion,cancion.nombre AS nombre_cancion, cancion.tiempo, cancion.url, '
				.'a.id_artista, a.nombre AS artista, '
				.'g.id_genero, g.nombre AS genero '
			)
			->join('artista AS a', 'a.id_artista=cancion.artista')
			->join('genero AS g', 'g.id_genero=cancion.genero');
		
		$query = $builder->get();
		$result = $query->getResultArray();
		
		$dataResult = array();

		foreach($result as &$song){

			$tiempo = date('i:s', strtotime($song['tiempo']));

			$dataResult[$song['id_cancion']] = array(
				'id'=> $song['id_cancion'],
				'nombre' => $song['nombre_cancion'],
				'tiempo' => $tiempo,
				'url' => $song['url'],
				'genero' => array(
					'id' => $song['id_genero'],
					'nombre' => $song['genero']
				),
				'artista' => array(
					'id' => $song['id_artista'],
					'nombre' => $song['artista']
				)
			);
		}
		

		$query->freeResult();

		return $dataResult;
	}
}