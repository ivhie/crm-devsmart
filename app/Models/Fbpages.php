<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fbpages extends Model
{
    //
    use HasFactory;

    protected $table= 'fbpages';
    protected $fillable=[
        'full_name',
        'fb_link',
        //'clientype',
        //'is_deleted'
    ];
}
