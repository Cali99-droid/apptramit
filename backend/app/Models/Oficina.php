<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oficina extends Model
{
    use HasFactory;
    public function documentos()
    {
        return $this->belongsToMany(Documento::class, 'histories');
    }
    public function user()
    {
        return $this->hasOne(User::class);
    }
}
