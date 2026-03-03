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
        Schema::table('manage_eggs', function (Blueprint $table) {
            //
            $table->string('section')->after('id'); // or wherever you want
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('manage_eggs', function (Blueprint $table) {
            //
            $table->dropColumn(['section']);
        });
    }
};
