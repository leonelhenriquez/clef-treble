<?php

namespace App\Models;

use CodeIgniter\Model;

class HomeModel extends Model
{
	protected $table = 'home_model';
	protected $primaryKey = 'id';

	protected $useAutoIncrement = true;

	protected $returnType = 'array';
	protected $useSoftDeletes = true;

	protected $allowedFields = ['name', 'title', 'number'];

	protected $useTimestamps = false;
	protected $createdField = 'created_at';
	protected $updatedField = 'updated_at';
	protected $deletedField = 'deleted_at';

	protected $validationRules = [];
	protected $validationMessages = [];
	protected $skipValidation = false;

	public function getHome($id)
	{
		return $this->where('id=' . $id)->find();
	}

	public function insertHome($data)
	{
		return $this->insert($data, false);
	}
}
