<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fbpages', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('fb_link')->nullable();
            $table->longText('comments')->nullable();
            $table->string('province',100)->nullable();
            $table->longText('tags')->nullable();
            $table->string('is_deleted',3)->default('no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fbpages');
    }
};
