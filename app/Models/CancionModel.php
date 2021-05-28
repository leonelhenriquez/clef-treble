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

	private $limit = 10;

	public static function parseQuery($song){
		$tiempo = date('i:s', strtotime($song['tiempo']));

		$dataResult = array(
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

		return $dataResult;
	}
	public static function parseQueryArray($result){
		$dataResult = array();
		foreach($result as &$song){
			$dataResult[$song['id_cancion']] = CancionModel::parseQuery($song);
		}
		return $dataResult;
	}

	public function getAll($pagina)
	{
		$db = \Config\Database::connect();

		$builder = $this->builder();
		$builder->select(
				'cancion.id_cancion,cancion.nombre AS nombre_cancion, cancion.tiempo, cancion.url, '
				.'a.id_artista, a.nombre AS artista, '
				.'g.id_genero, g.nombre AS genero '
			)
			->join('artista AS a', 'a.id_artista=cancion.artista')
			->join('genero AS g', 'g.id_genero=cancion.genero')
			->limit($this->limit,$pagina*$this->limit);

		$query = $builder->get();
		$result = $query->getResultArray();
		$dataResult = CancionModel::parseQueryArray($result);
		$query->freeResult();

		$total = $this->builder()->countAllResults();

		return array(
			'songList' => $dataResult,
			'total' => $total
		);
	}
	public function getAllByArtista($artista)
	{
		$db = \Config\Database::connect();

		$builder = $this->builder();
		$builder->select(
				'cancion.id_cancion,cancion.nombre AS nombre_cancion, cancion.tiempo, cancion.url, '
				.'a.id_artista, a.nombre AS artista, '
				.'g.id_genero, g.nombre AS genero '
			)
			->join('artista AS a', 'a.id_artista=cancion.artista')
			->join('genero AS g', 'g.id_genero=cancion.genero')
			->where(sprintf("cancion.artista='%d'",$artista));
		
		$query = $builder->get();
		$result = $query->getResultArray();
		
		$dataResult = CancionModel::parseQueryArray($result);

		$query->freeResult();

		$total = $this->builder()->selectCount('id_cancion')->get();

		return array(
			'dataResul' => $dataResult,
			'total' => $total
		);
	}

	public function getAllByGenero($genero)
	{
		$db = \Config\Database::connect();

		$builder = $this->builder();
		$builder->select(
				'cancion.id_cancion,cancion.nombre AS nombre_cancion, cancion.tiempo, cancion.url, '
				.'a.id_artista, a.nombre AS artista, '
				.'g.id_genero, g.nombre AS genero '
			)
			->join('artista AS a', 'a.id_artista=cancion.artista')
			->join('genero AS g', 'g.id_genero=cancion.genero')
			->where(sprintf("cancion.genero='%d'",$genero));
		
		$query = $builder->get();
		$result = $query->getResultArray();
		
		$dataResult = CancionModel::parseQueryArray($result);

		$query->freeResult();

		return $dataResult;
	}
}