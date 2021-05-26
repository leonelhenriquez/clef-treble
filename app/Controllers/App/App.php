<?php

namespace App\Controllers\App;

use App\Controllers\BaseController;

class App extends BaseController
{
	public function appView()
	{
		return view('templates/AppView');
	}
}
