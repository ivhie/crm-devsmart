<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ProspectsController;
use App\Http\Controllers\FbpagesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::middleware('auth:sanctum')->group(function() {

    Route::get('logout',[AuthController::class,'logout']);

    //Route::get('/user', function (Request $request) {
       // return $request->user();
   // });
    Route::apiResource('/users',UserController::class);
   
    /* Clients */
    Route::get('/clients',[ClientsController::class,'get']);
    Route::get('/clients/{id}',[ClientsController::class,'getEdit']);
    Route::post('/clients',[ClientsController::class,'store']);
    Route::delete('/clients/{id}',[ClientsController::class,'delete']);

    /* Prospect */
    Route::get('/prospects',[ProspectsController::class,'get']);
    Route::get('/prospects2',[ProspectsController::class,'get2']);
    Route::get('/prospects/{id}',[ProspectsController::class,'getEdit']);
    Route::post('/prospects',[ProspectsController::class,'store']);
    Route::delete('/prospects/{id}',[ProspectsController::class,'delete']);

     /* FBpages */
     Route::get('/fbpages',[FbpagesController::class,'get']);
     Route::get('/fbpage/{id}',[FbpagesController::class,'getEdit']);
     Route::post('/fbpage',[FbpagesController::class,'store']);
     Route::delete('/fbpage/{id}',[FbpagesController::class,'delete']);

    //Route::apiResource('/prospects',ClientsController::class);

});

Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);

Route::get('/fbpages2',[FbpagesController::class,'get']);
