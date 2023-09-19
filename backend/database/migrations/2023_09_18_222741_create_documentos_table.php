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
        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->integer('tipo_persona')->default(0);
            $table->integer('dni');
            $table->string('nombre_interesado');
            $table->integer('telefono');
            $table->string('email');
            $table->string('direccion');
            $table->string('nombre_documento');
            $table->string('dir');
            $table->integer('folios');
            $table->longText('asunto');
            $table->unsignedBigInteger('estado_id');
            $table->foreign('estado_id')->references('id')->on('estados');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documentos');
    }
};
