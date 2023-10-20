<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory;
    public function oficinas()
    {
        return $this->belongsToMany(Oficina::class, 'histories')->withPivot(['id', 'estado_id', 'obs']);
    }
}
