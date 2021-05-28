<?php

namespace App\Models;

use CodeIgniter\Model;

class GeneroModel extends Model
{
	protected $table = 'genero';
	protected $primaryKey = 'id_genero';

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


	public function getAllGenero(){
		$builder = $this->builder();
		$builder->select('*');
		$query = $builder->get();
		$result = $query->getResultArray();
		$query->freeResult();
		return $result;
	}

	public function getGenero($genero){
		$builder = $this->builder();
		$builder->select('*')->where(sprintf("genero.id_genero='%d'",$genero));
		$query = $builder->get();
		$result = $query->getResultArray();
		$query->freeResult();
		return $result;
	}
}
