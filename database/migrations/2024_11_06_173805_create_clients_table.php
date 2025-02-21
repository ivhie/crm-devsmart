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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('com_address')->nullable();
            $table->string('fb_link')->nullable();
            $table->string('website_link')->nullable();
            $table->string('status');
            $table->longText('credentials')->nullable();
            $table->longText('comments')->nullable();
            $table->string('clientype');
            $table->string('is_deleted',3)->default('no');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
