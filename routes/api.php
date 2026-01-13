<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GroupMessageController;

Route::get('/instructor-groups/{group}/messages', [GroupMessageController::class, 'index'])->name('instructor-groups.messages.index');
Route::post('/instructor-groups/{group}/messages', [GroupMessageController::class, 'store'])->name('instructor-groups.messages.store');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
