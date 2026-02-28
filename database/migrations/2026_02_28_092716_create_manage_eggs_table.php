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
        Schema::create('manage_eggs', function (Blueprint $table) {
            $table->id();
            $table->integer('pullet');
            $table->integer('small');
            $table->integer('medium');
            $table->integer('large');
            $table->integer('extra_large');
            $table->integer('jumbo');
            $table->integer('broken');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manage_eggs');
    }
};
