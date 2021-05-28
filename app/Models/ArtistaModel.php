<?php

namespace App\Models;

use CodeIgniter\Model;

class ArtistaModel extends Model
{
	protected $table = 'artista';
	protected $primaryKey = 'id_artista';

	protected $useAutoIncrement = true;

	protected $returnType = 'array';
	protected $useSoftDeletes = true;

	protected $allowedFields = ['nombre'];

	protected $useTimestamps = false;
	protected $createdField = 'created_at';
	protected $updatedField = 'updated_at';
	protected $deletedField = 'deleted_at';

	protected $validationRules = [];
	protected $validationMessages = [];
	protected $skipValidation = false;

	public function getAllArtista(){
		$builder = $this->builder();
		$builder->select('*');
		$query = $builder->get();
		$result = $query->getResultArray();
		$query->freeResult();
		return $result;
	}

	public function getArtista($artista){
		$builder = $this->builder();
		$builder->select('*')->where(sprintf("artista.id_artista='%d'",$artista));
		$query = $builder->get();
		$result = $query->getResultArray();
		$query->freeResult();
		return $result;
	}
}
