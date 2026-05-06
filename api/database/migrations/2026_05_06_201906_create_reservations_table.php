<?php

use App\Models\User;
use App\Models\Computer;
use App\Models\TimeSlot;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->foreignIdFor(User::class)->constrained();
            $table->foreignIdFor(Computer::class)->constrained();
            $table->foreignIdFor(TimeSlot::class)->constrained();
            $table->date('date');
            $table->enum('status', ['confirmed', 'pending', 'cancelled'])->default('pending');
            $table->decimal('price', 4, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
